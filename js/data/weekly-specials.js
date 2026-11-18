(function (App) {
  'use strict';

  /** One special per weekday. Index = Date#getDay() (0 = Sunday). */
  const WEEKLY_SPECIALS = [
  {full:'Sunday',n:'Chettinad Feast Thali',img:'food/curry-rice-set',d:'A full Chettinad spread of 12 items — biryani, chicken curry, fish fry, kootu, rasam and elaneer payasam on one plate.',p:549,q:60,br:'Both branches'},
  {full:'Monday',n:'Mutton Kola Urundai',img:'food/samosa-platter',d:'Minced mutton spiced with fennel and poppy seeds, rolled into balls and fried golden — Achi\'s Monday classic.',p:290,q:40,br:'Both branches'},
  {full:'Tuesday',n:'Nethili Fry',img:'food/salmon-plate-dark',d:'Fresh Kasimedu anchovies marinated in chilli, turmeric and curry leaves, fried crisp. Best with rasam rice.',p:290,q:40,br:'Both branches'},
  {full:'Wednesday',n:'Chicken Kothu Parotta',img:'food/spiced-rice-pan',d:'Flaky parotta shredded on the hot tawa with egg, chicken and salna — the sound of Chennai\'s street food.',p:230,q:50,br:'Both branches'},
  {full:'Thursday',n:'Nattu Kozhi Rasam',img:'food/tomato-soup-bowl',d:'A peppery country-chicken rasam slow-simmered for four hours. Perfect for a Chennai evening.',p:180,q:40,br:'Both branches'},
  {full:'Friday',n:'Vanjaram Fish Fry',img:'food/fish-fillet-plated',d:'Thick seer fish steaks coated in our house masala and shallow-fried in gingelly oil.',p:420,q:30,br:'Both branches'},
  {full:'Saturday',n:'Seeraga Samba Mutton Biryani',img:'food/biryani-brass-bowls',d:'Our weekend biryani — goat meat and seeraga samba rice slow-cooked on wood-fired dum for three hours.',p:380,q:60,br:'Both branches'}];
  Object.assign(App, { WEEKLY_SPECIALS });
})(window.App = window.App || {});
