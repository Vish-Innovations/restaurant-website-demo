(function (App) {
  'use strict';
  const { $, $$, ic, inr, isoDate, loadImages, toast, ROOMS } = App;

  let category = 'All';
  let sIn, sOut, bIn, bOut;

  /** Price shown on a room card for its currently selected rate plan. */
  const nightly = (r) => (r.rate === 'nr' ? Math.round(r.p * 0.9) : r.p);

  // ───────── Room cards ─────────
  function drawRooms() {
    $('#roomGrid').innerHTML = ROOMS.filter((r) => category === 'All' || r.c === category)
      .map(
        (r) => `<div class="card"><div class="ph">${r.b ? `<span class="badge">${r.b}</span>` : ''}<img data-img="${r.img}" alt="${r.n}"><span class="night">${inr(nightly(r))} <small>/ night</small></span>${r.left <= 3 ? `<span class="left">Only ${r.left} left</span>` : ''}</div>
   <div class="card-b"><h3>${r.n}</h3><div class="rm-meta"><span>${ic('size')}${r.sz}</span><span>${ic('bed')}${r.bed}</span><span>${ic('users')}${r.g}</span><span>${ic('eye')}${r.v}</span></div>
   <div class="feats">${r.f.map((x) => `<span>${x}</span>`).join('')}</div>
   <div class="rate"><button type="button" class="${r.rate === 'nr' ? '' : 'on'}" data-rate="${r.id}|flex">Free cancellation<b>${inr(r.p)}</b></button><button type="button" class="${r.rate === 'nr' ? 'on' : ''}" data-rate="${r.id}|nr">Non-refundable · save 10%<b>${inr(Math.round(r.p * 0.9))}</b></button></div>
   <div class="btns" style="margin-top:16px"><button class="btn btn-sm btn-o" data-room="${r.id}">View Details</button><button class="btn btn-sm" data-bookroom="${r.id}">Book Now</button></div></div></div>`
      )
      .join('');
    loadImages($('#roomGrid'));
  }

  // ───────── Room detail modal ─────────
  function openRoomModal(r) {
    $('#roomDetail').innerHTML = `<button type="button" class="mx" style="background:#fff;border-radius:50%;width:40px;height:40px;top:18px;right:18px;box-shadow:0 4px 12px rgba(0,0,0,.2)" id="rmClose">×</button>
    <div class="rm-top"><img data-img="${r.img}" alt="${r.n}"><div class="th">${r.th.map((t) => `<img data-img="${t}" alt="">`).join('')}</div></div>
    <div class="rm-body"><div class="row" style="margin:14px 0 6px"><h2 style="font-size:2rem">${r.n}</h2><span class="price" style="font-size:1.5rem">${inr(r.p)}<small style="color:var(--muted);font-size:.8rem;font-weight:400"> / night</small></span></div>
    <div class="rm-meta" style="grid-template-columns:repeat(4,auto);justify-content:start;gap:8px 24px"><span>${ic('size')}${r.sz}</span><span>${ic('bed')}${r.bed}</span><span>${ic('users')}${r.g}</span><span>${ic('eye')}${r.v}</span></div>
    <p class="lead" style="max-width:none">${r.d}</p><h4 style="margin-top:22px;font-size:1.15rem">Room Amenities</h4><ul class="amen-list">${r.a.map((x) => `<li>${x}</li>`).join('')}</ul>
    <button class="btn" data-bookroom="${r.id}">Book ${r.n}</button></div>`;
    loadImages($('#roomDetail'));
    $('#roomModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    $('#rmClose').onclick = closeRoomModal;
  }

  function closeRoomModal() {
    $('#roomModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ───────── Booking price breakdown ─────────
  const nightsBetween = () => (sIn.value && sOut.value ? Math.round((new Date(sOut.value) - new Date(sIn.value)) / 864e5) : 0);

  /** Updates the price summary box; returns the total (0 when incomplete). */
  function calcStay() {
    const r = ROOMS.find((x) => x.id === $('#sRoom').value);
    const nights = nightsBetween();
    const rooms = +$('#sRooms').value;
    const box = $('#staySum');
    if (!r || nights < 1) {
      box.classList.remove('show');
      return 0;
    }
    const plan = $('#sRate').value;
    const off = plan === 'nr' ? Math.round(r.p * 0.1) : 0;
    const base = r.p * rooms * nights;
    const discount = off * rooms * nights;
    const subtotal = base - discount;
    const gstRate = r.p - off <= 7500 ? 5 : 18;
    const gst = Math.round((subtotal * gstRate) / 100);
    box.innerHTML = `<b>${r.n}</b> · ${rooms} room${rooms > 1 ? 's' : ''} · ${nights} night${nights > 1 ? 's' : ''}
   <table class="brk"><tr><td>Room charges (${inr(r.p)} × ${rooms} × ${nights})</td><td>${inr(base)}</td></tr>${discount ? `<tr class="disc"><td>Non-refundable discount (10%)</td><td>− ${inr(discount)}</td></tr>` : ''}<tr><td>GST @ ${gstRate}%</td><td>${inr(gst)}</td></tr><tr class="tot"><td>Total payable</td><td><b>${inr(subtotal + gst)}</b></td></tr></table>
   <small style="color:var(--muted)">Breakfast included · ${plan === 'nr' ? 'Non-refundable · pay online now' : 'Free cancellation up to 48 hrs · pay at hotel'}</small>`;
    box.classList.add('show');
    return subtotal + gst;
  }

  /** Keeps check-out at least one day after check-in. */
  function linkDates(from, to) {
    const d = new Date(from.value);
    d.setDate(d.getDate() + 1);
    to.min = isoDate(d);
    if (!to.value || to.value <= from.value) to.value = isoDate(d);
  }

  // ───────── Wiring ─────────
  function initRoomClicks() {
    document.addEventListener('click', (e) => {
      const rateBtn = e.target.closest('[data-rate]');
      if (rateBtn) {
        const [id, plan] = rateBtn.dataset.rate.split('|');
        ROOMS.find((x) => x.id === id).rate = plan;
        drawRooms();
        if ($('#sRoom').value === id) {
          $('#sRate').value = plan;
          calcStay();
        }
        return;
      }
      const viewBtn = e.target.closest('[data-room]');
      if (viewBtn) return openRoomModal(ROOMS.find((x) => x.id === viewBtn.dataset.room));
      const bookBtn = e.target.closest('[data-bookroom]');
      if (bookBtn) {
        const r = ROOMS.find((x) => x.id === bookBtn.dataset.bookroom);
        closeRoomModal();
        $('#sRoom').value = r.id;
        $('#sRate').value = r.rate || 'flex';
        calcStay();
        $('#stayForm').scrollIntoView({ behavior: 'smooth' });
      }
    });
    $('#roomModal').onclick = (e) => e.target === $('#roomModal') && closeRoomModal();
    document.addEventListener('keydown', (e) => e.key === 'Escape' && closeRoomModal());
  }

  function initAvailabilityBar() {
    $('#bbar').addEventListener('submit', (e) => {
      e.preventDefault();
      if (!bIn.value || !bOut.value || bOut.value <= bIn.value || bIn.value < isoDate(new Date())) {
        toast('Please select valid check-in and check-out dates');
        return;
      }
      sIn.value = bIn.value;
      linkDates(sIn, sOut);
      sOut.value = bOut.value;
      $('#sPax').value = $('#bPax').value;
      $('#sRooms').value = $('#bRooms').value;
      calcStay();
      const n = nightsBetween();
      const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      const box = $('#avail');
      box.innerHTML = `✓ <b>Rooms available</b> for ${fmt(bIn.value)} → ${fmt(bOut.value)} · ${n} night${n > 1 ? 's' : ''} · ${$('#bPax').value} · ${$('#bRooms').value} room(s). Pick a room below and tap <b>Book Now</b>.`;
      box.classList.add('show');
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function initBookingForm() {
    $('#stayForm').addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      const check = (el, bad) => {
        el.classList.toggle('bad', bad);
        el.closest('.f').classList.toggle('has-e', bad);
        if (bad) ok = false;
      };
      check(sIn, !sIn.value || sIn.value < isoDate(new Date()));
      check(sOut, !sOut.value || nightsBetween() < 1);
      check($('#sRoom'), !$('#sRoom').value);
      check($('#sName'), !$('#sName').value.trim());
      check($('#sPhone'), !/^[6-9]\d{9}$/.test($('#sPhone').value.replace(/\D/g, '').slice(-10)));
      if (!ok) return toast('Please fix the highlighted fields');

      const r = ROOMS.find((x) => x.id === $('#sRoom').value);
      const nights = nightsBetween();
      const rooms = +$('#sRooms').value;
      const ref = 'KH' + Math.floor(1e4 + Math.random() * 9e4);
      const total = calcStay();
      const plan = $('#sRate').value === 'nr' ? 'Non-refundable' : 'Free cancellation';
      $('#stayOk').innerHTML = `<b>✓ Booking request received!</b><br>Ref: <b>${ref}</b> · ${r.n} × ${rooms} · ${plan}<br>${new Date(sIn.value).toDateString()} → ${new Date(sOut.value).toDateString()} (${nights} night${nights > 1 ? 's' : ''}) · ${$('#sPax').value}<br>Total: <b>${inr(total)}</b> incl. GST<br><span style="color:var(--muted)">Our front desk will confirm on ${$('#sPhone').value} within 30 minutes.</span>`;
      $('#stayOk').classList.add('show');
      e.target.reset();
      $('#staySum').classList.remove('show');
    });
    $$('#stayForm input, #stayForm select').forEach((el) =>
      el.addEventListener('input', () => {
        el.classList.remove('bad');
        el.closest('.f').classList.remove('has-e');
      })
    );
  }

  function mount() {
    // Category tabs
    $('#rmTabs').innerHTML = ['All', 'Rooms', 'Suites']
      .map((c) => `<button class="chip ${c === 'All' ? 'on' : ''}" data-rc="${c}">${c === 'All' ? 'All Stays' : c}</button>`)
      .join('');
    $$('[data-rc]').forEach(
      (b) =>
        (b.onclick = () => {
          category = b.dataset.rc;
          $$('[data-rc]').forEach((x) => x.classList.toggle('on', x === b));
          drawRooms();
        })
    );
    drawRooms();

    // Booking form room list
    $('#sRoom').innerHTML += ROOMS.map((r) => `<option value="${r.id}">${r.n} — ${inr(r.p)}/night</option>`).join('');

    // Packages + amenities
    $('#stayPkgs').innerHTML = [
      { t: 'Stay & Dine', d: 'Deluxe Room for 1 night + 3-course rooftop dinner for two + breakfast.', big: '₹5,999', img: 'venues/rooftop-terrace', v: 'All days', tc: 'Taxes extra. Subject to availability.' },
      { t: 'Weekend Getaway', d: 'Stay 2 nights on Fri–Sun and get 15% off any room with late check-out.', big: '15% OFF', img: 'stay/room-city-view', v: 'Fri – Sun', tc: 'Valid till 31 Dec 2026.' },
      { t: 'Long Stay Saver', d: 'Staying 7 nights or more? Save 20% plus free laundry up to 10 pieces a week.', big: '20% OFF', img: 'stay/suite-sofa-lounge', v: '7+ nights', tc: 'Direct bookings only.' },
    ]
      .map(
        (o) =>
          `<div class="card offer"><div class="ph"><img data-img="${o.img}" alt="${o.t}"><span class="big">${o.big}</span></div><div class="card-b"><h3>${o.t}</h3><p>${o.d}</p><div class="valid">${ic('clock')}${o.v}</div><div class="tc">${o.tc}</div><button class="btn btn-sm" style="margin-top:16px;align-self:flex-start" data-scroll-to="stayForm">Book This Offer</button></div></div>`
      )
      .join('');
    $('#stayAmen').innerHTML = [
      ['bell', '24×7 Front Desk'], ['chef', 'In-room Dining'], ['plane', 'Airport & Railway Pickup'], ['shirt', 'Laundry Service'],
      ['car', 'Free Parking'], ['bolt', 'Lift & Power Backup'], ['star', 'Rooftop Access'], ['wifi', 'High-speed Wi-Fi'],
    ]
      .map((a) => `<div>${ic(a[0])}${a[1]}</div>`)
      .join('');

    // Date pickers
    sIn = $('#sIn');
    sOut = $('#sOut');
    bIn = $('#bIn');
    bOut = $('#bOut');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    [sIn, bIn].forEach((x) => (x.min = isoDate(new Date())));
    [sOut, bOut].forEach((x) => (x.min = isoDate(tomorrow)));
    sIn.onchange = () => {
      linkDates(sIn, sOut);
      calcStay();
    };
    bIn.onchange = () => linkDates(bIn, bOut);
    ['#sOut', '#sRoom', '#sRooms'].forEach((s) => $(s).addEventListener('change', calcStay));
    $('#sRate').addEventListener('change', () => {
      const r = ROOMS.find((x) => x.id === $('#sRoom').value);
      if (r) {
        r.rate = $('#sRate').value;
        drawRooms();
      }
      calcStay();
    });

    initRoomClicks();
    initAvailabilityBar();
    initBookingForm();
  }
  (App.pages = App.pages || {}).stay = { mount };
})(window.App = window.App || {});
