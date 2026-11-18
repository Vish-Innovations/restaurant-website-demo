(function (App) {
  'use strict';
  const { $, PARTY_PACKAGES, DECOR_GALLERY } = App;

  function mount(root) {
    $('#pkgs', root).innerHTML = PARTY_PACKAGES.map(
      (p) =>
        `<div class="pkg ${p.pop ? 'pop' : ''}">${p.pop ? '<span class="tagp">MOST POPULAR</span>' : ''}<h3>${p.n}</h3><div class="amt">${p.p}</div><div class="per">per plate · min. 25 guests</div><ul>${p.items.map((i) => `<li>${i}</li>`).join('')}</ul><button class="btn ${p.pop ? '' : 'btn-o'}" style="width:100%;justify-content:center" data-scroll-to="eventForm">Enquire Now</button></div>`
    ).join('');
    $('#decorGal', root).innerHTML = DECOR_GALLERY.map(
      (img) => `<img data-img="${img}" alt="Event décor" data-lb>`
    ).join('');
  }
  (App.pages = App.pages || {}).events = { mount };
})(window.App = window.App || {});
