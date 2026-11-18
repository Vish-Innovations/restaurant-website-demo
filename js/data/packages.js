(function (App) {
  'use strict';

  /** Party packages (events page). */
  const PARTY_PACKAGES = [
  {n:'Silver',p:'₹650',items:['Welcome drink','2 starters (veg + non-veg)','Biryani + 2 mains','Parotta & rice','1 dessert','Basic table décor']},
  {n:'Gold',p:'₹850',pop:1,items:['Welcome drink & soup','4 starters','Biryani + 3 mains','Live dosa counter','2 desserts + ice cream','Theme décor & cake table']},
  {n:'Platinum',p:'₹1,150',items:['Mocktail bar','6 starters incl. seafood','2 biryanis + 4 mains','Live counters (dosa, parotta)','3 desserts','Premium décor, photo booth & host']}];
  Object.assign(App, { PARTY_PACKAGES });
})(window.App = window.App || {});
