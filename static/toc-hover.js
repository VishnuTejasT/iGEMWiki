

(function () {
  var sidebar = document.querySelector('.toc-sidebar');
  var panel   = document.getElementById('toc-links');
  if (!sidebar || !panel) return;

  function show() { panel.classList.add('toc-visible'); }
  function hide() { panel.classList.remove('toc-visible'); }

  sidebar.addEventListener('mouseenter', show);
  sidebar.addEventListener('mouseleave', hide);
  sidebar.addEventListener('focusin',    show);  
  sidebar.addEventListener('focusout',   hide);

  panel.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () { link.blur(); }, 80);
    });
  });
})();
