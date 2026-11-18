(function (App) {
  'use strict';

  /** [question, answer] */
  const FAQ = [
  ['Do you take table reservations?','Yes. Use the "Reserve a Table" button, WhatsApp or call the branch. Weekend rooftop tables fill up fast, so book a day ahead.'],
  ['Is parking available?','Anna Nagar has valet parking. Velachery has free parking for 40 cars.'],
  ['Do you have vegetarian options?','Yes — around 40% of our menu is vegetarian, and we use separate utensils for veg cooking.'],
  ['Can I bring my own cake?','Absolutely. We\'ll store it, add candles and serve it at no extra charge.'],
  ['Are rooms available at both branches?','No — The Kaaram House rooms are only at our Anna Nagar branch.'],
  ['Do you do home delivery?','Yes, through Swiggy and Zomato. For bulk orders above 20 people, see our Catering page.']];
  Object.assign(App, { FAQ });
})(window.App = window.App || {});
