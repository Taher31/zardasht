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
  // Codes are upper-cased on the way in: the geojson uses uppercase ISO codes, so
  // a lowercase entry in trade-countries.json would otherwise silently fail to
  // highlight on the map.
  const normalizeCode = (code) => String(code || '').trim().toUpperCase();
  const tradedMap = new Map(tradeData.map((c) => [normalizeCode(c.country_code), c]));
  const dash = '—';

  const defaultStroke = '#94a3b8';
  const flaggedStroke = '#10184A';
  const flaggedStrokeWidth = 0.75;
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

  // Every active market is filled with its own flag. Patterns are generated from
  // trade-countries.json, so a country added there gets its flag automatically.
  const patternIdFor = (code) => `flag-${code.toLowerCase()}`;

  const addFlagPattern = (code, href) => {
    const pattern = document.createElementNS(svgNS, 'pattern');
    pattern.setAttribute('id', patternIdFor(code));
    pattern.setAttribute('patternUnits', 'objectBoundingBox');
    pattern.setAttribute('patternContentUnits', 'objectBoundingBox');
    pattern.setAttribute('width', '1');
    pattern.setAttribute('height', '1');

    // Brand-gold base sits under the flag, so a blocked or failed image
    // degrades to the old highlight instead of leaving a hole in the map.
    const base = document.createElementNS(svgNS, 'rect');
    base.setAttribute('width', '1');
    base.setAttribute('height', '1');
    // Literal hex, not var(): CSS variables are unreliable inside SVG
    // presentation attributes outside Chromium.
    base.setAttribute('fill', '#F3C623');
    pattern.appendChild(base);

    const image = document.createElementNS(svgNS, 'image');
    image.setAttribute('href', href);
    image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href);
    image.setAttribute('width', '1');
    image.setAttribute('height', '1');
    // Stretch to the country's bounding box; uniform scaling would leave gaps.
    image.setAttribute('preserveAspectRatio', 'none');
    pattern.appendChild(image);

    defs.appendChild(pattern);
  };

  // Iran is the home base and uses the local brand asset; markets use flagcdn,
  // which the country detail pages and mobile cards already rely on.
  const flagSources = new Map([['IR', '/images/iran-flag.webp']]);
  tradeData.forEach((entry) => {
    const code = normalizeCode(entry.country_code);
    if (code && !flagSources.has(code)) {
      flagSources.set(code, `https://flagcdn.com/w640/${code.toLowerCase()}.png`);
    }
  });
  flagSources.forEach((href, code) => addFlagPattern(code, href));

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
    const hasFlag = flagSources.has(code);
    p.style.fill = hasFlag ? `url(#${patternIdFor(code)})` : '#e5e7eb';
    // Flag-filled countries carry a darker, thicker outline: several flags are
    // partly white, which would otherwise bleed into neighbouring landmass.
    const restingStroke = hasFlag ? flaggedStroke : defaultStroke;
    const restingStrokeWidth = hasFlag ? flaggedStrokeWidth : defaultStrokeWidth;
    // Remembered on the node so deselecting restores this country's own resting
    // outline rather than the plain default.
    p.dataset.restStroke = restingStroke;
    p.dataset.restWidth = `${restingStrokeWidth}`;
    p.style.stroke = restingStroke;
    p.style.strokeWidth = `${restingStrokeWidth}`;
    p.style.cursor = traded ? 'pointer' : 'default';

    const setDefault = () => {
      if (selectedPath === p) return;
      p.style.stroke = restingStroke;
      p.style.strokeWidth = `${restingStrokeWidth}`;
    };

    const setHover = () => {
      if (selectedPath === p) return;
      p.style.stroke = hoverStroke;
      p.style.strokeWidth = `${hoverStrokeWidth}`;
    };

    const setSelected = () => {
      if (selectedPath && selectedPath !== p) {
        selectedPath.style.stroke = selectedPath.dataset.restStroke || defaultStroke;
        selectedPath.style.strokeWidth = selectedPath.dataset.restWidth || `${defaultStrokeWidth}`;
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
