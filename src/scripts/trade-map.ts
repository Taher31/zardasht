type TradeCountry = {
  country_code: string;
  country_name: string;
  status: boolean;
  deals_count?: number;
  total_value?: string;
  capital?: string;
  currency?: string;
};

type MapStrings = {
  statusTraded: string;
  statusNotTraded: string;
  statusLabel: string;
  dealsLabel: string;
  totalLabel: string;
};

const run = async () => {
  if (window.innerWidth < 640) return;
  const svgNS = 'http://www.w3.org/2000/svg';
  const tradeEl = document.getElementById('trade-data');
  const localeEl = document.getElementById('map-locale');
  const container = document.getElementById('trade-map');
  const tooltip = document.getElementById('map-tooltip');
  if (!tradeEl || !localeEl || !container || !tooltip) return;

  const d3 = (window as any).d3;
  if (!d3) {
    container.innerHTML = '<div class="text-center text-sm text-slate-500">Map failed to load.</div>';
    return;
  }
  const { geoNaturalEarth1, geoPath } = d3;

  const tradeData: TradeCountry[] = JSON.parse(tradeEl.textContent || '[]');
  const mapLocale: MapStrings = JSON.parse(localeEl.textContent || '{}');
  const tradedMap = new Map(tradeData.map((c) => [c.country_code, c]));

  const defaultStroke = '#94a3b8';
  const hoverStroke = '#0b2f5b';
  const selectedStroke = '#c8961a';
  const defaultStrokeWidth = 0.4;
  const hoverStrokeWidth = 0.9;
  const selectedStrokeWidth = 1.3;
  let selectedPath: SVGPathElement | null = null;

  const width = container.clientWidth || 960;
  const isMobile = window.innerWidth < 640;
  const viewportHeight = window.innerHeight || 900;
  const height = Math.max(
    isMobile ? Math.round(viewportHeight * 0.58) : Math.round(viewportHeight * 0.78),
    Math.round(width * (isMobile ? 0.82 : 0.7))
  );

  const world = await fetch('/data/countries.geojson').then((r) => r.json());
  const projection = geoNaturalEarth1().fitSize([width, height], world);
  const path = geoPath(projection);

  // tighten the viewBox to remove empty space under the map
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  world.features.forEach((f: any) => {
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

  const defs = document.createElementNS(svgNS, 'defs');
  const pattern = document.createElementNS(svgNS, 'pattern');
  pattern.setAttribute('id', 'flag-ir');
  pattern.setAttribute('patternUnits', 'objectBoundingBox');
  pattern.setAttribute('patternContentUnits', 'objectBoundingBox');
  pattern.setAttribute('width', '1');
  pattern.setAttribute('height', '1');

  const stripeTop = document.createElementNS(svgNS, 'rect');
  stripeTop.setAttribute('x', '0');
  stripeTop.setAttribute('y', '0');
  stripeTop.setAttribute('width', '1');
  stripeTop.setAttribute('height', '0.3333');
  stripeTop.setAttribute('fill', '#239F40');

  const stripeMid = document.createElementNS(svgNS, 'rect');
  stripeMid.setAttribute('x', '0');
  stripeMid.setAttribute('y', '0.3333');
  stripeMid.setAttribute('width', '1');
  stripeMid.setAttribute('height', '0.3334');
  stripeMid.setAttribute('fill', '#FFFFFF');

  const stripeBottom = document.createElementNS(svgNS, 'rect');
  stripeBottom.setAttribute('x', '0');
  stripeBottom.setAttribute('y', '0.6667');
  stripeBottom.setAttribute('width', '1');
  stripeBottom.setAttribute('height', '0.3333');
  stripeBottom.setAttribute('fill', '#DA0000');

  const emblem = document.createElementNS(svgNS, 'text');
  emblem.setAttribute('x', '0.5');
  emblem.setAttribute('y', '0.58');
  emblem.setAttribute('text-anchor', 'middle');
  emblem.setAttribute('dominant-baseline', 'middle');
  emblem.setAttribute('fill', '#DA0000');
  emblem.setAttribute('font-size', '0.18');
  emblem.setAttribute('font-weight', '700');
  emblem.setAttribute('font-family', 'Vazirmatn, \"Noto Naskh Arabic\", Tahoma, Arial, sans-serif');
  emblem.textContent = 'الله';

  pattern.appendChild(stripeTop);
  pattern.appendChild(stripeMid);
  pattern.appendChild(stripeBottom);
  pattern.appendChild(emblem);
  defs.appendChild(pattern);

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${height}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'World trade map');
  svg.classList.add('w-full');
  svg.style.display = 'block';
  container.appendChild(svg);

  svg.appendChild(defs);

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

  const positionTooltip = (cx: number, cy: number) => {
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

  world.features.forEach((feature: any) => {
    const code = feature.properties['ISO3166-1-Alpha-2'];
    const countryName = feature.properties.name;
    const traded = tradedMap.has(code);

    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', path(feature) || '');
    p.setAttribute('data-code', code);
    p.setAttribute('tabindex', '0');
    p.setAttribute('aria-label', `${countryName} ${traded ? mapLocale.statusTraded : mapLocale.statusNotTraded}`);
    p.classList.add('transition', 'duration-150', 'ease-out');
    if (code === 'IR') {
      p.style.fill = 'url(#flag-ir)';
    } else {
      p.style.fill = traded ? 'var(--brand-fill, #c8961a)' : '#e5e7eb';
    }
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
      const deals = td?.deals_count ?? '\u2014';
      const value = td?.total_value ?? '\u2014';
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
};

run();
