(function () {
  const NAV_H = 68;

  function init() {
    const wrapper = document.getElementById('wm-wrapper');
    const stage = document.getElementById('wm-stage');
    const sticky = wrapper && wrapper.querySelector('.wm-sticky');
    const boxes = Array.from(document.querySelectorAll('.wm-box'));
    const dots = Array.from(document.querySelectorAll('.wm-dot'));
    const count = boxes.length;
    if (!wrapper || !stage || !sticky || !count) return;

    // Measure each box at natural height, lock stage to the tallest
    function calibrate() {
      boxes.forEach(b => { b.style.position = 'relative'; });
      const maxH = boxes.reduce((m, b) => Math.max(m, b.offsetHeight), 0);
      boxes.forEach(b => { b.style.position = ''; });
      stage.style.height = maxH + 'px';
    }

    let current = -1;

    function setActive(idx) {
      if (idx === current) return;
      boxes.forEach((b, i) => b.classList.toggle('active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      current = idx;
    }

    function onScroll() {
      const rect = wrapper.getBoundingClientRect();
      const panelH = window.innerHeight - NAV_H;
      const wrapperH = wrapper.offsetHeight;
      const scrollable = wrapperH - panelH;
      const scrolled = Math.max(0, -(rect.top - NAV_H));
      const pastEnd = rect.top - NAV_H + wrapperH <= panelH;

      // Pin or release
      if (rect.top - NAV_H <= 0 && !pastEnd) {
        sticky.classList.add('is-fixed');
        sticky.style.top = NAV_H + 'px';
      } else {
        sticky.classList.remove('is-fixed');
        sticky.style.top = pastEnd ? (wrapperH - panelH) + 'px' : '0';
      }

      if (scrollable <= 0) { setActive(0); return; }

      const idx = Math.min(count - 1, Math.floor((scrolled / scrollable) * count));
      setActive(idx);
    }

    calibrate();
    setActive(0);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { calibrate(); onScroll(); });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
