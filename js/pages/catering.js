(function (App) {
  'use strict';
  const { $, $$ } = App;

  /** "How it works" stepper: progress bar fills and steps light up as you scroll. */
  function updateStepper() {
    if (!$('#catering').classList.contains('show')) return;
    const wrap = $('#proc');
    const rect = wrap.getBoundingClientRect();
    const vh = innerHeight;
    const vertical = innerWidth <= 760;
    const p = Math.min(1, Math.max(0, vertical ? (vh * 0.7 - rect.top) / (rect.height * 0.85) : (vh * 0.85 - rect.top) / (vh * 0.5)));
    const fill = $('#procFill');
    fill.style.width = vertical ? '100%' : p * 100 + '%';
    fill.style.height = vertical ? p * 100 + '%' : '100%';
    const steps = $$('.proc-s', wrap);
    steps.forEach((el, i) => el.classList.toggle('on', rect.top < vh * 0.9 && p >= i / (steps.length - 1) - 0.01));
  }

  function mount() {
    addEventListener('scroll', updateStepper, { passive: true });
    addEventListener('resize', updateStepper);
  }

  const onShow = () => setTimeout(updateStepper, 40);
  (App.pages = App.pages || {}).catering = { mount, onShow };
})(window.App = window.App || {});
