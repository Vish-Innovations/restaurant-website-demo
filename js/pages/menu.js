(function (App) {
  'use strict';
  const { $, $$, ic, loadImages, vegMark, MENU, CATEGORY_DESCRIPTIONS } = App;

  const SPICE_LABEL = ['', 'Mild', 'Medium', 'Hot'];
  const categories = [...new Set(MENU.map((m) => m.category))];
  const slug = (c) => 'cat-' + c.toLowerCase().replace(/[^a-z]+/g, '-');

  const activeFilters = new Set(); // 'veg' | 'nonveg' | 'best' | 'chef'
  let view = innerWidth < 600 ? 'list' : 'grid';

  const dishCard = (m) =>
    `<article class="dish"><div class="dimg"><img data-img="${m.image}" alt="${m.name}">${
      m.tags.includes('best') ? '<span class="dtag">★ Bestseller</span>' : m.tags.includes('chef') ? '<span class="dtag chef">Chef\'s Pick</span>' : ''
    }${vegMark(m.veg)}</div><div class="dbody"><h4>${m.name}</h4><p>${m.description}</p><div class="dfoot"><span class="dprice">₹${m.price}</span>${
      m.spice ? `<span class="spice s${m.spice}">${ic('flame')}${SPICE_LABEL[m.spice]}</span>` : ''
    }</div></div></article>`;

  function matchesFilters(m, query) {
    const text = `${m.name} ${m.description} ${m.category}`.toLowerCase();
    return (
      (!query || text.includes(query)) &&
      (!activeFilters.has('veg') || m.veg) &&
      (!activeFilters.has('nonveg') || !m.veg) &&
      (!activeFilters.has('chef') || m.tags.includes('chef')) &&
      (!activeFilters.has('best') || m.tags.includes('best'))
    );
  }

  function draw() {
    const query = $('#mSearch').value.trim().toLowerCase();
    const list = MENU.filter((m) => matchesFilters(m, query));

    $('#mGrid').className = view === 'list' ? 'list' : '';
    $$('[data-view]').forEach((b) => b.classList.toggle('on', b.dataset.view === view));
    $('#mTabs').innerHTML = categories
      .map((c) => {
        const n = list.filter((m) => m.category === c).length;
        return `<button data-c="${slug(c)}" ${n ? '' : 'disabled'}>${c}<span>${n}</span></button>`;
      })
      .join('');
    $('#mCount').textContent =
      query || activeFilters.size
        ? `Showing ${list.length} of ${MENU.length} dishes`
        : `${MENU.length} dishes · ${categories.length} categories`;

    if (!list.length) {
      $('#mGrid').innerHTML =
        '<div class="mempty"><h3 style="font-size:1.4rem;color:var(--ink)">No dishes found</h3><p>Try a different search or clear the filters.</p><button class="btn btn-sm" id="mClear" style="margin-top:16px">Clear Filters</button></div>';
      $('#mClear').onclick = clearFilters;
      return;
    }
    $('#mGrid').innerHTML = categories
      .map((c) => {
        const items = list.filter((m) => m.category === c);
        if (!items.length) return '';
        return `<div class="csec" id="${slug(c)}"><div class="chead"><div><h3>${c}</h3><p>${CATEGORY_DESCRIPTIONS[c] || ''}</p></div><span>${items.length} item${items.length > 1 ? 's' : ''}</span></div><div class="dgrid">${items.map(dishCard).join('')}</div></div>`;
      })
      .join('');
    loadImages($('#mGrid'));
    highlightCategory();
  }

  function clearFilters() {
    activeFilters.clear();
    $$('[data-f]').forEach((b) => b.classList.remove('on'));
    $('#mSearch').value = '';
    draw();
  }

  /** Scroll-spy: highlights the category tab for the section currently on screen. */
  function highlightCategory() {
    if (!$('#menu').classList.contains('show')) return;
    let current = null;
    $$('#mGrid .csec').forEach((s) => {
      if (s.getBoundingClientRect().top < 230) current = s.id;
    });
    if (!current) current = $('#mGrid .csec')?.id;
    const bar = $('#mTabs');
    $$('#mTabs button').forEach((b) => {
      const on = b.dataset.c === current;
      if (on && !b.classList.contains('on'))
        bar.scrollTo({ left: b.offsetLeft - bar.clientWidth / 2 + b.clientWidth / 2, behavior: 'smooth' });
      b.classList.toggle('on', on);
    });
  }

  function mount() {
    $$('[data-f]').forEach(
      (b) =>
        (b.onclick = () => {
          const f = b.dataset.f;
          const opposite = { veg: 'nonveg', nonveg: 'veg' }[f];
          if (opposite && !activeFilters.has(f)) {
            activeFilters.delete(opposite);
            $(`[data-f="${opposite}"]`).classList.remove('on');
          }
          activeFilters.has(f) ? activeFilters.delete(f) : activeFilters.add(f);
          b.classList.toggle('on');
          draw();
        })
    );
    $$('[data-view]').forEach(
      (b) =>
        (b.onclick = () => {
          view = b.dataset.view;
          draw();
        })
    );
    $('#mSearch').oninput = draw;
    $('#mTabs').onclick = (e) => {
      const b = e.target.closest('button');
      if (!b || b.disabled) return;
      document.getElementById(b.dataset.c).scrollIntoView({ behavior: 'smooth' });
    };
    addEventListener('scroll', highlightCategory, { passive: true });
    draw();
  }

  const onShow = highlightCategory;
  (App.pages = App.pages || {}).menu = { mount, onShow };
})(window.App = window.App || {});
