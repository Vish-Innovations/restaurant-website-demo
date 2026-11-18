(function (App) {
  'use strict';
  const { $, $$, ic, inr, imgSrc, vegMark, offerCard, reviewer, initHeroSlider, initReviewSlider, SIGNATURE_DISHES, BRANCHES, WEEKLY_SPECIALS, OFFERS, REVIEWS, INSTAGRAM_POSTS } = App;

  function renderSignature(root) {
    $('#signature', root).innerHTML = SIGNATURE_DISHES.map(
      (d) =>
        `<div class="card reveal"><div class="ph">${d.b ? `<span class="badge">${d.b}</span>` : ''}<img data-img="${d.img}" alt="${d.n}"></div><div class="card-b"><h3>${d.n}</h3><p>${d.d}</p><div class="row"><span class="price">₹${d.p}</span>${vegMark(d.v)}</div></div></div>`
    ).join('');
  }

  function renderBranchCards(root) {
    $('#branchCards', root).innerHTML = Object.entries(BRANCHES)
      .map(
        ([key, b]) =>
          `<div class="card reveal"><div class="ph" style="aspect-ratio:16/9"><span class="badge">${b.sub}</span><img data-img="${b.img}" alt="${b.name}"></div><div class="card-b"><h3>${b.name} Branch</h3><ul class="info-list" style="margin:12px 0"><li>${ic('pin')}${b.addr}</li><li>${ic('phone')}${b.phone}</li><li>${ic('clock')}${b.hours[0][1]}</li></ul><div class="btns" style="margin-top:auto"><a href="${key}.html" class="btn btn-sm">View Branch</a><a class="btn btn-sm btn-o" href="https://maps.google.com/?q=${encodeURIComponent(b.q)}" target="_blank" rel="noopener">Directions</a><a class="btn btn-sm btn-o" href="tel:${b.phone.replace(/\s/g, '')}">Call</a></div></div></div>`
      )
      .join('');
  }

  /** "This Week's Specials": big feature card + day picker. */
  function initWeeklySpecials(root) {
    const today = new Date().getDay();
    const feature = $('#wkFeature', root);

    function show(i, animate) {
      const w = WEEKLY_SPECIALS[i];
      const label =
        i === today ? `Today · ${w.full}` : i === (today + 1) % 7 ? `Tomorrow · ${w.full}` : `${w.full} Special`;
      feature.innerHTML = `<div class="wk-img"><img src="${imgSrc(w.img)}" alt="${w.n}"><span class="wk-day">${label}</span><span class="wk-left">${ic('flame')}Only ${w.q} plates a day</span><span class="wk-price">${inr(w.p)}</span></div>
   <div class="wk-b"><h3>${w.n}</h3><p>${w.d}</p><div class="wk-meta"><span>${ic('clock')}From 12 PM till sold out</span><span>${ic('pin')}${w.br}</span><span>${ic('utensils')}Dine-in only</span></div>
   <div class="btns"><button class="btn" data-reserve>${ic('cal')}Reserve for ${i === today ? 'Today' : w.full}</button><a href="menu.html" class="btn btn-o">View Full Menu</a></div></div>`;
      $$('.wk-d', root).forEach((d) => d.classList.toggle('on', +d.dataset.i === i));
      if (animate) {
        feature.classList.remove('anim');
        void feature.offsetWidth; // restart CSS animation
        feature.classList.add('anim');
      }
    }

    // Monday-first order
    $('#wkDays', root).innerHTML = [1, 2, 3, 4, 5, 6, 0]
      .map((i) => {
        const w = WEEKLY_SPECIALS[i];
        const tag =
          i === today
            ? '<span class="tagd today">Today</span>'
            : i === (today + 1) % 7
              ? '<span class="tagd tmr">Tomorrow</span>'
              : `<span class="tagd">${inr(w.p)}</span>`;
        return `<button class="wk-d" data-i="${i}"><img data-img="${w.img}" alt=""><div><small>${w.full.toUpperCase()}</small><b>${w.n}</b></div>${tag}</button>`;
      })
      .join('');
    $('#wkDays', root).onclick = (e) => {
      const d = e.target.closest('.wk-d');
      if (!d) return;
      show(+d.dataset.i, true);
      if (innerWidth < 960) feature.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    show(today, false);
  }

  function mount(root) {
    renderSignature(root);
    renderBranchCards(root);
    initWeeklySpecials(root);
    $('#offersHome', root).innerHTML = OFFERS.slice(0, 3).map(offerCard).join('');
    $('#rvTrack', root).innerHTML = REVIEWS.map(
      (r) => `<div class="rv"><p>“${r.t}”</p><div class="stars">★★★★★</div>${reviewer(r)}</div>`
    ).join('');
    $('#insta', root).innerHTML = INSTAGRAM_POSTS.map(
      (img) => `<a href="#" aria-label="Instagram post"><img data-img="${img}" alt=""></a>`
    ).join('');
    initHeroSlider(root);
    initReviewSlider(root, REVIEWS.length);
  }
  (App.pages = App.pages || {}).home = { mount };
})(window.App = window.App || {});
