(function (App) {
  'use strict';
  const { $, offerCard, OFFERS } = App;

  function mount(root) {
    $('#offersAll', root).innerHTML = OFFERS.map(offerCard).join('');
  }
  (App.pages = App.pages || {}).offers = { mount };
})(window.App = window.App || {});
