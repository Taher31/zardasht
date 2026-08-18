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
  const dash = '—';

  const defaultStroke = '#94a3b8';
  const hoverStroke = '#19266A';
  const selectedStroke = '#F3C623';
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

  // Iran: ships as a photo-based pattern (existing brand asset).
  const irPattern = document.createElementNS(svgNS, 'pattern');
  irPattern.setAttribute('id', 'flag-ir');
  irPattern.setAttribute('patternUnits', 'objectBoundingBox');
  irPattern.setAttribute('width', '1');
  irPattern.setAttribute('height', '1');
  const irImg = document.createElementNS(svgNS, 'image');
  irImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/images/iran-flag.jpg');
  irImg.setAttribute('width', '400');
  irImg.setAttribute('height', '240');
  irImg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  irPattern.appendChild(irImg);
  defs.appendChild(irPattern);

  // Active markets: hand-drawn flag patterns so no extra image assets are needed.
  const stripe = (pattern, y, h, fill) => {
    const rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', `${y}`);
    rect.setAttribute('width', '1');
    rect.setAttribute('height', `${h}`);
    rect.setAttribute('fill', fill);
    pattern.appendChild(rect);
  };

  const makePattern = (id) => {
    const pattern = document.createElementNS(svgNS, 'pattern');
    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'objectBoundingBox');
    pattern.setAttribute('patternContentUnits', 'objectBoundingBox');
    pattern.setAttribute('width', '1');
    pattern.setAttribute('height', '1');
    return pattern;
  };

  // Uzbekistan: blue / white / green, thin red fimbriations.
  const uzPattern = makePattern('flag-uz');
  stripe(uzPattern, 0, 0.3, '#0099B5');
  stripe(uzPattern, 0.3, 0.03, '#CE1126');
  stripe(uzPattern, 0.33, 0.34, '#FFFFFF');
  stripe(uzPattern, 0.67, 0.03, '#CE1126');
  stripe(uzPattern, 0.7, 0.3, '#1EB53A');
  defs.appendChild(uzPattern);

  // Russia: white / blue / red, equal thirds.
  const ruPattern = makePattern('flag-ru');
  stripe(ruPattern, 0, 0.3333, '#FFFFFF');
  stripe(ruPattern, 0.3333, 0.3334, '#0039A6');
  stripe(ruPattern, 0.6667, 0.3333, '#D52B1E');
  defs.appendChild(ruPattern);

  svg.appendChild(defs);

  const flagFill = { IR: 'url(#flag-ir)', UZ: 'url(#flag-uz)', RU: 'url(#flag-ru)' };

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
    p.style.fill = flagFill[code] ?? (traded ? 'var(--brand-fill, #F3C623)' : '#e5e7eb');
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
      tooltip.innerHTML = `
        <div class="font-bold text-white">${countryName}</div>
        <div class="text-white/80">${mapLocale.statusLabel}: ${status}</div>
        ${traded && td?.notes ? `<div class="mt-1 max-w-[220px] font-normal text-white/70">${td.notes}</div>` : ''}
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
