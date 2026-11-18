(function (App) {
  'use strict';
  const { $, $$, ic, JOBS } = App;

  function mount(root) {
    $('#jobs', root).innerHTML = JOBS.map(
      (j) =>
        `<div class="job"><div><h4>${j[0]}</h4><div class="jm"><span>${ic('pin')}${j[1]}</span><span>${ic('brief')}${j[2]}</span></div></div><button class="btn btn-sm" data-apply="${j[0]}">Apply</button></div>`
    ).join('');
    $('#roleSel', root).innerHTML += JOBS.map((j) => `<option>${j[0]}</option>`).join('');
    $$('[data-apply]', root).forEach(
      (b) =>
        (b.onclick = () => {
          $('#roleSel').value = b.dataset.apply;
          $('#jobForm').scrollIntoView({ behavior: 'smooth' });
        })
    );
  }
  (App.pages = App.pages || {}).careers = { mount };
})(window.App = window.App || {});
