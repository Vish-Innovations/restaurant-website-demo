(function (App) {
  'use strict';
  const { $, $$ } = App;

  /** Full-screen image viewer for any <img data-lb> inside a .gal or .mini-gal container. */
  function initLightbox() {
    const lb = $('#lb');
    let list = [];
    let index = 0;
    const show = () => {
      $('img', lb).src = list[index];
      lb.classList.add('open');
    };
    const close = () => lb.classList.remove('open');

    document.addEventListener('click', (e) => {
      const img = e.target.closest('[data-lb]');
      if (!img) return;
      list = $$('[data-lb]', img.closest('.gal,.mini-gal')).map((x) => x.src);
      index = list.indexOf(img.src);
      show();
    });
    $('.x', lb).onclick = close;
    $('.pv', lb).onclick = () => {
      index = (index - 1 + list.length) % list.length;
      show();
    };
    $('.nx', lb).onclick = () => {
      index = (index + 1) % list.length;
      show();
    };
    lb.onclick = (e) => e.target === lb && close();
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  }
  Object.assign(App, { initLightbox });
})(window.App = window.App || {});
