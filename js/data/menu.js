(function (App) {
  'use strict';

  /**
   * Menu data.
   *   spice: 0 none · 1 mild · 2 medium · 3 hot
   *   tags : 'best' (bestseller) | 'chef' (chef's pick)
   *   image: path under assets/images/ without extension
   */
  const MENU = [
    // ── Starters ──
    { category: 'Starters', name: "Chicken 65", description: "Crisp-fried chicken tossed with curry leaves, red chilli and garlic.", price: 260, veg: false, spice: 2, tags: ['best'],
      image: "food/fried-chicken-tenders" },
    { category: 'Starters', name: "Mutton Chukka", description: "Tender mutton dry-roasted with shallots and crushed black pepper.", price: 340, veg: false, spice: 3, tags: ['chef'],
      image: "food/masala-curry-pan" },
    { category: 'Starters', name: "Mutton Kola Urundai", description: "Spiced minced-mutton balls fried golden, Chettinad style.", price: 290, veg: false, spice: 2, tags: [],
      image: "food/samosa-platter" },
    { category: 'Starters', name: "Gobi 65", description: "Cauliflower florets in a spicy crisp batter.", price: 190, veg: true, spice: 2, tags: [],
      image: "food/samosa-platter" },
    { category: 'Starters', name: "Paneer Pepper Fry", description: "Soft paneer cubes tossed with onion, capsicum and pepper.", price: 240, veg: true, spice: 2, tags: [],
      image: "food/paneer-tikka-skillet" },

    // ── Chettinad Specials ──
    { category: 'Chettinad Specials', name: "Chettinad Chicken Curry", description: "Our signature gravy with 18 hand-roasted spices, kalpasi and coconut.", price: 320, veg: false, spice: 3, tags: ['best'],
      image: "food/curry-with-naan" },
    { category: 'Chettinad Specials', name: "Mutton Pepper Masala", description: "Slow-cooked mutton in a thick black-pepper and fennel masala.", price: 390, veg: false, spice: 3, tags: ['chef'],
      image: "food/curry-rice-set" },
    { category: 'Chettinad Specials', name: "Nattu Kozhi Varuval", description: "Country chicken roasted with shallots and home-ground masala.", price: 360, veg: false, spice: 3, tags: [],
      image: "food/fried-chicken-legs" },
    { category: 'Chettinad Specials', name: "Kaalan Pepper Fry", description: "Button mushrooms tossed in Chettinad pepper masala.", price: 230, veg: true, spice: 2, tags: [],
      image: "food/mixed-plates-overhead" },
    { category: 'Chettinad Specials', name: "Ennai Kathirikai Kuzhambu", description: "Baby brinjal simmered in a tangy tamarind and sesame-oil gravy.", price: 210, veg: true, spice: 2, tags: [],
      image: "food/curry-with-naan" },

    // ── Biryani ──
    { category: 'Biryani', name: "Chettinad Chicken Biryani", description: "Seeraga samba rice dum-cooked with chicken and fresh masala. Served with raita and brinjal curry.", price: 280, veg: false, spice: 2, tags: ['best'],
      image: "food/biryani-plate" },
    { category: 'Biryani', name: "Mutton Biryani", description: "Tender goat meat slow-cooked with seeraga samba in wood-fired dum.", price: 380, veg: false, spice: 2, tags: ['chef'],
      image: "food/biryani-brass-bowls" },
    { category: 'Biryani', name: "Prawn Biryani", description: "Fresh Kasimedu prawns layered with fragrant rice.", price: 360, veg: false, spice: 2, tags: [],
      image: "food/biryani-brass-bowls" },
    { category: 'Biryani', name: "Egg Biryani", description: "Boiled eggs roasted in masala and dum-cooked with rice.", price: 220, veg: false, spice: 1, tags: [],
      image: "food/biryani-plate" },
    { category: 'Biryani', name: "Veg Dum Biryani", description: "Seasonal vegetables and paneer dum-cooked with mint and spices.", price: 220, veg: true, spice: 1, tags: [],
      image: "food/spiced-rice-pan" },

    // ── Parotta & Breads ──
    { category: 'Parotta & Breads', name: "Chicken Kothu Parotta", description: "Shredded parotta tossed on the tawa with egg, chicken and salna.", price: 230, veg: false, spice: 2, tags: ['best'],
      image: "food/spiced-rice-pan" },
    { category: 'Parotta & Breads', name: "Veechu Parotta", description: "Thin, flaky parotta served with veg kurma.", price: 60, veg: true, spice: 0, tags: [],
      image: "food/masala-curry-pan" },
    { category: 'Parotta & Breads', name: "Bun Parotta", description: "Soft, layered Madurai-style bun parotta.", price: 70, veg: true, spice: 0, tags: [],
      image: "food/masala-curry-pan" },
    { category: 'Parotta & Breads', name: "Chilli Parotta", description: "Parotta pieces tossed in spicy onion-tomato masala.", price: 180, veg: true, spice: 2, tags: [],
      image: "food/spiced-rice-pan" },

    // ── Seafood ──
    { category: 'Seafood', name: "Nethili Fry", description: "Crispy anchovies marinated in chilli and turmeric.", price: 290, veg: false, spice: 2, tags: [],
      image: "food/salmon-plate-dark" },
    { category: 'Seafood', name: "Vanjaram Fish Fry", description: "Seer fish steak coated in house masala and shallow-fried.", price: 420, veg: false, spice: 2, tags: ['chef'],
      image: "food/fish-fillet-plated" },
    { category: 'Seafood', name: "Prawn Thokku", description: "Prawns cooked down in a thick, spicy onion-tomato masala.", price: 380, veg: false, spice: 3, tags: [],
      image: "food/prawns-bowl" },
    { category: 'Seafood', name: "Nandu Masala", description: "Mud crab in a fiery Chettinad pepper gravy.", price: 460, veg: false, spice: 3, tags: [],
      image: "food/curry-with-naan" },

    // ── Veg Mains & Tiffin ──
    { category: 'Veg Mains & Tiffin', name: "Unlimited Veg Meals", description: "Rice, sambar, rasam, kootu, poriyal, appalam, curd and payasam.", price: 220, veg: true, spice: 1, tags: ['best'],
      image: "food/curry-rice-set" },
    { category: 'Veg Mains & Tiffin', name: "Ghee Roast Dosa", description: "Paper-thin crisp dosa roasted in pure ghee, with three chutneys.", price: 140, veg: true, spice: 0, tags: [],
      image: "food/ghee-roast-dosa" },
    { category: 'Veg Mains & Tiffin', name: "Mini Idli Sambar", description: "14 button idlis soaked in hot sambar with ghee.", price: 110, veg: true, spice: 1, tags: [],
      image: "food/idli-banana-leaf" },
    { category: 'Veg Mains & Tiffin', name: "Paneer Butter Masala", description: "Paneer in a rich tomato-cashew gravy.", price: 240, veg: true, spice: 0, tags: [],
      image: "food/paneer-tikka-skillet" },

    // ── Desserts ──
    { category: 'Desserts', name: "Elaneer Payasam", description: "Chilled tender-coconut payasam with coconut milk.", price: 150, veg: true, spice: 0, tags: ['chef'],
      image: "food/strawberry-panna-cotta" },
    { category: 'Desserts', name: "Kasi Halwa", description: "Ash-gourd halwa slow-cooked in ghee.", price: 120, veg: true, spice: 0, tags: [],
      image: "food/sprinkle-donuts" },
    { category: 'Desserts', name: "Filter Coffee Tiramisu", description: "Our Chennai twist on the Italian classic.", price: 190, veg: true, spice: 0, tags: [],
      image: "food/tiramisu-slice" },
    { category: 'Desserts', name: "Carrot Halwa & Ice Cream", description: "Warm carrot halwa with a scoop of vanilla.", price: 160, veg: true, spice: 0, tags: [],
      image: "food/oreo-sundae" },

    // ── Beverages ──
    { category: 'Beverages', name: "Filter Coffee", description: "Kumbakonam-style degree coffee in a davara set.", price: 60, veg: true, spice: 0, tags: ['best'],
      image: "food/latte-art-coffee" },
    { category: 'Beverages', name: "Jigarthanda", description: "Madurai special with almond gum, milk and ice cream.", price: 140, veg: true, spice: 0, tags: [],
      image: "food/chocolate-milkshake" },
    { category: 'Beverages', name: "Nannari Sarbath", description: "Cooling sarsaparilla root syrup with lime.", price: 80, veg: true, spice: 0, tags: [],
      image: "food/mint-lime-soda" },
    { category: 'Beverages', name: "Rose Milk", description: "Chilled milk with house-made rose syrup.", price: 90, veg: true, spice: 0, tags: [],
      image: "food/chocolate-milkshake" },
    { category: 'Beverages', name: "Fresh Lime Soda", description: "Sweet, salted or mixed.", price: 80, veg: true, spice: 0, tags: [],
      image: "food/mint-lime-soda" },
  ];

  const CATEGORY_DESCRIPTIONS = {
    "Starters": "Crisp, spicy bites to begin your meal.",
    "Chettinad Specials": "Signature gravies with hand-roasted Karaikudi masala.",
    "Biryani": "Seeraga samba rice, wood-fired dum, served with raita.",
    "Parotta & Breads": "Flaky, layered and made fresh on the tawa.",
    "Seafood": "Fresh catch from Kasimedu, every morning.",
    "Veg Mains & Tiffin": "South Indian classics and hearty veg mains.",
    "Desserts": "Sweet endings, old and new.",
    "Beverages": "From degree coffee to Madurai jigarthanda."
  };
  Object.assign(App, { MENU, CATEGORY_DESCRIPTIONS });
})(window.App = window.App || {});
