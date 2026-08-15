(async () => {
  if (window.innerWidth < 640) return;
  const svgNS = 'http://www.w3.org/2000/svg';
  const tradeEl = document.getElementById('trade-data');
  const localeEl = document.getElementById('map-locale');
  const container = document.getElementById('trade-map');
  const tooltip = document.getElementById('map-tooltip');
  if (!tradeEl || !localeEl || !container || !tooltip) return;

  if (!window.d3) {
    container.innerHTML = '<div class="text-center text-sm text-slate-500">Map failed to load.</div>';
    return;
  }
  const { geoNaturalEarth1, geoPath } = window.d3;

  const tradeData = JSON.parse(tradeEl.textContent || '[]');
  const mapLocale = JSON.parse(localeEl.textContent || '{}');
  const tradedMap = new Map(tradeData.map((c) => [c.country_code, c]));
  const dash = '\u2014';

  const defaultStroke = '#94a3b8';
  const hoverStroke = '#0b2f5b';
  const selectedStroke = '#c8961a';
  const defaultStrokeWidth = 0.4;
  const hoverStrokeWidth = 0.9;
  const selectedStrokeWidth = 1.3;
  let selectedPath = null;

  const getWidth = () => container.getBoundingClientRect().width || container.clientWidth || window.innerWidth;
  let width = getWidth();
  if (width < 320) {
    await new Promise((resolve) => setTimeout(resolve, 60));
    width = getWidth();
  }
  width = Math.max(width, 320);
  const isMobile = window.innerWidth < 640;
  const viewportHeight = window.innerHeight || 900;
  const height = Math.max(
    isMobile ? Math.round(viewportHeight * 0.58) : Math.round(viewportHeight * 0.78),
    Math.round(width * (isMobile ? 0.82 : 0.7))
  );

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${height}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'World trade map');
  svg.classList.add('w-full');
  svg.style.display = 'block';
  container.appendChild(svg);

  const defs = document.createElementNS(svgNS, 'defs');
  const pattern = document.createElementNS(svgNS, 'pattern');
  pattern.setAttribute('id', 'flag-ir');
  pattern.setAttribute('patternUnits', 'objectBoundingBox');
  pattern.setAttribute('width', '1');
  pattern.setAttribute('height', '1');

  const img = document.createElementNS(svgNS, 'image');
  img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/images/iran-flag.jpg');
  img.setAttribute('width', '400');
  img.setAttribute('height', '240');
  img.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  pattern.appendChild(img);
  defs.appendChild(pattern);
  svg.appendChild(defs);

  const world = await fetch('/data/countries.geojson').then((r) => r.json());
  const projection = geoNaturalEarth1().fitSize([width, height], world);
  const path = geoPath(projection);

  // tighten the viewBox to remove empty space under the map
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  world.features.forEach((f) => {
    const b = path.bounds(f);
    if (!b || !b[0] || !b[1]) return;
    minX = Math.min(minX, b[0][0]);
    minY = Math.min(minY, b[0][1]);
    maxX = Math.max(maxX, b[1][0]);
    maxY = Math.max(maxY, b[1][1]);
  });
  const pad = 8;
  const viewMinX = minX - pad;
  const viewMinY = minY - pad;
  const viewW = maxX - minX + pad * 2;
  const viewH = maxY - minY + pad * 2;
  const scaledHeight = Math.round((width * viewH) / viewW);
  svg.setAttribute('viewBox', `${viewMinX} ${viewMinY} ${viewW} ${viewH}`);
  if (isMobile) {
    svg.removeAttribute('height');
    svg.style.height = 'auto';
    container.style.height = 'auto';
    container.style.minHeight = '0';
  } else {
    svg.setAttribute('height', `${scaledHeight}`);
  }

  const langAttr = document.documentElement.lang || 'en';
  const langPrefix = langAttr && langAttr !== 'en' ? `/${langAttr}` : '';

  const positionTooltip = (cx, cy) => {
    const svgRect = svg.getBoundingClientRect();
    const relX = ((cx - viewMinX) / viewW) * svgRect.width;
    const relY = ((cy - viewMinY) / viewH) * svgRect.height;
    const tooltipRect = tooltip.getBoundingClientRect();
    const padding = 6;
    let left = relX - tooltipRect.width / 2;
    let top = relY - tooltipRect.height - 14;
    if (left < padding) left = padding;
    if (left + tooltipRect.width > svgRect.width - padding) {
      left = svgRect.width - tooltipRect.width - padding;
    }
    if (top < padding) top = relY + 14;
    if (top + tooltipRect.height > svgRect.height - padding) {
      top = svgRect.height - tooltipRect.height - padding;
    }
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  };

  world.features.forEach((feature) => {
    const code = feature.properties['ISO3166-1-Alpha-2'];
    const countryName = feature.properties.name;
    const traded = tradedMap.has(code);

    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', path(feature));
    p.setAttribute('data-code', code);
    p.setAttribute('tabindex', '0');
    p.setAttribute('aria-label', `${countryName} ${traded ? mapLocale.statusTraded : mapLocale.statusNotTraded}`);
    p.classList.add('transition', 'duration-150', 'ease-out');
    p.style.fill = code === 'IR' ? 'url(#flag-ir)' : traded ? 'var(--brand-fill, #c8961a)' : '#e5e7eb';
    p.style.stroke = defaultStroke;
    p.style.strokeWidth = `${defaultStrokeWidth}`;
    p.style.cursor = traded ? 'pointer' : 'default';

    const setDefault = () => {
      if (selectedPath === p) return;
      p.style.stroke = defaultStroke;
      p.style.strokeWidth = `${defaultStrokeWidth}`;
    };

    const setHover = () => {
      if (selectedPath === p) return;
      p.style.stroke = hoverStroke;
      p.style.strokeWidth = `${hoverStrokeWidth}`;
    };

    const setSelected = () => {
      if (selectedPath && selectedPath !== p) {
        selectedPath.style.stroke = defaultStroke;
        selectedPath.style.strokeWidth = `${defaultStrokeWidth}`;
      }
      selectedPath = p;
      p.style.stroke = selectedStroke;
      p.style.strokeWidth = `${selectedStrokeWidth}`;
    };

    const showTooltip = () => {
      const td = tradedMap.get(code);
      const status = traded ? mapLocale.statusTraded : mapLocale.statusNotTraded;
      const deals = td?.deals_count ?? dash;
      const value = td?.total_value ?? dash;
    tooltip.innerHTML = `
        <div class="font-bold text-white">${countryName}</div>
        <div class="text-brand-light/90">${mapLocale.statusLabel}: ${status}</div>
        ${traded ? `<div class="text-white/80">${mapLocale.dealsLabel}: ${deals}</div><div class="text-white/80">${mapLocale.totalLabel}: ${value}</div>` : ''}
      `;
    const [cx, cy] = path.centroid(feature);
    tooltip.classList.remove('hidden');
    tooltip.style.opacity = '0';
    positionTooltip(cx, cy);
    tooltip.style.opacity = '';
  };

    const hideTooltip = () => tooltip.classList.add('hidden');

    p.addEventListener('mouseenter', () => {
      setHover();
      showTooltip();
    });
    p.addEventListener('mousemove', () => showTooltip());
    p.addEventListener('mouseleave', () => {
      setDefault();
      hideTooltip();
    });
    p.addEventListener('focus', () => {
      setHover();
      showTooltip();
    });
    p.addEventListener('blur', () => {
      setDefault();
      hideTooltip();
    });

    const goDetail = () => {
      if (traded) {
        setSelected();
        window.location.href = `${langPrefix}/trade-map/${code.toLowerCase()}`;
      }
    };
    p.addEventListener('click', goDetail);
    p.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        goDetail();
      }
    });

    svg.appendChild(p);
  });
})();
