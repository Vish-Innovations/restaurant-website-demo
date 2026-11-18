(function (App) {
  'use strict';

  /** Green/red veg-nonveg marker. */
  const vegMark = (isVeg) =>
    `<span class="vg ${isVeg ? '' : 'nv'}" title="${isVeg ? 'Veg' : 'Non-veg'}"></span>`;
  Object.assign(App, { vegMark });
})(window.App = window.App || {});
