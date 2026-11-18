(function (App) {
  'use strict';

  /** Rooms & suites for The Kaaram House (Anna Nagar). */
  const ROOMS = [
  {id:'classic',n:'Classic Room',c:'Rooms',p:3499,left:5,sz:'220 sq ft',bed:'Queen bed',g:'2 guests',v:'City view',img:'stay/room-wooden-interior',th:['stay/pool-palm-trees','stay/suite-glass-bathroom'],
   d:'A cosy, well-lit room with teak furniture and Athangudi-tiled flooring — perfect for solo travellers and couples.',f:['AC','Free Wi-Fi','43" Smart TV','Tea/Coffee','Breakfast'],a:['Queen bed with premium linen','Air conditioning','43" Smart TV with OTT','Tea & coffee maker','Work table','Rain shower','Toiletries & towels','Daily housekeeping']},
  {id:'deluxe',n:'Deluxe Room',c:'Rooms',p:4499,left:2,sz:'280 sq ft',bed:'King bed',g:'2 + 1 child',v:'Garden view',b:'Best Value',img:'stay/suite-sofa-lounge',th:['stay/pool-palm-trees','stay/room-dark-king-bed'],
   d:'Spacious room with a king bed, a reading corner and windows overlooking our courtyard garden.',f:['AC','Free Wi-Fi','Work desk','Rain shower','Breakfast'],a:['King bed','Reading nook','Air conditioning','50" Smart TV','Mini fridge','Work desk & chair','Rain shower','In-room safe']},
  {id:'premier',n:'Premier Room',c:'Rooms',p:5499,left:3,sz:'320 sq ft',bed:'King bed',g:'3 guests',v:'Private balcony',img:'stay/room-dark-king-bed',th:['stay/room-king-bed-gold-runner','stay/pool-palm-trees'],
   d:'Our most-loved room with a private sit-out balcony and priority rooftop table booking for dinner.',f:['Balcony','Mini bar','Bathtub','Rooftop priority','Breakfast'],a:['King bed + sofa bed','Private balcony','Mini bar','Bathtub & rain shower','Bathrobes & slippers','Coffee machine','Priority rooftop dinner booking','Evening turndown']},
  {id:'heritage',n:'Heritage Suite',c:'Suites',p:8999,left:1,sz:'520 sq ft',bed:'King + living room',g:'3 guests',v:'Rooftop terrace',b:'Signature',img:'stay/room-teak-bench',th:['stay/room-city-view','stay/room-king-bed-gold-runner'],
   d:'A Karaikudi-mansion inspired suite with a separate living room, carved teak oonjal (swing), antique décor and a private terrace.',f:['Living room','Oonjal swing','Bathtub','Butler service','In-room breakfast'],a:['Separate living room','Traditional oonjal swing','Private terrace','Clawfoot bathtub','Butler service','Welcome Chettinad snack platter','Complimentary minibar','Late check-out till 2 PM']},
  {id:'family',n:'Family Suite',c:'Suites',p:10999,left:2,sz:'600 sq ft',bed:'2 bedrooms',g:'4 adults + 2 kids',v:'City view',img:'stay/room-king-bed-gold-runner',th:['stay/room-wooden-interior','stay/suite-sofa-lounge'],
   d:'Two connected bedrooms with a shared lounge — ideal for families visiting Chennai for weddings and holidays.',f:['2 bedrooms','2 bathrooms','Kids kit','Lounge','Breakfast'],a:['Two bedrooms (King + Twin)','Two bathrooms','Shared lounge with dining table','Kids amenity kit','2 Smart TVs','Microwave & mini fridge','Extra bed on request','Free airport pickup (1 way)']}];
  Object.assign(App, { ROOMS });
})(window.App = window.App || {});
