(function (App) {
  'use strict';

  /** c = category tab, i = image path, t = caption. */
  const GALLERY = [
  {i:'food/biryani-plate',c:'Food',t:'Chicken Biryani'},{i:'venues/rooftop-terrace',c:'Ambience',t:'Rooftop at night'},
  {i:'food/curry-with-naan',c:'Food',t:'Chettinad Curry'},{i:'kitchen/chefs-cooking-together',c:'Kitchen',t:'Morning prep'},
  {i:'events/wine-toast',c:'Events',t:'Banquet setup'},{i:'food/ghee-roast-dosa',c:'Food',t:'Ghee Roast Dosa'},
  {i:'venues/restaurant-dining-hall',c:'Ambience',t:'Velachery dining'},{i:'events/birthday-balloons',c:'Events',t:'Birthday décor'},
  {i:'venues/night-terrace-dining',c:'Kitchen',t:'Plating'},{i:'food/paneer-tikka-skillet',c:'Food',t:'Paneer Butter Masala'},
  {i:'venues/bar-lounge',c:'Ambience',t:'Lounge'},{i:'food/sprinkle-donuts',c:'Food',t:'Desserts'},
  {i:'venues/rooftop-terrace',c:'Events',t:'Rooftop party'},{i:'venues/friends-sharing-meal',c:'Kitchen',t:'Our team'}];
  Object.assign(App, { GALLERY });
})(window.App = window.App || {});
