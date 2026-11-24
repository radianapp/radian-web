/* Rahadian Hadi — shared UI wiring: palette switcher, week strip, language toggle, nav state */
(function () {
  var RH = window.RH, P = RH.PALETTES;

  function label() {
    var p = P[RH.palette], lang = RH.lang;
    document.querySelectorAll('[data-pal-name]').forEach(function (el) { el.textContent = p.name[lang]; });
    document.querySelectorAll('[data-pal-day]').forEach(function (el) { el.textContent = p.day[lang]; });
    document.querySelectorAll('[data-today-name]').forEach(function (el) { el.textContent = P[RH.todayIndex].name[lang]; });
    document.querySelectorAll('[data-today-swatch]').forEach(function (el) { var c = P[RH.todayIndex].c; el.style.background = 'conic-gradient(' + c.acc + ' 0 50%,' + c.acc2 + ' 0)'; });
    document.querySelectorAll('[data-today-day]').forEach(function (el) { el.textContent = P[RH.todayIndex].day[lang]; });
    var btn = document.querySelector('[data-palette-next]');
    if (btn) btn.setAttribute('aria-label', (lang === 'en' ? 'Palette: ' : 'Palet: ') + p.name[lang] + (lang === 'en' ? '. Switch palette' : '. Ganti palet'));
    weekButtons.forEach(function (b, i) {
      b.setAttribute('aria-pressed', String(i === RH.palette));
      b.querySelector('.d').textContent = P[i].day[lang];
      b.querySelector('.n').textContent = P[i].name[lang];
    });
    var langBtn = document.querySelector('[data-lang-toggle]');
    if (langBtn) {
      langBtn.querySelector('.cur').textContent = lang === 'en' ? 'EN' : 'ID';
      langBtn.setAttribute('aria-label', lang === 'en' ? 'Baca dalam Bahasa Indonesia' : 'Read in English');
    }
  }

  // week strip: Monday first, the way the week reads in Indonesia
  var strip = document.querySelector('.week-strip');
  var weekButtons = []; // indexed by palette index (0 = Minggu)
  if (strip) {
    [1, 2, 3, 4, 5, 6, 0].forEach(function (i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = '<span class="dot" style="background:conic-gradient(' + P[i].c.acc + ' 0 50%,' + P[i].c.acc2 + ' 0)"></span><span class="d"></span><span class="n"></span>';
      if (i === RH.todayIndex) b.classList.add('today');
      b.addEventListener('click', function () { RH.choose(i); });
      li.appendChild(b);
      strip.appendChild(li);
      weekButtons[i] = b;
    });
  }

  var next = document.querySelector('[data-palette-next]');
  if (next) next.addEventListener('click', function () { RH.choose((RH.palette + 1) % P.length); });

  var langBtn = document.querySelector('[data-lang-toggle]');
  if (langBtn) langBtn.addEventListener('click', function () { RH.setLang(RH.lang === 'en' ? 'id' : 'en'); });

  document.addEventListener('rh:palette', label);
  document.addEventListener('rh:lang', label);
  label();

  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
