(function () {
  'use strict';

  const STAGES = [
    {
      title: 'Mosquito Bites!',
      short: 'Bite',
      body: ''
    },
    {
      title: 'Liver Infection',
      short: 'Liver',
      body: ''
    },
    {
      title: 'Blood Stage',
      short: 'Blood',
      body: ''
    },
    {
      title: 'RBC Rupture',
      short: 'Fever',
      body: ''
    },
    {
      title: 'Gametocyte Stage',
      short: 'Sexual',
      body: ''
    },
    {
      title: 'Transmission',
      short: 'Trans.',
      body: ''
    }
  ];

  const N = STAGES.length;
  const VB = 400;
  const CX = VB / 2;
  const CY = VB / 2;
  const R = 148;

  function svgEl(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
    return el;
  }

  function nodeAngle(i) {
    return (-90 + (360 / N) * i) * (Math.PI / 180);
  }

  function buildOverlay() {
    const svg = svgEl('svg', {
      viewBox: `0 0 ${VB} ${VB}`,
      class: 'lc-svg-overlay',
      'aria-hidden': 'true'
    });

    const nodeCircles = [];

    for (let i = 0; i < N; i++) {
      const a = nodeAngle(i);
      const nx = CX + R * Math.cos(a);
      const ny = CY + R * Math.sin(a);

      const circle = svgEl('circle', {
        cx: nx, cy: ny, r: '15',
        fill: 'transparent', stroke: 'none'
      });
      circle.style.transition = 'fill 0.4s ease, stroke 0.4s ease, r 0.3s ease';
      svg.appendChild(circle);
      nodeCircles.push(circle);
    }

    return { svg, nodeCircles };
  }

  function init() {
    const wrapper = document.getElementById('lc-wrapper');
    if (!wrapper) return;

    const ringPanel = document.getElementById('lc-ring');
    const cardPanel = document.getElementById('lc-content');
    const hint = document.getElementById('lc-hint');

    const { svg, nodeCircles } = buildOverlay();

    // Image + overlay wrapper
    const wrap = document.createElement('div');
    wrap.className = 'lc-ring-wrap';
    const img = document.createElement('img');
    img.src = 'static/lifeCycle.png';
    img.alt = 'Malaria parasite lifecycle';
    img.className = 'lc-ring-image';
    wrap.appendChild(img);
    wrap.appendChild(svg);
    ringPanel.appendChild(wrap);

    // Build content cards
    STAGES.forEach((stage, i) => {
      const card = document.createElement('div');
      card.className = 'lc-card';
      card.innerHTML =
        '<div class="lc-card-num">' + String(i + 1).padStart(2, '0') + '</div>' +
        '<h3 class="lc-card-title">' + stage.title + '</h3>' +
        '<p class="lc-card-body">' + stage.body + '</p>';
      cardPanel.appendChild(card);
    });

    const cards = cardPanel.querySelectorAll('.lc-card');

    const sticky = wrapper.querySelector('.lc-sticky');
    const NAV_H = 68;
    let lastStage = -1;

    function setStage(idx) {
      if (idx === lastStage) return;
      lastStage = idx;

      nodeCircles.forEach((circle, i) => {
        if (i === idx) {
          circle.setAttribute('fill', '#c01919');
          circle.setAttribute('stroke', '#880909');
          circle.setAttribute('r', '19');
        } else if (i < idx) {
          circle.setAttribute('fill', '#de3e3e');
          circle.setAttribute('stroke', '#c01919');
          circle.setAttribute('r', '15');
        } else {
          circle.setAttribute('fill', '#f2eee7');
          circle.setAttribute('stroke', '#c9b197');
          circle.setAttribute('r', '15');
        }
      });

      cards.forEach((card, i) => {
        card.classList.toggle('active', i === idx);
      });
    }

    function onScroll() {
      const rect = wrapper.getBoundingClientRect();
      const viewH = window.innerHeight;
      const panelH = viewH - NAV_H;
      const wrapperH = wrapper.offsetHeight;
      const scrollable = wrapperH - panelH;

      // scrolled = px into the wrapper from its top
      const scrolled = Math.max(0, -(rect.top - NAV_H));

      if (scrolled > 20 && hint) hint.classList.add('hidden');

      // Pin or release
      const pastEnd = rect.top - NAV_H + wrapperH <= panelH;
      if (rect.top - NAV_H <= 0 && !pastEnd) {
        sticky.classList.add('is-fixed');
        sticky.style.top = NAV_H + 'px';
      } else {
        sticky.classList.remove('is-fixed');
        sticky.style.top = pastEnd ? (wrapperH - panelH) + 'px' : '0';
      }

      const stageH = scrollable / N;
      const stage = Math.min(N - 1, Math.floor(scrolled / stageH));
      setStage(stage);
    }

    // Initialize first stage
    setStage(0);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
