// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukázka formuláře: nic se neodesílá. Po spuštění webu bude zpráva doručena na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odesílám…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Děkujeme, zpráva byla odeslána.'; })
        .catch(function () { stav.textContent = 'Odeslání se nepodařilo. Napište nám prosím e-mailem.'; });
    });
  });
})();

// Video: iframe se načte až po kliknutí.
document.querySelectorAll('.video-box').forEach(function (b) {
  var tl = b.querySelector('.video-tl');
  tl.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + b.getAttribute('data-yt') + '?autoplay=1';
    f.title = 'Video prohlídka domu';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    b.innerHTML = ''; b.appendChild(f);
  });
});
// Rejstřík místností: zvýraznění aktuální.
(function () {
  var odk = document.querySelectorAll('.rejstrik a');
  if (!odk.length || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (z) {
    z.forEach(function (e) { if (e.isIntersecting) odk.forEach(function (a) { a.classList.toggle('aktivni', a.getAttribute('href') === '#' + e.target.id); }); });
  }, { rootMargin: '-30% 0px -60% 0px' });
  document.querySelectorAll('.mistnost').forEach(function (m) { io.observe(m); });
})();

(function () {
  var g = document.querySelector('.galerie-mrizka');
  if (!g || !window.HTMLDialogElement) return;
  var d = document.createElement('dialog'); d.className = 'lb';
  d.innerHTML = '<button type="button" aria-label="Zavřít">×</button><img alt="">';
  document.body.appendChild(d);
  var im = d.querySelector('img');
  g.addEventListener('click', function (e) {
    var t = e.target.closest('img'); if (!t) return;
    e.preventDefault(); im.src = t.closest('a').href; im.alt = t.alt; d.showModal();
  });
  d.addEventListener('click', function () { d.close(); });
})();
