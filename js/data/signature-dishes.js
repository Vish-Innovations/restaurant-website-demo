(function (App) {
  'use strict';

  /** Home page "Signature Dishes" cards. */
  const SIGNATURE_DISHES = [
  {n:'Chettinad Chicken Biryani',d:'Seeraga samba rice dum-cooked with chicken and fresh masala.',p:280,v:0,img:'food/biryani-plate',b:'Bestseller'},
  {n:'Chettinad Chicken Curry',d:'18 hand-roasted spices, kalpasi and coconut in a deep, bold gravy.',p:320,v:0,img:'food/curry-with-naan',b:'Signature'},
  {n:'Paneer Butter Masala',d:'Soft paneer in a rich tomato-cashew gravy, mildly spiced.',p:240,v:1,img:'food/paneer-tikka-skillet'},
  {n:'Ghee Roast Dosa',d:'Paper-thin dosa roasted in pure ghee with three chutneys.',p:140,v:1,img:'food/ghee-roast-dosa'},
  {n:'Mutton Pepper Masala',d:'Slow-cooked mutton in black-pepper and fennel masala.',p:390,v:0,img:'food/curry-rice-set',b:"Chef's Pick"},
  {n:'Elaneer Payasam',d:'Chilled tender-coconut payasam — the perfect finish.',p:150,v:1,img:'food/sprinkle-donuts'}];
  Object.assign(App, { SIGNATURE_DISHES });
})(window.App = window.App || {});
