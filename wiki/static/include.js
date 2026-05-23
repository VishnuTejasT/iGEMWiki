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


function initIntroAnimation() {
  const scroller = document.getElementById('statistic');
  const overlay = document.getElementById('intro-overlay');
  if (!scroller || !overlay) return;
  
  const targetString = "11,280,000";
  const chars = "0123456789"; 
  
  // 1. Show "ERROR: 00000000" statically for 2 seconds
  setTimeout(() => {
    let iterations = 0;
    
    // Instantly switch to digits format to start the transition count
    scroller.innerText = "00,000,000"; 
    
    const interval = setInterval(() => {
      const scrambled = targetString.split("")
        .map((letter, index) => {
          if (letter === ",") return ",";
          if (index < iterations) return targetString[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      
      scroller.innerText = scrambled;
      
      if (iterations >= targetString.length) {
        clearInterval(interval);
        scroller.innerText = targetString; // Lock target number securely
        
        // 2. Wait 2 seconds AFTER counter stops, then show the subtext lines
        setTimeout(() => {
          document.body.classList.add('show-text');
          
          // 3. Give them 4.5 seconds to absorb the fact before hiding the layer
          setTimeout(() => {
            overlay.classList.add('hidden');
          }, 7000);

        }, 2000);
      }

      iterations += 1 / 3;
    }, 40);

  }, 2000);
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initIntroAnimation);
} else {
  initIntroAnimation();
}