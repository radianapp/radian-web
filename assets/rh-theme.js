/* Rahadian Hadi — palette & language bootstrap.
   Loaded synchronously in <head> so the page paints in the right colours
   and language on first frame. UI wiring lives in rh.js. */
(function () {
  var PALETTES = [
    // index = Date.getDay() → 0 Minggu … 6 Sabtu
    { id: 'mangga', day: { id: 'Minggu', en: 'Sunday' },   name: { id: 'Mangga', en: 'Mango' },
      c: { bg: '#FDF0E6', paper: '#FFF8F2', ink: '#47291A', soft: '#F8DBC6', acc: '#F2B48C', acc2: '#A7C7E7' } },
    { id: 'pandan', day: { id: 'Senin', en: 'Monday' },    name: { id: 'Pandan', en: 'Pandan' },
      c: { bg: '#EEF5EC', paper: '#F8FBF6', ink: '#1F3A2E', soft: '#D5E8D0', acc: '#8FC1A0', acc2: '#F2C6B4' } },
    { id: 'talas',  day: { id: 'Selasa', en: 'Tuesday' },  name: { id: 'Talas', en: 'Taro' },
      c: { bg: '#F1ECF7', paper: '#FAF7FC', ink: '#33264A', soft: '#E0D5EF', acc: '#B9A3DB', acc2: '#F5D9A8' } },
    { id: 'langit', day: { id: 'Rabu', en: 'Wednesday' },  name: { id: 'Langit', en: 'Sky' },
      c: { bg: '#EAF2F8', paper: '#F7FAFD', ink: '#1D3348', soft: '#D2E3F0', acc: '#94BEDD', acc2: '#F4C7C3' } },
    { id: 'kunyit', day: { id: 'Kamis', en: 'Thursday' },  name: { id: 'Kunyit', en: 'Turmeric' },
      c: { bg: '#FBF5DA', paper: '#FFFBEA', ink: '#3D3214', soft: '#F3E6AE', acc: '#E9CF6E', acc2: '#A9CBE0' } },
    { id: 'jambu',  day: { id: 'Jumat', en: 'Friday' },    name: { id: 'Jambu', en: 'Guava' },
      c: { bg: '#FBEDEE', paper: '#FEF8F8', ink: '#4A2229', soft: '#F5D3D6', acc: '#EBA5AE', acc2: '#B5D8C8' } },
    { id: 'laut',   day: { id: 'Sabtu', en: 'Saturday' },  name: { id: 'Laut', en: 'Lagoon' },
      c: { bg: '#E6F4F2', paper: '#F5FBFA', ink: '#183B3A', soft: '#CBE7E3', acc: '#86CBC2', acc2: '#F1B9A6' } }
  ];

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  function read(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  var todayIndex = new Date().getDay();

  function apply(index) {
    var p = PALETTES[index], s = document.documentElement.style;
    for (var k in p.c) s.setProperty('--' + k, p.c[k]);
    document.documentElement.setAttribute('data-palette', p.id);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', p.c.bg);
    RH.palette = index;
    document.dispatchEvent(new CustomEvent('rh:palette', { detail: { index: index } }));
  }

  /* A manual choice only lasts for the day it was made, so the
     "new colour every day" promise always holds. */
  function choose(index) {
    write('rh-palette', { date: today(), index: index });
    apply(index);
  }

  function setLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    write('rh-lang', lang);
    RH.lang = lang;
    document.dispatchEvent(new CustomEvent('rh:lang', { detail: { lang: lang } }));
  }

  var RH = window.RH = { PALETTES: PALETTES, todayIndex: todayIndex, apply: apply, choose: choose, setLang: setLang };

  var saved = read('rh-palette');
  apply(saved && saved.date === today() ? saved.index : todayIndex);

  var lang = read('rh-lang');
  RH.lang = lang === 'en' ? 'en' : 'id';
  document.documentElement.setAttribute('data-lang', RH.lang);
  document.documentElement.setAttribute('lang', RH.lang);
})();
