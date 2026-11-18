(function (App) {
  'use strict';
  const { $$ } = App;

  const IMAGE_ROOT = 'assets/images/';

  /** "food/biryani-plate" -> "assets/images/food/biryani-plate.jpg" */
  const imgSrc = (key) => `${IMAGE_ROOT}${key}.jpg`;

  const FALLBACK =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3e3cc"/><stop offset="1" stop-color="#e6cfae"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><text x="200" y="158" fill="#c8961e" font-family="Georgia" font-size="22" text-anchor="middle">Kaaram &amp; Co.</text></svg>'
    );

  /** Any <img> that fails to load gets a branded placeholder instead of a broken icon. */
  function installImageFallback() {
    document.addEventListener(
      'error',
      (e) => {
        const t = e.target;
        if (t.tagName === 'IMG' && t.src !== FALLBACK) t.src = FALLBACK;
      },
      true
    );
  }

  /**
   * Sets src on every <img data-img="folder/name"> inside `root`.
   * Markup stays free of paths; only the image key lives in HTML/data.
   */
  function loadImages(root = document) {
    $$('[data-img]', root).forEach((el) => {
      if (el.dataset.done === '1') return;
      el.src = imgSrc(el.dataset.img);
      el.loading = el.closest('.hero') ? 'eager' : 'lazy';
      el.dataset.done = '1';
    });
  }
  Object.assign(App, { imgSrc, installImageFallback, loadImages });
})(window.App = window.App || {});
