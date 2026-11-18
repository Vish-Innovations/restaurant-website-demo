/**
 * Application entry point (runs last, after every script is loaded).
 * 1. injects the shared layout  2. starts shared components  3. mounts this page's JS.
 */
(function (App) {
  'use strict';
  const { renderLayout, hydrate, installImageFallback, loadImages, observeVisible, initNav, initActions,
          initForms, initLightbox, initReserveModal, startStatusTicker } = App;

  const { page, branch } = document.body.dataset;

  installImageFallback();
  renderLayout(page, branch);
  hydrate(document);          // icons + "today or later" date minimums
  initNav();
  initActions();
  initForms();
  initLightbox();
  initReserveModal();
  startStatusTicker();

  const section = document.querySelector('.page');
  const pageModule = App.pages && App.pages[page];
  if (pageModule) pageModule.mount(section, { id: section.id });
  loadImages(section);
  observeVisible();
  setTimeout(() => pageModule && pageModule.onShow && pageModule.onShow(section), 80);
})(window.App);
