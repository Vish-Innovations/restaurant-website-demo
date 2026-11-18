(function (App) {
  'use strict';
  const { $, $$, JOURNEY } = App;

  /** Scroll-driven timeline: fills the line and lights up each milestone. */
  function updateTimeline() {
    if (!$('#story').classList.contains('show')) return;
    const wrap = $('#jr');
    const rect = wrap.getBoundingClientRect();
    const vh = innerHeight;
    const progress = Math.min(1, Math.max(0, (vh * 0.65 - rect.top) / (rect.height - 40)));
    $('#jrFill').style.height = progress * 100 + '%';
    $$('.jr-i', wrap).forEach((item) => {
      if (item.getBoundingClientRect().top < vh * 0.75) item.classList.add('lit');
    });
  }

  function mount(root) {
    $('#jrItems', root).innerHTML = JOURNEY.map(
      (j, i) =>
        `<div class="jr-i ${i % 2 ? 'r' : 'l'}"><div class="jr-dot"></div><div class="jr-card"><div class="jr-img"><img data-img="${j.img}" alt="${j.t}"><span class="jr-year">${j.y}</span></div><div class="jr-b"><h4>${j.t}</h4><p>${j.d}</p></div></div></div>`
    ).join('');
    addEventListener('scroll', updateTimeline, { passive: true });
  }

  const onShow = updateTimeline;
  (App.pages = App.pages || {}).story = { mount, onShow };
})(window.App = window.App || {});
