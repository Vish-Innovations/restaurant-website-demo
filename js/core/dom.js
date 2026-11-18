(function (App) {
  'use strict';

  /** Tiny DOM helpers. */
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  Object.assign(App, { $, $$ });
})(window.App = window.App || {});
