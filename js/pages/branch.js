(function (App) {
  'use strict';
  const { ic, reviewCard, todayHours, paintBranchStatus, BRANCHES, REVIEWS } = App;

  /**
   * One template renders both branch pages (#annanagar, #velachery)
   * from the BRANCHES data — add a branch in data/branches.js + routes.js.
   */
  function mount(root, { id: key }) {
    const b = BRANCHES[key];
    const [otherKey, other] = Object.entries(BRANCHES).find(([k]) => k !== key);
    const tel = b.phone.replace(/\s/g, '');
    const directions = `https://maps.google.com/?q=${encodeURIComponent(b.q)}`;
    const reviews = REVIEWS.filter((r) => r.b === b.name).slice(0, 2);
    const pin = b.addr.match(/\d{6}/)[0];

    root.innerHTML = `
   <div class="banner tall" style="height:440px"><img data-img="${b.img}" alt="${b.name} branch"><div class="container">
    <span class="eyebrow">Kaaram &amp; Co. · ${b.sub}</span><h1>${b.name} Branch</h1>
    <div class="baddr">${ic('pin')}${b.addr}</div><span class="bstat" data-bs="${key}"></span>
    <div class="btns" style="margin-top:20px"><a class="btn btn-sm" href="tel:${tel}">${ic('phone')}Call</a><a class="btn btn-sm btn-o" href="${directions}" target="_blank" rel="noopener">${ic('pin')}Directions</a><button class="btn btn-sm btn-o" data-reserve data-branch="${b.opt}">${ic('cal')}Reserve Table</button></div>
    <div class="crumb" style="margin-top:16px"><a href="index.html">Home</a> / Branches / ${b.name}</div></div></div>
   <div class="qi-wrap"><div class="container"><div class="qi">
    <div><span class="qic">${ic('pin')}</span><div><small>Address</small><b>${b.addr.split(',').slice(0, 2).join(',')}</b><span>Chennai – ${pin}</span></div></div>
    <div><span class="qic">${ic('clock')}</span><div><small>Today's Hours</small><b>${todayHours(key)}</b></div></div>
    <div><span class="qic">${ic('phone')}</span><div><small>Phone</small><b><a href="tel:${tel}">${b.phone}</a></b><span>${b.mail}</span></div></div>
    <div><span class="qic">${ic('car')}</span><div><small>Parking</small><b>${b.parking[0]}</b><span>${b.parking[1]}</span></div></div>
   </div></div></div>
   <section class="section"><div class="container">
    <div class="center"><span class="eyebrow">At This Branch</span><h2 class="title">What You'll Find at ${b.name}</h2><p class="lead">${b.about}</p></div>
    <div class="g4 mt">${b.at
      .map(
        (a) =>
          `<a class="at ${a.note ? 'note' : ''}" href="${a.l}"><div class="at-top"><div class="at-ph"><img data-img="${a.img}" alt="${a.t}"></div>${a.note ? `<span class="at-flag">${a.note}</span>` : ''}<span class="at-ic">${ic(a.ic)}</span></div><div class="at-b"><h3>${a.t}</h3><p>${a.d}</p><span class="go">${a.c} ${ic('arrow')}</span></div></a>`
      )
      .join('')}</div>
   </div></section>
   <section class="section alt"><div class="container">
    <div class="center"><span class="eyebrow">Inside ${b.name}</span><h2 class="title">Take a Look</h2></div>
    <div class="mini-gal bgal mt">${[b.img, ...b.gal].map((g) => `<img data-img="${g}" alt="${b.name} branch photo" data-lb>`).join('')}</div>
    <div class="fac six" style="margin-top:30px">${b.fac.map((f) => `<div>${ic(f[0])}${f[1]}</div>`).join('')}</div>
   </div></section>
   <section class="section"><div class="container g2" style="align-items:stretch">
    <div class="map"><iframe loading="lazy" title="Map — ${b.name} branch" src="https://maps.google.com/maps?q=${encodeURIComponent(b.q)}&z=15&output=embed"></iframe></div>
    <div><span class="eyebrow">Find Us</span><h2 class="title">How to Reach</h2>
     <ul class="info-list"><li>${ic('pin')}<span><b>Landmark</b><br>${b.land}</span></li><li>${ic('train')}<span><b>Metro / Train</b><br>${b.metro}</span></li><li>${ic('bus')}<span><b>Bus</b><br>${b.bus}</span></li></ul>
     <h3 style="font-size:1.25rem;margin-top:8px">Opening Hours</h3><table class="hours">${b.hours.map((h) => `<tr><td>${h[0]}</td><td>${h[1]}</td></tr>`).join('')}</table>
     <div class="btns"><a class="btn" href="${directions}" target="_blank" rel="noopener">${ic('pin')}Get Directions</a><a class="btn btn-o" href="https://wa.me/91${tel.slice(-10)}" target="_blank" rel="noopener">${ic('wa')}WhatsApp</a></div></div>
   </div></section>
   <section class="section alt"><div class="container">
    <div class="center"><span class="eyebrow">Guest Reviews</span><h2 class="title">What Guests Say About ${b.name}</h2></div>
    <div class="g2 mt" style="align-items:stretch;gap:24px">${reviews.map((r) => reviewCard(r, 'margin:0')).join('')}</div>
    <div class="center mt"><a href="reviews.html" class="btn btn-o">All Reviews</a></div>
   </div></section>
   <section class="section"><div class="container" style="max-width:820px">
    <a class="switch" href="${otherKey}.html"><img data-img="${other.img}" alt="${other.name} branch"><div><small>Looking for our other branch?</small><h3>${other.name} Branch →</h3><p>${other.addr}</p></div></a>
   </div></section>`;
    paintBranchStatus();
  }
  (App.pages = App.pages || {}).branch = { mount };
})(window.App = window.App || {});
