(function () {
  const NAV_H = 68;

  function makePin(wrapperId, stickySelector) {
    const wrapper = document.getElementById(wrapperId);
    const sticky = wrapper && wrapper.querySelector(stickySelector);
    if (!wrapper || !sticky) return null;

    return {
      wrapper,
      sticky,
      onScroll(callback) {
        function tick() {
          const rect = wrapper.getBoundingClientRect();
          const panelH = window.innerHeight - NAV_H;
          const wrapperH = wrapper.offsetHeight;
          const scrollable = wrapperH - panelH;
          const scrolled = Math.max(0, -(rect.top - NAV_H));
          const pastEnd = rect.top - NAV_H + wrapperH <= panelH;

          if (rect.top - NAV_H <= 0 && !pastEnd) {
            sticky.classList.add('is-fixed');
            sticky.style.top = NAV_H + 'px';
          } else {
            sticky.classList.remove('is-fixed');
            sticky.style.top = pastEnd ? (wrapperH - panelH) + 'px' : '0';
          }

          const progress = scrollable > 0 ? Math.min(1, scrolled / scrollable) : 0;
          callback(progress);
        }
        window.addEventListener('scroll', tick, { passive: true });
        window.addEventListener('resize', tick);
        tick();
      }
    };
  }

  function initMalaria() {
    const pin = makePin('wm-wrapper', '.wm-sticky');
    if (!pin) return;

    const stage = document.getElementById('wm-stage');
    const boxes = Array.from(pin.wrapper.querySelectorAll('.wm-box'));
    const count = boxes.length;
    if (!stage || !count) return;

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
      current = idx;
    }

    calibrate();
    setActive(0);
    window.addEventListener('resize', calibrate);

    pin.onScroll(progress => {
      const idx = Math.min(count - 1, Math.floor(progress * count));
      setActive(idx);
    });
  }

  function initSolution() {
    const pin = makePin('wms-wrapper', '.wms-sticky');
    if (!pin) return;

    const who   = pin.wrapper.querySelector('.wms-who');
    const word  = pin.wrapper.querySelector('.wms-word');
    const d1    = document.getElementById('wms-d1');
    const d2    = document.getElementById('wms-d2');
    const d3    = document.getElementById('wms-d3');
    const line2 = pin.wrapper.querySelector('.wms-line2');
    if (!who || !word || !d1 || !d2 || !d3 || !line2) return;

    pin.onScroll(progress => {
      who.classList.toggle('visible',   progress >= 0.10);
      word.classList.toggle('visible',  progress >= 0.25);
      d1.classList.toggle('visible',    progress >= 0.38);
      d2.classList.toggle('visible',    progress >= 0.51);
      d3.classList.toggle('visible',    progress >= 0.63);
      line2.classList.toggle('visible', progress >= 0.78);
    });
  }

  function init() {
    initMalaria();
    initSolution();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
