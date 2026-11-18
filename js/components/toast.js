(function (App) {
  'use strict';
  const { $ } = App;

  let timer;

  /** Shows a small message at the bottom of the screen for ~2.6s. */
  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('show'), 2600);
  }
  Object.assign(App, { toast });
})(window.App = window.App || {});
