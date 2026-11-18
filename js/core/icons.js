(function (App) {
  'use strict';
  const { $$, ICONS } = App;

  /** Returns inline SVG markup for an icon name (see icon-paths.js). */
  const ic = (name) => `<svg class="i" viewBox="0 0 24 24">${ICONS[name] || ''}</svg>`;

  /** Replaces every <i data-ic="name"></i> placeholder inside `root` with its SVG. */
  function hydrateIcons(root = document) {
    $$('i[data-ic]', root).forEach((el) => (el.outerHTML = ic(el.dataset.ic)));
  }
  Object.assign(App, { ic, hydrateIcons });
})(window.App = window.App || {});
