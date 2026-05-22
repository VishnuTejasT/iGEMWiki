// Small include helper: injects menu.html and footer.html into pages
(function () {
  function include(selector, url) {
    var el = document.querySelector(selector);
    if (!el) return;
    fetch(url).then(function (r) { return r.text(); }).then(function (html) { el.innerHTML = html; }).catch(function () { /* ignore */ });
  }
  include('#nav', 'menu.html');
  include('#footer', 'footer.html');
})();
