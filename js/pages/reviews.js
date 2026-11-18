(function (App) {
  'use strict';
  const { $, reviewCard, REVIEWS } = App;

  function mount(root) {
    $('#rGrid', root).innerHTML = REVIEWS.map((r) => reviewCard(r)).join('');
  }
  (App.pages = App.pages || {}).reviews = { mount };
})(window.App = window.App || {});
