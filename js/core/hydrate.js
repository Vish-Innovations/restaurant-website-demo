(function (App) {
  'use strict';
  const { $$, isoDate, hydrateIcons } = App;

  /** Prepares freshly inserted markup: icons + "today or later" date minimums. */
  function hydrate(root = document) {
    hydrateIcons(root);
    $$('[data-future]', root).forEach((i) => (i.min = isoDate(new Date())));
  }
  Object.assign(App, { hydrate });
})(window.App = window.App || {});
