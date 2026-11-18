(function (App) {
  'use strict';

  /** Avatar + name + branch/source line. */
  const reviewer = (r) =>
    `<div class="who"><img data-img="${r.a}" alt=""><div><b>${r.n}</b><span>${r.b} branch · ${r.s}</span></div></div>`;

  /** Masonry review card used on the Reviews page and branch pages. */
  const reviewCard = (r, style = '') =>
    `<div class="rcard"${style ? ` style="${style}"` : ''}><span class="src">${r.s}</span><div class="stars" style="margin:0">★★★★★</div><p>${r.t}</p>${reviewer(r)}</div>`;
  Object.assign(App, { reviewer, reviewCard });
})(window.App = window.App || {});
