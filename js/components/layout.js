/**
 * Shared page chrome (top bar, header/nav, footer, floating buttons, modals).
 * Written once here and injected into every page, so the 15 HTML files stay small
 * and a nav change is a one-file edit.
 */
(function (App) {
  'use strict';
  const { $, $$ } = App;

  const TOP = `
<div class="topbar"><div class="container">
  <div class="l"><span><i class="dot" id="stDot"></i><b id="stTxt">Checking hours…</b></span><span><i data-ic="phone"></i>+91 98400 12345</span></div>
  <div class="r"><span>Order online:</span><a href="https://www.swiggy.com" target="_blank" rel="noopener">Swiggy</a><a href="https://www.zomato.com" target="_blank" rel="noopener">Zomato</a></div>
</div></div>

<header><div class="nav-scrim"></div><div class="container nav">
  <a href="index.html" class="logo">Kaaram <span>&amp;</span> Co.<small>CHETTINAD · CHENNAI</small></a>
  <ul class="links" id="links">
    <button class="burger close-nav" id="closeNav" aria-label="Close menu"><i data-ic="x"></i></button>
    <li><a href="index.html">Home</a></li>
    <li><a href="story.html">Our Story</a></li>
    <li><a href="menu.html">Menu</a></li>
    <li><a href="stay.html">Stay</a></li>
    <li class="dd"><a href="annanagar.html" data-group="branch">Branches ▾</a>
      <div class="dd-menu"><a href="annanagar.html">Anna Nagar Branch</a><a href="velachery.html">Velachery Branch</a></div></li>
    <li><a href="events.html">Private Dining</a></li>
    <li><a href="catering.html">Catering</a></li>
    <li><a href="offers.html">Offers</a></li>
    <li><a href="gallery.html">Gallery</a></li>
    <li><a href="reviews.html">Reviews</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <div class="nav-cta"><button class="btn btn-sm" data-reserve><i data-ic="cal"></i>Reserve a Table</button><button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="links"><i data-ic="menu"></i></button></div>
</div></header>
`;

  const BOTTOM = `
<footer>
  <div class="container fgrid">
    <div><a href="index.html" class="logo">Kaaram <span>&amp;</span> Co.<small>CHETTINAD · CHENNAI</small></a>
      <p style="margin-top:16px">Authentic Chettinad and Chennai street food with masala ground fresh every morning. Since 2010.</p>
      <div class="social"><a href="#" aria-label="Instagram"><i data-ic="ig"></i></a><a href="#" aria-label="Facebook"><i data-ic="fb"></i></a><a href="#" aria-label="YouTube"><i data-ic="yt"></i></a><a href="#" aria-label="WhatsApp"><i data-ic="wa"></i></a></div></div>
    <div><h5>Explore</h5><ul><li><a href="story.html">Our Story</a></li><li><a href="menu.html">Menu</a></li><li><a href="stay.html">Stay</a></li><li><a href="events.html">Private Dining</a></li><li><a href="catering.html">Catering</a></li><li><a href="offers.html">Offers</a></li><li><a href="careers.html">Careers</a></li></ul></div>
    <div><h5>Branches</h5><ul><li><a href="annanagar.html"><b>Anna Nagar</b><br>No. 14, 2nd Avenue, Chennai 600040</a></li><li><a href="velachery.html"><b>Velachery</b><br>No. 88, Velachery Main Rd, Chennai 600042</a></li></ul></div>
    <div><h5>Hours</h5><p>Lunch: 12:00 PM – 3:30 PM<br>Dinner: 7:00 PM – 11:30 PM<br><span style="color:var(--gold-l)">Anna Nagar rooftop till 1 AM (Fri–Sun)</span></p>
      <p style="margin-top:16px">Get offers on WhatsApp &amp; email</p>
      <form class="news" data-newsletter><input type="email" placeholder="Your email" required><button class="btn btn-sm">Join</button></form></div>
  </div>
  <div class="container fbot"><span>© 2026 Kaaram &amp; Co. · FSSAI Lic. No. 1XXXXXXXXXXXXX (sample)</span><span><a href="privacy.html">Privacy Policy</a> · <a href="terms.html">Terms</a> · <a href="contact.html">FAQ</a></span><span>Portfolio concept — fictional restaurant · designed &amp; developed by <b style="color:var(--gold-l)">Vish Innovations</b></span></div>
</footer>

<nav class="mbar"><a href="tel:+919840012345"><i data-ic="phone"></i>Call</a><a href="https://maps.google.com/?q=Anna+Nagar+2nd+Avenue+Chennai" target="_blank" rel="noopener"><i data-ic="pin"></i>Directions</a><a class="rs" data-reserve><i data-ic="cal"></i>Reserve</a></nav>

<div class="modal" id="resModal"><div class="modal-box">
  <form class="form js-form" data-kind="reserve" novalidate>
    <button type="button" class="mx" id="resClose">×</button>
    <h3>Reserve a Table</h3><p>Instant request — we confirm by call/WhatsApp within 30 minutes.</p>
    <div class="fg">
      <div class="f"><label>Name *</label><input name="name" required><span class="e">Please enter your name</span></div>
      <div class="f"><label>Phone *</label><input name="phone" type="tel" required data-phone><span class="e">Enter a valid 10-digit number</span></div>
      <div class="f full"><label>Branch *</label><select name="branch" id="resBranch" required><option>Anna Nagar — Rooftop</option><option>Velachery — Family Dining</option></select></div>
      <div class="f"><label>Date *</label><input name="date" type="date" required data-future><span class="e">Pick today or a future date</span></div>
      <div class="f"><label>Time *</label><select name="time" required><option value="">Select slot</option><option>12:00 PM</option><option>12:30 PM</option><option>1:00 PM</option><option>1:30 PM</option><option>2:00 PM</option><option>2:30 PM</option><option>7:00 PM</option><option>7:30 PM</option><option>8:00 PM</option><option>8:30 PM</option><option>9:00 PM</option><option>9:30 PM</option><option>10:00 PM</option></select><span class="e">Select a time slot</span></div>
      <div class="f"><label>Guests *</label><select name="guests" required><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9+</option></select></div>
      <div class="f"><label>Occasion</label><select name="occ"><option>Just dining</option><option>Birthday</option><option>Anniversary</option><option>Date night</option><option>Business</option></select></div>
      <div class="f full"><label>Special Request</label><textarea name="msg" rows="2" placeholder="High chair, window seat, cake…"></textarea></div>
    </div>
    <button class="btn" type="submit"><i data-ic="cal"></i>Request Booking</button>
    <div class="ok"></div>
  </form>
</div></div>

<div class="lb" id="lb"><button class="x" aria-label="Close">×</button><button class="pv" aria-label="Previous">‹</button><img alt=""><button class="nx" aria-label="Next">›</button></div>
<div class="toast" id="toast"></div>
`;

  /** @param {string} page  value of <body data-page>, @param {string=} branch  value of <body data-branch> */
  function renderLayout(page, branch) {
    document.body.insertAdjacentHTML('afterbegin', TOP);
    document.body.insertAdjacentHTML('beforeend', BOTTOM);

    // Highlight the current page in the nav
    const current = (branch || page) + '.html';
    const file = current === 'home.html' ? 'index.html' : current;
    $$('.links a').forEach((a) => {
      const href = a.getAttribute('href');
      const inBranchGroup = a.dataset.group === 'branch' && !!branch;
      a.classList.toggle('active', !a.closest('.dd-menu') && (href === file || inBranchGroup));
    });
  }

  Object.assign(App, { renderLayout });
})(window.App = window.App || {});
