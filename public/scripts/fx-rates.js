(() => {
  const container = document.getElementById('fx-rates');
  const localeEl = document.getElementById('fx-locale');
  if (!container || !localeEl) return;

  const usdEl = document.getElementById('fx-irr-usd');
  const aedEl = document.getElementById('fx-irr-aed');
  const metaEl = document.getElementById('fx-meta');
  const baseEl = document.getElementById('fx-base');

  const locale = JSON.parse(localeEl.textContent || '{}');
  const setText = (el, text) => {
    if (el) el.textContent = text;
  };

  setText(baseEl, `${locale.baseLabel || 'Base'}: IRR`);
  setText(metaEl, locale.loading || 'Loading rates...');

  const formatRate = (value) => {
    if (typeof value !== 'number' || Number.isNaN(value)) return '—';
    if (value === 0) return '0';
    if (value < 1) return value.toFixed(6);
    if (value < 100) return value.toFixed(4);
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  // The old `gh/fawazahmed0/currency-api@1` path now 404s, which is why this card
  // used to always read "Rates unavailable". These are the current v1 endpoints;
  // the pages.dev mirror covers a jsDelivr outage.
  const endpoints = [
    'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/irr.json',
    'https://latest.currency-api.pages.dev/v1/currencies/irr.json',
  ];

  const fetchRates = ([url, ...rest]) => {
    if (!url) return Promise.reject(new Error('No endpoint responded'));
    return fetch(url, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .catch(() => fetchRates(rest));
  };

  fetchRates(endpoints)
    .then((data) => {
      const rates = data && data.irr ? data.irr : null;
      if (!rates) throw new Error('Missing rates');

      // The API quotes IRR per unit (~7.3e-7 USD), which rounds to a useless
      // "0.000001". Invert it so the card shows how many rial buy one dollar —
      // the direction rates are actually quoted in.
      const perUnit = (rate) => (typeof rate === 'number' && rate > 0 ? 1 / rate : NaN);

      setText(usdEl, `1 USD = ${formatRate(perUnit(rates.usd))} IRR`);
      setText(aedEl, `1 AED = ${formatRate(perUnit(rates.aed))} IRR`);

      const date = data.date ? `${data.date}` : '';
      setText(metaEl, date ? `${locale.updatedLabel || 'Updated'}: ${date}` : (locale.updatedLabel || 'Updated'));
    })
    .catch(() => {
      setText(metaEl, locale.error || 'Rates unavailable');
    });
})();
