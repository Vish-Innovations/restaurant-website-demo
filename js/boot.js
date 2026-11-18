/**
 * Script loader. Each HTML page only includes this one file; it loads the shared scripts,
 * then the scripts that page needs, then main.js — in order.
 * (Plain <script> tags are used instead of ES modules so the site also works when
 *  index.html is opened by double-click, without a server.)
 *
 * To add a page script: create js/pages/<name>.js and add it to PAGE_SCRIPTS below.
 */
(function () {
  var SHARED = [
    'core/dom.js',
    'core/format.js',
    'core/icon-paths.js',
    'core/icons.js',
    'core/hydrate.js',
    'core/images.js',
    'core/observers.js',
    'components/layout.js',
    'components/nav.js',
    'components/toast.js',
    'components/actions.js',
    'components/forms.js',
    'components/lightbox.js',
    'components/reserve-modal.js',
    'data/branches.js',
    'components/open-status.js'
  ];

  var PAGE_SCRIPTS = {
    'branch': ['components/review-card.js', 'data/reviews.js', 'pages/branch.js'],
    careers: ['data/jobs.js', 'pages/careers.js'],
    catering: ['pages/catering.js'],
    contact: ['data/faq.js', 'pages/contact.js'],
    events: ['data/packages.js', 'data/decor-gallery.js', 'pages/events.js'],
    gallery: ['data/gallery.js', 'pages/gallery.js'],
    home: ['components/dish.js', 'components/offer-card.js', 'components/review-card.js', 'components/sliders.js', 'data/signature-dishes.js', 'data/weekly-specials.js', 'data/offers.js', 'data/reviews.js', 'data/instagram.js', 'pages/home.js'],
    menu: ['components/dish.js', 'data/menu.js', 'pages/menu.js'],
    offers: ['components/offer-card.js', 'data/offers.js', 'pages/offers.js'],
    reviews: ['components/review-card.js', 'data/reviews.js', 'pages/reviews.js'],
    stay: ['data/rooms.js', 'pages/stay.js'],
    story: ['data/journey.js', 'pages/story.js']
  };

  var page = document.body.dataset.page;
  var list = SHARED.concat(PAGE_SCRIPTS[page] || [], ['main.js']);
  list.forEach(function (file) {
    var s = document.createElement('script');
    s.src = 'js/' + file;
    s.async = false; // keep execution order
    document.body.appendChild(s);
  });
})();
