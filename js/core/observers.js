(function (App) {
  'use strict';
  const { $$ } = App;

  /** Fade-in on scroll for .reveal elements. */
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );

  /** Count-up animation for [data-count] numbers. */
  const counterObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const end = +el.dataset.count;
        const suffix = el.dataset.suf || '+';
        el.classList.add('done');
        counterObserver.unobserve(el);
        let n = 0;
        const timer = setInterval(() => {
          n += Math.ceil(end / 40);
          if (n >= end) {
            n = end;
            clearInterval(timer);
          }
          el.textContent = n + suffix;
        }, 35);
      }),
    { threshold: 0.5 }
  );

  /** Call after a page becomes visible. */
  function observeVisible() {
    $$('.page.show .reveal:not(.in)').forEach((el) => revealObserver.observe(el));
    $$('.page.show [data-count]:not(.done)').forEach((el) => counterObserver.observe(el));
  }
  Object.assign(App, { observeVisible });
})(window.App = window.App || {});
