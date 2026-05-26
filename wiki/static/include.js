
//Menu Bar and Footer inclusion, scroll progress bar, back-to-top button, and hamburger menu functionality
(function () {
  function include(selector, file) {
    var el = document.querySelector(selector);
    if (!el) return;
    fetch(file)
      .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
      .then(function (html) { el.innerHTML = html; })
      .catch(function () {});
  }

  /* <base href> on each page already resolves paths to the wiki root */
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


//Intro animation
function initIntroAnimation() {
  const errorPrefix = document.getElementById('error-prefix');
  const statNumber = document.getElementById('stat-number');
  const overlay = document.getElementById('intro-overlay');
  if (!errorPrefix || !statNumber || !overlay) return;

  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('intro-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.style.transition = 'none';
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  const targetNumber = 11280000;
  const targetString = "11,280,000";
  const digitCount = String(targetNumber).length;
  
  function formatStatNumber(value) {
    const digits = String(Math.round(value)).padStart(digitCount, '0');
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  statNumber.innerText = "00,000,000";

  setTimeout(() => {
    let currentNumber = 0;

    function updateNumber() {
      currentNumber += (targetNumber - currentNumber) * 0.11;
      statNumber.innerText = formatStatNumber(currentNumber);

      if (Math.abs(targetNumber - currentNumber) < 1) {
        statNumber.innerText = targetString;
        errorPrefix.classList.add('fade-out');

        setTimeout(() => {
          document.body.classList.add('show-text');

          setTimeout(() => {
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
          }, 4000);

        }, 1500);
        return;
      }

      requestAnimationFrame(updateNumber);
    }

    requestAnimationFrame(updateNumber);

  }, 1200);
}

if (document.getElementById('intro-overlay')) {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initIntroAnimation);
  } else {
    initIntroAnimation();
  }
}
