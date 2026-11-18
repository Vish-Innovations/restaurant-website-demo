(function (App) {
  'use strict';
  const { toast } = App;

  /**
   * Declarative click/submit actions, so markup never needs inline onclick:
   *   data-scroll-to="elementId"  -> smooth-scroll to that element
   *   data-toast="message"        -> show a toast
   *   <form data-newsletter>      -> demo newsletter signup
   */
  function initActions() {
    document.addEventListener('click', (e) => {
      const scroller = e.target.closest('[data-scroll-to]');
      if (scroller) document.getElementById(scroller.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      const toaster = e.target.closest('[data-toast]');
      if (toaster) toast(toaster.dataset.toast);
    });
    document.addEventListener('submit', (e) => {
      if (!e.target.matches('[data-newsletter]')) return;
      e.preventDefault();
      e.target.reset();
      toast('Subscribed! You will hear from us soon.');
    });
  }
  Object.assign(App, { initActions });
})(window.App = window.App || {});
