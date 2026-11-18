(function (App) {
  'use strict';
  const { $ } = App;

  /** "Reserve a Table" modal — opened by any element with [data-reserve] (optional data-branch). */
  function initReserveModal() {
    const modal = $('#resModal');
    const close = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      App.resetDone($('form', modal)); // next time it opens, show a fresh form
    };
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-reserve]');
      if (!trigger) return;
      e.preventDefault();
      if (trigger.dataset.branch) $('#resBranch').value = trigger.dataset.branch;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    $('#resClose').onclick = close;
    modal.onclick = (e) => {
      if (e.target === modal) close();
    };
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  }
  Object.assign(App, { initReserveModal });
})(window.App = window.App || {});
