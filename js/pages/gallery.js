(function (App) {
  'use strict';
  const { $, $$, loadImages, GALLERY } = App;

  const CATEGORIES = ['All', 'Food', 'Ambience', 'Events', 'Kitchen'];
  let category = 'All';

  function draw() {
    $('#gGrid').innerHTML = GALLERY.filter((g) => category === 'All' || g.c === category)
      .map((g) => `<figure><img data-img="${g.i}" alt="${g.t}" data-lb><figcaption>${g.t}</figcaption></figure>`)
      .join('');
    loadImages($('#gGrid'));
  }

  function mount() {
    $('#gTabs').innerHTML = CATEGORIES.map(
      (c) => `<button class="chip ${c === 'All' ? 'on' : ''}" data-g="${c}">${c}</button>`
    ).join('');
    $$('[data-g]').forEach(
      (b) =>
        (b.onclick = () => {
          category = b.dataset.g;
          $$('[data-g]').forEach((x) => x.classList.toggle('on', x === b));
          draw();
        })
    );
    draw();
  }
  (App.pages = App.pages || {}).gallery = { mount };
})(window.App = window.App || {});
