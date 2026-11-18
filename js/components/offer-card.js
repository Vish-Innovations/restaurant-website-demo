(function (App) {
  'use strict';
  const { ic } = App;

  /** Offer card (home + offers page). */
  const offerCard = (o) =>
    `<div class="card offer reveal"><div class="ph"><img data-img="${o.img}" alt="${o.t}"><span class="big">${o.big}</span></div><div class="card-b"><h3>${o.t}</h3><p>${o.d}</p><div class="valid">${ic('clock')}${o.v}</div><div class="tc">${o.tc}</div><button class="btn btn-sm" style="margin-top:16px;align-self:flex-start" data-reserve>Claim Offer</button></div></div>`;
  Object.assign(App, { offerCard });
})(window.App = window.App || {});
