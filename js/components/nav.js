(function (App) {
  'use strict';
  const { $, $$ } = App;

  const links = () => $('#links');
  const closeNav = () => {
    links().classList.remove('open');
    document.body.classList.remove('nav-open');
    $('#burger').setAttribute('aria-expanded', 'false');
  };
  const openNav = () => {
    links().classList.add('open');
    document.body.classList.add('nav-open');
    $('#burger').setAttribute('aria-expanded', 'true');
  };

  /** Mobile slide-in menu: burger, close button, dark scrim, Esc key, and link taps all close it. */
  function initNav() {
    $('#burger').onclick = openNav;
    $('#closeNav').onclick = closeNav;
    $('.nav-scrim').onclick = closeNav;
    $$('#links a').forEach((a) => a.addEventListener('click', closeNav));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && closeNav());
    // Leaving the mobile layout (rotate / resize) should never leave the menu stuck open
    matchMedia('(min-width: 1181px)').addEventListener('change', (e) => e.matches && closeNav());
  }

  Object.assign(App, { closeNav, initNav });
})(window.App = window.App || {});
