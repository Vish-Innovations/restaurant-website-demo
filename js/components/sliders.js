(function (App) {
  'use strict';
  const { $, $$ } = App;

  /** Home hero: auto-advancing fade slides with dot navigation. */
  function initHeroSlider(root) {
    const slides = $$('.slide', root);
    const dotsBox = $('#heroDots', root);
    dotsBox.innerHTML = slides.map((_, i) => `<button class="${i ? '' : 'on'}" aria-label="Slide ${i + 1}"></button>`).join('');
    const dots = $$('button', dotsBox);
    let current = 0;
    let timer;
    function go(i) {
      slides[current].classList.remove('on');
      dots[current].classList.remove('on');
      current = i;
      slides[current].classList.add('on');
      dots[current].classList.add('on');
      clearInterval(timer);
      timer = setInterval(() => go((current + 1) % slides.length), 6500);
    }
    dots.forEach((d, i) => (d.onclick = () => go(i)));
    go(0);
  }

  /** Home testimonials carousel. */
  function initReviewSlider(root, count) {
    const track = $('#rvTrack', root);
    const dotsBox = $('#rvDots', root);
    dotsBox.innerHTML = Array.from({ length: count }, (_, i) => `<button class="${i ? '' : 'on'}" aria-label="Review ${i + 1}"></button>`).join('');
    const dots = $$('button', dotsBox);
    let current = 0;
    let timer;
    function go(i) {
      current = i;
      track.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((d, j) => d.classList.toggle('on', j === i));
      clearInterval(timer);
      timer = setInterval(() => go((current + 1) % count), 5500);
    }
    dots.forEach((d, i) => (d.onclick = () => go(i)));
    go(0);
  }
  Object.assign(App, { initHeroSlider, initReviewSlider });
})(window.App = window.App || {});
