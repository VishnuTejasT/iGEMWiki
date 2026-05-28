// Scroll-reveal animations for the Plasmodium falciparum section
(function () {
  var header = document.querySelector('.pf-header');
  var cards  = Array.from(document.querySelectorAll('.pf-card'));
  var all    = header ? [header].concat(cards) : cards;

  if (!all.length || !window.IntersectionObserver) {
    all.forEach(function (el) { el.classList.add('pf-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('pf-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  all.forEach(function (el) { observer.observe(el); });
})();
