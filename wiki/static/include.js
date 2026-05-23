(function () {
  /* Determine if this page is inside pages/ so we fetch from the right path */
  var inPages = window.location.href.indexOf('/pages/') !== -1;
  var base = inPages ? '../' : '';

  function include(selector, file) {
    var el = document.querySelector(selector);
    if (!el) return;
    fetch(base + file)
      .then(function (r) { return r.text(); })
      .then(function (html) { el.innerHTML = html; })
      .catch(function () {});
  }

  /* Places footer and menu on every page*/
  include('#nav', 'menu.html');
  include('#footer', 'footer.html');

  /* ===== Scroll progress bar ===== */
  var bar = document.getElementById('scroll-progress');
  function updateBar() {
    if (!bar) return;
    var scrolled = window.scrollY;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();

  /* Back-to-top button*/
  var btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 320) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }
    }, { passive: true });

    btt.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Hamburger menu*/
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.hamburger');
    if (btn) {
      btn.classList.toggle('open');
      var menu = document.querySelector('.mobile-menu');
      if (menu) menu.classList.toggle('open');
    }
  });
})();
