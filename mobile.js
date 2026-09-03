// Kiki portfolio — mobile experience. Full-bleed app, a draggable decision sheet in Kiki's own
// sheet vocabulary, horizontal swipe between six screens. Vanilla port of the design prototype.
// Scoped entirely to #mobile-root so it can coexist with the desktop tree on one URL.
(function () {
  const TEAL = '#4FBFA6', GOLD = '#E6CD8B', RUST = '#D98A8A';
  const EXPO_URL = '#';                 // placeholder until the eas update link lands
  const WEB_URL = '/app/';              // the real web build, same as desktop

  const INTRO = 'You both moved to London from Mount Eden, studied at Paris, 2017 and are into bouldering at Blok Shoreditch. You share 2 mutual friends — Bella and Sophie — who can vouch for Emma in person.';

  const SCREENS = [
    {
      key: 'explore', label: 'Explore', accent: TEAL,
      title: 'The front door sorts by people, not price.',
      standfirst: 'Kiki opens on who you could reach, in order of how close they are to you. The price is deliberately the smallest thing on the card.',
      notes: [
        { kicker: 'Hierarchy', head: 'The host is inside the photograph', body: 'Name and place sit on a bottom scrim rather than a floating chip, so the person reads as part of the home instead of a label stuck on top of it.' },
        { kicker: 'Sorting', head: 'Degrees, never price', body: 'Order comes from the graph: one step, then two, then three. A cheaper room further from you appears lower. This is the single decision that stops Kiki collapsing into a marketplace.' },
        { kicker: 'Motion', head: 'The list assembles itself', body: 'Cards rise on a 110ms stagger. Danica carries a slow halo because she is one step away — the only animated thing on screen is the strongest trust signal.' },
        { kicker: 'Identity', head: 'Flags blend into place', body: '🇦🇺 Tooting, London reads as a person from somewhere, living somewhere. The earlier version floated a two-letter badge on the avatar, which felt like a passport stamp on a warm app.' },
      ],
    },
    {
      key: 'map', label: 'Map', accent: TEAL,
      title: 'A map of people who happen to have rooms.',
      standfirst: 'Bespoke Web-Mercator projection over real listing coordinates rather than a dropped-in SDK — which is why the pins can be faces.',
      notes: [
        { kicker: 'Restraint', head: 'The basemap is desaturated on purpose', body: 'Roads and parks are pulled back so faces are the only saturated thing in the frame. Zoom buttons are gone: pinch and double-tap already exist on a phone.' },
        { kicker: 'Encoding', head: 'Ring weight is the data', body: 'Solid teal for one step, thinner for two, dashed hairline for three. You can read your reach across a city without a legend, and colour is never asked to carry it alone.' },
        { kicker: 'Honesty', head: 'The trust chain is never drawn across geography', body: 'Degrees are not spatial — a mutual could be in Auckland. Tapping a face draws the chain as a diagram instead, so the app never implies a coordinate it does not have.' },
        { kicker: 'Surface', head: 'The preview is a sheet, not a card', body: 'The selected home arrives as frosted glass over the map with the route named — “through Bella” — so the map never loses its place. The sheet you are reading now borrows that same behaviour.' },
      ],
    },
    {
      key: 'trust', label: 'Emma · Trust', accent: TEAL,
      title: 'The trust page is the product.',
      standfirst: 'Not a star rating. A paragraph a mutual friend could have written, with every claim labelled by where it came from.',
      notes: [
        { kicker: 'Provenance', head: 'Every fact carries its source', body: '“their words”, “a mutual”, “a vouch”. A shared hometown is not evidence of safety and is not dressed up as it — the chips make the difference between a claim and a corroboration visible at a glance.' },
        { kicker: 'Composition', head: 'The intro types itself, once', body: 'Watch it compose behind this sheet. The box is pre-sized so nothing below it jumps, then the provenance chips settle in. The ✨ chip gets one slow sheen every five seconds — that is the entire AI treatment.' },
        { kicker: 'Asymmetry', head: 'Host and guest are different questions', body: 'How someone keeps a home and how someone treats a home are separate reputations. The segmented control refuses to average them into one score.' },
        { kicker: 'Closure', head: '“What this answers”', body: 'Ticks naming the questions a host actually has: who they are, how they treat a home, someone accountable. It converts a wall of prose into a decision.' },
      ],
    },
    {
      key: 'cost', label: 'Onboarding · cost', accent: RUST,
      title: 'Tell people what joining costs before they join.',
      standfirst: 'Step three of onboarding is the one no growth team would ship — stated in the flow, while someone can still walk away.',
      notes: [
        { kicker: 'Copy', head: '“Some will say no. That’s the system working.”', body: 'A new member starts with nothing and hosts will see that. Saying it out loud sets an expectation the product can actually meet, instead of a warm welcome followed by silent rejections.' },
        { kicker: 'Accountability', head: 'The inviter is named, not hidden', body: '“Bella’s name is on yours.” Invite-only networks usually bury the referrer. Kiki puts the cost of vouching on screen, because that cost is what makes a vouch mean anything.' },
        { kicker: 'Form', head: 'A 3px red edge, never a red card', body: 'A hairline rule marks each obligation without turning the screen into a warning. The tone stays calm; the content does the work.' },
        { kicker: 'Progress', head: 'Four steps, no dark patterns', body: 'The stepper is honest about length, Back is always available, and Skip disappears on the final step because there is nothing left to skip past “Start exploring”.' },
      ],
    },
    {
      key: 'requests', label: 'Requests', accent: TEAL,
      title: 'Weight on the yes, nothing on the no.',
      standfirst: 'Accepting a stranger into your home is irreversible, so it takes a deliberate gesture. Declining is a plain tap, and is never recorded.',
      notes: [
        { kicker: 'Friction', head: 'Slide, with rising resistance', body: 'Drag it behind this sheet. Travel is eased so the last third takes real effort and a yes cannot be a mis-tap; release early and it springs home. On device: selection haptic at halfway, one medium impact on commit, nothing on ordinary taps.' },
        { kicker: 'Fairness', head: '“No timers here”', body: 'No countdown on a request, no ranking for replying fast. The inbox tells hosts to read the page, ask the mutual, and answer when they actually know.' },
        { kicker: 'Truth', head: 'Weak ties are labelled as weak', body: '“Nobody you know has met her.” Third-degree requests lose the mint tint entirely, so mint only ever means someone can vouch. The design never flatters a thin connection.' },
        { kicker: 'Layout', head: 'Two states, one card shape', body: 'Needs-reply and waiting-on-them share a card with a 3px status edge instead of two components, so the inbox reads as one list at a glance.' },
      ],
    },
    {
      key: 'community', label: 'Community', accent: TEAL,
      title: 'Belonging has two ledgers, never one score.',
      standfirst: 'People whose lives overlap yours, and the people quietly holding the place up. Neither is a compatibility score.',
      notes: [
        { kicker: 'Community', head: 'Two ledgers, never one score', body: 'People-like-you (homophily — the warm reason to reach out) and giving-back (contribution — the reason to trust it) are kept apart. The app never fuses them into a single rank.' },
        { kicker: 'Homophily', head: 'Shared facts, not a match %', body: '“In common” counts what you actually share and labels them as facts to open with — explicitly not a compatibility percentage the app invented.' },
        { kicker: 'Contribution', head: 'Ranked by what you give', body: 'The leaderboard sorts on hosting, vouching and showing up, decayed by recency — so standing reflects recent generosity, not a lifetime hoard.' },
        { kicker: 'Tier', head: 'Colour carries the tier', body: 'Newcomer → Trusted → Pillar → Legend reads from a single dot; gold is held back for the very top, so status stays scarce and earned.' },
      ],
    },
    {
      key: 'trips', label: 'Trips', accent: TEAL,
      title: 'A trip is a loop, not a transaction.',
      standfirst: 'Out for offers, coming up, and the guest-book entry you still owe. Closing that loop is what keeps the network warm.',
      notes: [
        { kicker: 'Reciprocity', head: 'A trip leaves something behind', body: 'Trips isn’t a bookings list; it surfaces the entry you owe your last host, because what you write is how the next host will come to know you.' },
        { kicker: 'Coverage', head: 'Offers are partial by default', body: 'Out-for-offers is built around nights covered, not a yes/no — a host can take some of your nights and you stitch the rest together from your network.' },
        { kicker: 'Honesty', head: 'The owed entry is shown, not nagged', body: '“You owe Danica an entry” states the obligation once, plainly — no red badge, no countdown, no guilt mechanics. Then it gets out of the way.' },
        { kicker: 'Unchained', head: 'Two trips for the price of one', body: 'A stay needn’t be chained to a single host. Posting your dates invites partial offers from people you’re connected to — the graph plans the trip.' },
      ],
    },
    {
      key: 'messages', label: 'Messages', accent: TEAL,
      title: 'Every thread exists because someone vouched.',
      standfirst: 'Not a cold-DM surface. Each conversation carries the route that opened it, and sending feels as instant as texting a friend.',
      notes: [
        { kicker: 'Origin', head: 'Every thread has a reason', body: 'Each row carries the route that opened it — a mutual vouched — so a message is never a stranger sliding into your inbox. The connection is the permission.' },
        { kicker: 'Optimistic', head: 'Instant as an iMessage', body: 'A sent bubble lands the moment you hit send — “as instant as an Instagram DM.” The local store mirrors what a real backend would hydrate.' },
        { kicker: 'Order', head: 'By last activity, not unread count', body: 'The inbox sorts on the recency of real exchange — no manufactured urgency, no unread-badge pressure engineered to pull you back.' },
        { kicker: 'Reach', head: 'The step-distance rides along', body: 'Each thread shows how near the person is to you, so the trust context travels with the conversation rather than being left behind on a profile.' },
      ],
    },
    {
      key: 'me', label: 'Me', accent: GOLD,
      title: 'Standing you cannot buy, and cannot fake.',
      standfirst: 'Contribution, not consumption. Hosting is weighted highest and shown empty when it is empty.',
      notes: [
        { kicker: 'Incentives', head: 'The empty bar is the message', body: 'Hosted sits at zero and stays visibly at zero. Bars fill left-to-right on a stagger so the gap reads as a fact about you rather than a rendering glitch.' },
        { kicker: 'Restraint', head: 'Gold is spent once', body: 'The only gold in the app is your own standing — the ring on your avatar and the tier pill. It never appears on a CTA or another person, so status reads as earned rather than decorative.' },
        { kicker: 'Provenance', head: 'Your own facts are labelled too', body: 'Everything others can see, and how it was established. Nothing is silently inferred, which is the same promise the trust page makes about other people.' },
        { kicker: 'Origin', head: 'How you got in stays visible', body: 'Bella’s invite and her exact words remain on your profile. The obligation does not expire once you are inside — it is what your standing is built on.' },
      ],
    },
  ];

  const PEEK = 168;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const n2 = (v) => (v + 1 < 10 ? '0' + (v + 1) : String(v + 1));

  let i = 0, open = false;
  let typer = null, looper = null;

  function noteCard(note, accent) {
    return `<div style="position:relative; padding:15px 16px 15px 19px; background:rgba(255,255,255,0.055); border:1px solid rgba(255,255,255,0.12); border-radius:18px; display:flex; flex-direction:column; gap:6px;">
      <span style="position:absolute; left:0; top:19px; bottom:19px; width:3px; border-radius:2px; background:${accent}; display:block;"></span>
      <span style="font:700 9.5px/1 ui-monospace,Menlo,monospace; letter-spacing:1.2px; text-transform:uppercase; color:${accent};">${esc(note.kicker)}</span>
      <span style="font:600 15.5px/1.3 -apple-system,sans-serif; letter-spacing:-0.2px; color:#F6F5F1;">${esc(note.head)}</span>
      <span style="font:400 13.5px/21px -apple-system,sans-serif; color:#A9BDB6; text-wrap:pretty;">${esc(note.body)}</span>
    </div>`;
  }

  function renderSheet() {
    const s = SCREENS[i], n = SCREENS.length;
    const meta = $('mMeta'); meta.textContent = n2(i) + '/' + n2(n - 1) + ' · ' + s.label; meta.style.color = s.accent;
    $('mTitle').textContent = s.title;
    $('mStandfirst').textContent = s.standfirst;
    $('mNotes').innerHTML = s.notes.map((nt) => noteCard(nt, s.accent)).join('');
    $('mPrev').textContent = '‹ ' + SCREENS[(i - 1 + n) % n].label;
    $('mNext').textContent = SCREENS[(i + 1) % n].label + ' ›';
    $('mBars').innerHTML = SCREENS.map((sc, k) => `<span style="flex:1; height:3px; border-radius:2px; background:${k === i ? s.accent : 'rgba(26,26,26,0.14)'}; display:block;"></span>`).join('');
  }

  function showScreen() { for (let k = 0; k < SCREENS.length; k++) { const el = $('mScr' + k); if (el) el.style.display = k === i ? 'block' : 'none'; } }

  function setScreen(idx) {
    i = (idx + SCREENS.length) % SCREENS.length;
    showScreen(); renderSheet();
    if (i === 2) runIntro(); else stopIntro();
  }
  function step(d) { setScreen(i + d); }

  function setOpen(v) {
    open = v;
    const sh = $('mSheet'), caret = $('mCaret');
    if (sh) sh.classList.toggle('open', open);
    if (caret) caret.style.transform = open ? 'rotate(180deg)' : '';
  }

  // ── decision sheet: peek → full, draggable (positioned by `top`, declarative rest states) ──
  let sheetDrag = null, sheetDragged = false, sheetY = 0;
  function sheetTravel() { const el = $('mSheet'); const h = el ? el.getBoundingClientRect().height : 0; const fb = (window.innerHeight || 844) * 0.82; return Math.max(120, (h > 0 ? h : fb) - PEEK); }
  function openTop() { const el = $('mSheet'); const h = el ? el.getBoundingClientRect().height : 0; const vh = window.innerHeight || 0; return Math.max(0, (vh || h / 0.82) - (h || vh * 0.82)); }
  function paintSheet(offset) { const el = $('mSheet'); if (!el) return; if (offset === undefined) { el.style.removeProperty('top'); return; } el.style.setProperty('top', (openTop() + offset) + 'px', 'important'); }
  function toggleSheet() { if (sheetDragged) { sheetDragged = false; return; } paintSheet(); setOpen(!open); }
  function onSheetDown(e) {
    sheetDrag = { y: e.clientY, base: open ? 0 : sheetTravel() };
    sheetDragged = false;
    const el = $('mSheet'); if (el) el.style.setProperty('transition', 'none', 'important');
    window.addEventListener('pointermove', onSheetMove);
    window.addEventListener('pointerup', onSheetUp);
  }
  function onSheetMove(e) {
    if (!sheetDrag) return;
    const dy = e.clientY - sheetDrag.y;
    if (Math.abs(dy) > 5) sheetDragged = true;
    const travel = sheetTravel();
    sheetY = Math.max(0, Math.min(travel, sheetDrag.base + dy));
    paintSheet(sheetY);
  }
  function onSheetUp() {
    window.removeEventListener('pointermove', onSheetMove);
    window.removeEventListener('pointerup', onSheetUp);
    const el = $('mSheet'); if (el) el.style.removeProperty('transition');
    if (sheetDragged) { const v = (sheetY || 0) < sheetTravel() * 0.45; paintSheet(); setOpen(v); }
    sheetDrag = null;
  }

  // ── horizontal swipe over the app area changes screen ──
  let swipe = null;
  function onSwipeDown(e) {
    if (open) return;
    if (e.target.closest('#mSheet')) return;
    swipe = { x: e.clientX, y: e.clientY, live: false };
    window.addEventListener('pointermove', onSwipeMove);
    window.addEventListener('pointerup', onSwipeUp);
  }
  function onSwipeMove(e) {
    if (!swipe) return;
    const dx = e.clientX - swipe.x, dy = e.clientY - swipe.y;
    if (!swipe.live && Math.abs(dx) > 14 && Math.abs(dx) > Math.abs(dy) * 1.4) swipe.live = true;
    swipe.dx = dx;
  }
  function onSwipeUp() {
    window.removeEventListener('pointermove', onSwipeMove);
    window.removeEventListener('pointerup', onSwipeUp);
    if (swipe && swipe.live && Math.abs(swipe.dx) > 48) step(swipe.dx < 0 ? 1 : -1);
    swipe = null;
  }

  // ── slide to accept (Requests) ──
  let drag = null, currentX = 0, committed = false;
  function maxTravel() { const t = $('mTrack'); return t ? Math.max(60, t.clientWidth - 56) : 240; }
  function paintKnob(p, x) { const k = $('mKnob'), f = $('mFill'), l = $('mSlabel'); if (k) k.style.transform = 'translateX(' + x + 'px)'; if (f) f.style.transform = 'scaleX(' + p + ')'; if (l) l.style.opacity = String(Math.max(0, 1 - p * 1.6)); }
  function onKnobDown(e) {
    if (!$('mKnob') || committed) return;
    e.stopPropagation();
    drag = { x: e.clientX, base: currentX || 0 };
    $('mKnob').style.transition = 'none';
    window.addEventListener('pointermove', onKnobMove);
    window.addEventListener('pointerup', onKnobUp);
  }
  function onKnobMove(e) {
    if (!drag) return;
    const max = maxTravel();
    const raw = Math.max(0, Math.min(max, drag.base + (e.clientX - drag.x)));
    const eased = max * Math.pow(raw / max, 1.35);
    currentX = eased; paintKnob(eased / max, eased);
  }
  function onKnobUp() {
    window.removeEventListener('pointermove', onKnobMove);
    window.removeEventListener('pointerup', onKnobUp);
    const k = $('mKnob'), f = $('mFill'), l = $('mSlabel'); if (!k) return;
    k.style.transition = 'transform 380ms cubic-bezier(0.16,0.84,0.24,1)';
    if (f) f.style.transition = 'transform 380ms cubic-bezier(0.16,0.84,0.24,1)';
    const max = maxTravel();
    if ((currentX || 0) / max > 0.86) {
      committed = true; currentX = max; paintKnob(1, max);
      if (f) f.style.background = '#17A589';
      if (l) { l.textContent = 'Yes — Emma’s in'; l.style.color = '#FFFFFF'; l.style.opacity = '1'; }
      setTimeout(() => {
        committed = false; currentX = 0;
        if (f) f.style.background = '#E7F4F0';
        if (l) { l.textContent = 'Slide to say yes'; l.style.color = '#4B5563'; }
        paintKnob(0, 0);
      }, 2400);
    } else { currentX = 0; paintKnob(0, 0); }
    drag = null;
  }

  // ── composing intro (Trust screen only) ──
  function runIntro() {
    const el = $('mIntro'), chips = $('mChips'); if (!el) return;
    el.textContent = '';
    if (chips) { chips.style.opacity = '0'; chips.style.transform = 'translateY(6px)'; }
    let n = 0; stopIntro();
    typer = setInterval(() => {
      n += 3; el.textContent = INTRO.slice(0, n);
      if (n >= INTRO.length) {
        clearInterval(typer); typer = null;
        if (chips) { chips.style.transition = 'opacity 520ms ease-out, transform 520ms cubic-bezier(0.16,0.84,0.24,1)'; chips.style.opacity = '1'; chips.style.transform = 'translateY(0)'; }
        looper = setTimeout(() => { if (i === 2) runIntro(); }, 7000);
      }
    }, 16);
  }
  function stopIntro() { if (typer) { clearInterval(typer); typer = null; } if (looper) { clearTimeout(looper); looper = null; } }

  // ── entrance reveals (opening + closing sections only), scoped to #mobile-root ──
  let io = null, rvSafety = null;
  function armReveals() {
    const root = $('mobile-root'); if (!root) return;
    if (io) { io.disconnect(); io = null; }
    const items = root.querySelectorAll('[data-rv]');
    const show = (el) => {
      const order = parseInt(el.getAttribute('data-rv'), 10) || 0;
      el.dataset.rvDone = '1';
      el.style.transitionDelay = ((order % 10) * 90) + 'ms';
      el.style.opacity = '1'; el.style.transform = 'none'; el.style.filter = el.dataset.baseFilter || 'none';
    };
    if (!window.IntersectionObserver) { items.forEach(show); return; }
    const pending = [];
    items.forEach((el) => {
      if (el.dataset.rvDone === '1') return;
      if (el.dataset.baseFilter === undefined) el.dataset.baseFilter = el.style.filter || '';
      const base = el.dataset.baseFilter;
      el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
      el.style.filter = (base ? base + ' ' : '') + 'blur(5px)';
      el.style.transition = 'opacity 900ms cubic-bezier(0.16,0.84,0.24,1), transform 900ms cubic-bezier(0.16,0.84,0.24,1), filter 700ms ease-out';
      pending.push(el);
    });
    if (!pending.length) return;
    io = new IntersectionObserver((entries, observer) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(e.target); observer.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    pending.forEach((el) => io.observe(el));
    requestAnimationFrame(() => {
      pending.forEach((el) => { if (el.dataset.rvDone === '1') return; const r = el.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) { show(el); if (io) io.unobserve(el); } });
    });
    clearTimeout(rvSafety);
    const nearFold = pending.filter((el) => el.getBoundingClientRect().top < window.innerHeight * 1.2);
    if (nearFold.length) rvSafety = setTimeout(() => nearFold.forEach((el) => { if (el.dataset.rvDone !== '1') show(el); }), 2500);
  }

  // ── wiring (all scoped to #mobile-root) ──
  let wired = false;
  function wire() {
    if (wired) return; wired = true;
    document.addEventListener('click', (e) => {
      const g = e.target.closest('#mobile-root [data-goto]'); if (g) { setScreen(parseInt(g.getAttribute('data-goto'), 10)); return; }
      if (e.target.closest('#mPrev')) { step(-1); return; }
      if (e.target.closest('#mNext')) { step(1); return; }
      if (e.target.closest('#mHandle')) { toggleSheet(); return; }
    });
    const handle = $('mHandle'); if (handle) handle.addEventListener('pointerdown', onSheetDown);
    const deck = $('mDeck'); if (deck) deck.addEventListener('pointerdown', onSwipeDown);
    const knob = $('mKnob'); if (knob) knob.addEventListener('pointerdown', onKnobDown);
    // resolve the placeholder / real links
    const expo = $('mExpo'); if (expo) expo.setAttribute('href', EXPO_URL);
    const web = $('mWeb'); if (web) web.setAttribute('href', WEB_URL);
  }

  function init() {
    if (!$('mobile-root')) return;
    wire();
    setScreen(0);
    setOpen(false);
    armReveals();
  }

  window.__kikiMobileInit = init;
  init();
})();
