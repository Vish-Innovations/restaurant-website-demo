(function (App) {
  'use strict';
  const { $, $$, isoDate, toast } = App;

  const SUCCESS_TEXT = {
    event: 'Our events team will call you within 24 hours with a quote.',
    catering: 'Our catering team will send you a quote within 24 hours.',
    job: 'Thank you for applying! HR will contact you within a week.',
    contact: "Thanks for reaching out — we'll reply within one working day.",
  };

  /** True when a [required] field is empty/invalid. */
  function isInvalid(el) {
    let bad = !el.value.trim();
    if (!bad && el.dataset.phone !== undefined) bad = !/^[6-9]\d{9}$/.test(el.value.replace(/\D/g, '').slice(-10));
    if (!bad && el.dataset.future !== undefined) bad = el.value < isoDate(new Date());
    if (!bad && el.min && el.type === 'number') bad = +el.value < +el.min;
    return bad;
  }

  function handleSubmit(form) {
    const badFields = [];
    $$('[required]', form).forEach((el) => {
      const bad = isInvalid(el);
      const wrap = el.closest('.f');
      wrap.classList.toggle('has-e', bad);
      el.classList.toggle('bad', bad);
      if (bad) badFields.push(el);
    });
    if (badFields.length) {
      const first = badFields[0];
      const label = (n) => n.closest('.f').querySelector('label').textContent.replace('*', '').trim();
      toast(badFields.length === 1 ? `Please check: ${label(first)}` : `Please fix ${badFields.length} fields: ${badFields.map(label).join(', ')}`);
      const wrap = first.closest('.f');
      wrap.classList.remove('shake'); void wrap.offsetWidth; wrap.classList.add('shake');
      first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      first.focus({ preventScroll: true });
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const box = $('.ok', form);
    const id = 'KC' + Math.floor(1e4 + Math.random() * 9e4);
    const kind = form.dataset.kind;

    const CHECK = '<svg class="ok-check" viewBox="0 0 52 52" aria-hidden="true"><circle class="ok-ring" cx="26" cy="26" r="24"/><path class="ok-tick" d="M14 27l8 8 16-18"/></svg>';
    const row = (k, v) => `<div><span>${k}</span><b>${v}</b></div>`;
    let title, lead, details = '', extra = '';

    if (kind === 'reserve') {
      const msg = encodeURIComponent(
        `Hi Kaaram & Co.! Booking request ${id}\nName: ${data.name}\nBranch: ${data.branch}\nDate: ${data.date} at ${data.time}\nGuests: ${data.guests}\nOccasion: ${data.occ}`
      );
      title = 'Booking request received!';
      lead = `We'll confirm on <b>${data.phone}</b> within 30 minutes.`;
      details =
        row('Reference', id) + row('Branch', data.branch) +
        row('Date', new Date(data.date).toDateString()) + row('Time', data.time) +
        row('Guests', data.guests) + row('Occasion', data.occ);
      extra = `<a class="btn btn-sm ok-wa" target="_blank" rel="noopener" href="https://wa.me/919840012345?text=${msg}">Confirm faster on WhatsApp</a>`;
    } else {
      title = `Thank you, ${data.name.split(' ')[0]}!`;
      lead = SUCCESS_TEXT[kind];
      details = row('Reference', id);
    }

    box.innerHTML = `${CHECK}<h4>${title}</h4><p>${lead}</p><div class="ok-details">${details}</div>${extra}
      <button type="button" class="btn btn-o btn-sm ok-again" data-ok-close>${kind === 'reserve' ? 'Done' : 'Send another'}</button>`;
    form.reset();
    $$('[data-future]', form).forEach((i) => (i.min = isoDate(new Date())));
    form.classList.add('is-done'); // hides the fields, shows only the confirmation panel
    box.classList.add('show');
    (form.closest('.modal') || form).scrollTop = 0;
    if (!form.closest('.modal')) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /** Back to an empty form (used by the "Send another" / "Done" button and when the modal closes). */
  function resetDone(form) {
    form.classList.remove('is-done');
    $('.ok', form).classList.remove('show');
  }

  /**
   * Handles every <form class="js-form" data-kind="…"> on the site via event delegation,
   * so forms inside lazily-loaded pages work without extra wiring.
   */
  function initForms() {
    document.addEventListener('submit', (e) => {
      const form = e.target.closest('.js-form');
      if (!form) return;
      e.preventDefault();
      handleSubmit(form);
    });
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-ok-close]');
      if (!btn) return;
      const form = btn.closest('.js-form');
      resetDone(form);
      const modal = form.closest('.modal');
      if (modal && btn.textContent.trim() === 'Done') modal.classList.remove('open'), (document.body.style.overflow = '');
    });
    document.addEventListener('input', (e) => {
      if (!e.target.closest('.js-form')) return;
      e.target.classList.remove('bad');
      e.target.closest('.f')?.classList.remove('has-e');
    });
  }
  Object.assign(App, { initForms, resetDone });
})(window.App = window.App || {});
