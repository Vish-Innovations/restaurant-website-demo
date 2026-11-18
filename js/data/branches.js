(function (App) {
  'use strict';

  /** Branch details. Keys are also the page routes (#annanagar, #velachery). */
  const BRANCHES = {
  annanagar:{name:'Anna Nagar',sub:'Rooftop',opt:'Anna Nagar — Rooftop',img:'venues/rooftop-terrace',
   about:'Our flagship on 2nd Avenue — 140 seats across an open-air rooftop and an AC dining floor, with our boutique stay upstairs. Candle-lit tables and live music on weekends make it Anna Nagar\'s favourite spot for dates and celebrations.',
   addr:'No. 14, 2nd Avenue, Anna Nagar, Chennai – 600040',phone:'+91 98400 12345',mail:'annanagar@kaaramandco.in',q:'2nd Avenue Anna Nagar Chennai',
   hours:[['Mon – Thu','12:00 PM – 3:30 PM · 7:00 PM – 11:30 PM'],['Fri – Sun','12:00 PM – 3:30 PM · 7:00 PM – 1:00 AM'],['Rooftop','From 7:00 PM (weather permitting)']],
   sched:d=>[[720,930],[1140,[0,5,6].includes(d)?1500:1410]],
   parking:['Valet parking','Free for diners'],land:'Opp. Anna Nagar Tower Park, 2nd Avenue',metro:'Anna Nagar Tower Metro — 6 min walk',bus:'Tower Park bus stop — 300 m',
   fac:[['snow','AC Dining Floor'],['star','Rooftop Seating'],['car','Valet Parking'],['users','Private Cabins'],['music','Live Music Fri–Sun'],['wifi','Free Wi-Fi']],
   gal:['venues/fine-dining-table','venues/bar-lounge','events/birthday-balloons'],
   at:[{ic:'utensils',img:'venues/bar-lounge',t:'Rooftop Restaurant',d:'Open-air rooftop + AC floor · 140 seats · live music Fri–Sun',l:'menu.html',c:'View Menu'},
    {ic:'bed',img:'stay/room-city-view',t:'Stay — The Kaaram House',d:'12 heritage rooms & suites right upstairs, breakfast included',l:'stay.html',c:'View Rooms'},
    {ic:'sparkles',img:'events/confetti-party',t:'Parties & Events',d:'Private cabins (8 guests) · Rooftop buyout (120 guests)',l:'events.html',c:'View Packages'},
    {ic:'tag',img:'food/cocktails-trio',t:'Branch Offer',d:'Rooftop Early Bird — 20% off starters & mocktails before 8 PM, Mon–Thu',l:'offers.html',c:'See Offers'}]},
  velachery:{name:'Velachery',sub:'Family Dining',opt:'Velachery — Family Dining',img:'venues/restaurant-dining-hall',
   about:'Opened in 2023 for families in South Chennai — a 180-seat AC restaurant with a kids\' play corner, 40-car parking and an 80-guest banquet hall. Home of our weekday lunch buffet.',
   addr:'No. 88, Velachery Main Road, Velachery, Chennai – 600042',phone:'+91 98400 67890',mail:'velachery@kaaramandco.in',q:'Velachery Main Road Chennai',
   hours:[['Mon – Fri','12:00 PM – 3:30 PM · 7:00 PM – 11:30 PM'],['Sat – Sun','12:00 PM – 4:00 PM · 7:00 PM – 11:30 PM'],['Lunch Buffet','Mon – Fri, 12:00 PM – 3:30 PM']],
   sched:d=>[[720,[0,6].includes(d)?960:930],[1140,1410]],
   parking:['Free parking','Space for 40 cars'],land:'Velachery Main Road, near Vijaya Nagar bus terminus',metro:'Velachery MRTS station — 1.5 km',bus:'Vijaya Nagar bus terminus — 400 m',
   fac:[['car','Parking · 40 Cars'],['users','Kids\' Play Corner'],['star','Banquet · 80 Guests'],['snow','Fully AC'],['access','Wheelchair Access'],['wifi','Free Wi-Fi']],
   gal:['venues/industrial-cafe-interior','venues/restaurant-interior-warm','catering/buffet-spread'],
   at:[{ic:'utensils',img:'venues/restaurant-dining-hall',t:'Family Restaurant',d:'180-seat AC dining hall with a kids\' play corner',l:'menu.html',c:'View Menu'},
    {ic:'sparkles',img:'venues/banquet-hall',t:'Banquet Hall & Cabins',d:'Banquet hall (80 guests) · Private cabins (8 guests)',l:'events.html',c:'View Packages'},
    {ic:'soup',img:'catering/buffet-spread',t:'Lunch Buffet ₹399',d:'Mon–Fri, 12–3:30 PM · 22+ dishes, soup to dessert',l:'offers.html',c:'See Offers'},
    {ic:'bed',img:'stay/room-wooden-interior',t:'Looking to Stay?',d:'Our rooms are at the Anna Nagar branch — 25 minutes away',l:'stay.html',c:'View Rooms',note:'At Anna Nagar'}]}};
  Object.assign(App, { BRANCHES });
})(window.App = window.App || {});
