(() => {
  const root = document.documentElement;
  root.classList.add('js');

  /* ───────── i18n (Hungarian is the default text in the HTML) ───────── */
  const EN = {
    nav_about: 'About', nav_dishes: 'Dishes', nav_offer: 'Offer', nav_exp: 'Experience', nav_contact: 'Contact',
    hero_eyebrow: 'Private Chef',
    hero_title: 'Fine dining,<br><em>at your place.</em>',
    hero_lead: 'Restaurant-quality dinner in your own home — in Budapest, Vienna and Bratislava.',
    hero_foot: 'Budapest <i>·</i> Vienna <i>·</i> Bratislava',
    cta_request: 'Request a quote', cta_dishes: 'See the dishes',
    about_label: 'The chef',
    about_title: 'One chef, one table, <em>one evening.</em>',
    about_p1: 'I am a professional private chef with more than 20 years of experience in à la carte and catering. I bring restaurant standards and carefully composed plates to you — into your kitchen, to your table.',
    about_p2: 'For me it is about the balance of colour, flavour and texture: every course is a small composition, to be enjoyed slowly, together.',
    st1: 'years of experience', st2: 'course custom menus', st3: 'many guest reviews',
    offer_label: 'Offer',
    offer_title: 'For every occasion, <em>every taste.</em>',
    cuisine_h: 'Cuisine',
    cu1: 'Contemporary fusion', cu2: 'International classics', cu3: 'Seafood', cu4: 'Italian', cu5: 'Japanese', cu6: 'Hungarian', cu7: 'Vegetarian &amp; vegan',
    cuisine_note: 'Artistic presentation — and, if you like, a little gastronomic history at the table. Allergies and dietary wishes are always taken into account.',
    occ_h: 'Occasions',
    oc1: 'Family &amp; friends dinners', oc2: 'Kids’ menu', oc3: 'Wine pairing', oc4: 'Birthday cake', oc5: 'Christmas dinner', oc6: 'Garden party with BBQ', oc7: 'Corporate events',
    occ_note: 'In your home, a rented apartment or an Airbnb — I come to wherever you are.',
    dishes_label: 'Dishes',
    dishes_title: 'Colour <em>on the plate.</em>',
    dishes_intro: 'Four chapters, four palettes — a selection of the chef’s work.',
    c1_title: 'Verdant', c1_tag: 'Herbs, greens, freshness.',
    c2_title: 'Ember', c2_tag: 'Warm, golden, generous.',
    c3_title: 'Ruby &amp; Indigo', c3_tag: 'Deep colour, bold contrast.',
    c4_title: 'Cream', c4_tag: 'Quiet, delicate, airy.',
    exp_label: 'Experience',
    exp_title: 'The restaurant, <em>in your home.</em>',
    exp_lead: 'No reservations, crowds, parking or waiting — even with children, a big family or many friends.',
    s1_t: 'Personal consultation', s1_p: 'Quick, direct communication: you tell me the occasion, the number of guests and your taste.',
    s2_t: 'Custom menu', s2_p: 'A 4-5-6 course menu tailored to you — with every allergy and dietary wish taken into account.',
    s3_t: 'Cooking on the spot', s3_p: 'I cook and plate in your own kitchen, so you can focus on your guests.',
    s4_t: 'Tidy at the end', s4_p: 'After service, a full clean-up: no dirty dishes, no chaos.',
    table_quote: 'One kitchen,<br><em>many plates.</em>',
    contact_label: 'Contact',
    contact_title: 'Request <em>a quote.</em>',
    contact_p: 'Tell me the occasion, the date, the number of guests and any allergies — I will reply quickly.',
    foot_tag: 'Fine dining experience at your place — éttermi élmény otthon.'
  };
  const META = {
    hu: { title: 'Privátséf — Éttermi élmény otthon', desc: 'Privátséf Budapesten, Bécsben és Pozsonyban: éttermi minőségű, egyedi 4-5-6 fogásos vacsora a saját otthonodban. Private chef — fine dining at your home.', subject: 'Aj%C3%A1nlatk%C3%A9r%C3%A9s' },
    en: { title: 'Private Chef — Fine dining experience at your place', desc: 'Private chef in Budapest, Vienna and Bratislava: restaurant-quality, custom 4-5-6 course dinners in your own home. Éttermi élmény otthon.', subject: 'Quote%20request' }
  };

  const i18nEls = [...document.querySelectorAll('[data-i18n]')];
  i18nEls.forEach(el => { el.dataset.hu = el.innerHTML; });
  const altEls = [...document.querySelectorAll('[data-alt-en]')];
  altEls.forEach(el => { el.dataset.altHu = el.getAttribute('alt'); });
  const mail = document.querySelector('.mail');
  const descMeta = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');

  function setLang(lang, persist) {
    root.lang = lang;
    i18nEls.forEach(el => { el.innerHTML = lang === 'en' ? EN[el.dataset.i18n] : el.dataset.hu; });
    altEls.forEach(el => el.setAttribute('alt', lang === 'en' ? el.dataset.altEn : el.dataset.altHu));
    document.title = META[lang].title;
    if (descMeta) descMeta.content = META[lang].desc;
    if (ogTitle) ogTitle.content = META[lang].title;
    if (mail) mail.href = 'mailto:info@private-chef.hu?subject=' + META[lang].subject;
    if (persist) { try { localStorage.setItem('lang', lang); } catch (e) {} }
  }

  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  const initial = saved || ((navigator.language || 'hu').toLowerCase().startsWith('hu') ? 'hu' : 'en');
  if (initial === 'en') setLang('en', false);

  document.getElementById('langBtn').addEventListener('click', () => {
    setLang(root.lang === 'hu' ? 'en' : 'hu', true);
  });

  /* ───────── Nav ───────── */
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const closeMenu = () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', closeMenu));

  /* ───────── Reveal on scroll ───────── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ───────── Lightbox ───────── */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const tiles = [...document.querySelectorAll('.tile')];
  let idx = 0;

  function show(i) {
    idx = (i + tiles.length) % tiles.length;
    const img = tiles[idx].querySelector('img');
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
  }
  tiles.forEach((t, i) => t.addEventListener('click', () => { show(i); lb.showModal(); }));
  lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
  lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb || e.target === lbImg) lb.close(); });
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
