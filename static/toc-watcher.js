
(function () {
  var links = document.querySelectorAll('#toc-links a[data-toc]');
  if (!links.length) return;

  /* Build a quick lookup: section id → link element */
  var linkMap = {};
  links.forEach(function (link) {
    linkMap[link.getAttribute('data-toc')] = link;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = linkMap[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          link.classList.add('toc-active');
        } else {
          link.classList.remove('toc-active');
        }
      });
    },
    {
      rootMargin: '-15% 0px -75% 0px',
      threshold: 0,
    }
  );

  document.querySelectorAll('.toc-section').forEach(function (section) {
    observer.observe(section);
  });
})();
