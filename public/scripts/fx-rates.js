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

  fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/irr.json', { cache: 'no-store' })
    .then((res) => res.json())
    .then((data) => {
      const rates = data && data.irr ? data.irr : null;
      if (!rates) throw new Error('Missing rates');

      setText(usdEl, `1 IRR = ${formatRate(rates.usd)} USD`);
      setText(aedEl, `1 IRR = ${formatRate(rates.aed)} AED`);

      const date = data.date ? `${data.date}` : '';
      setText(metaEl, date ? `${locale.updatedLabel || 'Updated'}: ${date}` : (locale.updatedLabel || 'Updated'));
    })
    .catch(() => {
      setText(metaEl, locale.error || 'Rates unavailable');
    });
})();
