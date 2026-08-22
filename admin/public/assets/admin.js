document.addEventListener('DOMContentLoaded', () => {
  // Per-language tabs on edit forms: [data-lang-tabs] wraps buttons with data-lang="en",
  // panels are marked [data-lang-panel="en"] etc.
  document.querySelectorAll('[data-lang-tabs]').forEach((tabs) => {
    const panels = document.querySelectorAll('[data-lang-panel]');
    tabs.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        tabs.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach((p) => p.classList.toggle('active', p.dataset.langPanel === btn.dataset.lang));
      });
    });
  });

  // Confirm before any destructive delete form submits.
  document.querySelectorAll('form[data-confirm]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      if (!confirm(form.dataset.confirm || 'Are you sure?')) {
        e.preventDefault();
      }
    });
  });

  // "Copy to all languages" buttons for fields that are usually identical (phone/email).
  document.querySelectorAll('[data-copy-to-all]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.copyToAll;
      const source = document.querySelector(`[data-copy-source="${group}"]`);
      if (!source) return;
      document.querySelectorAll(`[data-copy-target="${group}"]`).forEach((el) => {
        el.value = source.value;
      });
    });
  });
});
