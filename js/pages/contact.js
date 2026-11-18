(function (App) {
  'use strict';
  const { $, $$, ic, BRANCHES, FAQ } = App;

  function mount(root) {
    $('#contactBranches', root).innerHTML = Object.entries(BRANCHES)
      .map(
        ([key, b]) =>
          `<div class="card"><div class="map" style="border-radius:0;border:0"><iframe loading="lazy" title="Map ${b.name}" src="https://maps.google.com/maps?q=${encodeURIComponent(b.q)}&z=15&output=embed"></iframe></div><div class="card-b"><h3>${b.name} Branch</h3><ul class="info-list"><li>${ic('pin')}${b.addr}</li><li>${ic('phone')}<a href="tel:${b.phone.replace(/\s/g, '')}">${b.phone}</a></li><li>${ic('clock')}${b.hours[0][1]}</li><li>${ic('mail')}${b.mail}</li></ul><a href="${key}.html" class="go">View branch details ${ic('arrow')}</a></div></div>`
      )
      .join('');
    $('#faq', root).innerHTML = FAQ.map(
      (f) => `<div class="faq-i"><button class="faq-q">${f[0]}<span>+</span></button><div class="faq-a">${f[1]}</div></div>`
    ).join('');
    $$('.faq-q', root).forEach((q) => (q.onclick = () => q.parentElement.classList.toggle('open')));
  }
  (App.pages = App.pages || {}).contact = { mount };
})(window.App = window.App || {});
