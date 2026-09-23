// Kiki — design-decisions portfolio page. Vanilla rebuild of the DCLogic prototype:
// the showcase is a live, tappable phone with per-screen annotations, a picker, scroll-reveals,
// a slide-to-accept gesture and a self-typing trust intro. The full real web build lives at /app/.

const TEAL = '#17A589';
const GOLD = '#A08A45';

const INTRO = 'You both moved to London from Mount Eden, studied at Paris, 2017 and are into bouldering at Blok Shoreditch. You share 2 mutual friends — Nina and Sophie — who can vouch for Maia in person.';

const SCREENS = [
  {
    key: 'explore', label: 'Explore', accent: TEAL,
    title: 'The front door sorts by people, not price.',
    standfirst: 'Every listing app opens on inventory. Kiki opens on who you could reach, in order of how close they are to you — the sub-line under each name says the distance, and the price is deliberately the smallest thing on the card.',
    left: [
      { kicker: 'Hierarchy', head: 'The host is inside the photograph', body: 'Name and place sit on a bottom scrim rather than in a floating chip, so the person reads as part of the home instead of a label stuck on top of it. Price gets a pill because it must be scannable, not because it is the point.' },
      { kicker: 'Sorting', head: 'Degrees, never price', body: 'Order comes from the graph: one step, then two, then three. A cheaper room further from you appears lower. This is the single decision that stops Kiki collapsing into a marketplace.' },
    ],
    right: [
      { kicker: 'Motion', head: 'The list assembles itself', body: 'Cards rise on a 110ms stagger with an iOS spring curve. Danica carries a slow halo because she is one step away — the only animated thing on screen is the strongest trust signal.' },
      { kicker: 'Identity', head: 'Nationality as a small badge', body: 'A two-letter “AU” on the avatar instead of a flag emoji: it matches at every size, renders the same on every platform, and states the fact without the bunting. The design record retired emoji; the app agrees.' },
    ],
  },
  {
    key: 'map', label: 'Map', accent: TEAL,
    title: 'A map of people who happen to have rooms.',
    standfirst: 'Bespoke Web-Mercator projection over real listing coordinates rather than a dropped-in SDK — which means the pins can be faces, and ring weight can carry degrees of separation.',
    left: [
      { kicker: 'Restraint', head: 'The basemap is desaturated on purpose', body: 'Roads and parks are pulled back so faces are the only saturated thing in the frame. Zoom buttons are gone: pinch and double-tap already exist on a phone, and three chrome buttons on a map is a web layout showing through.' },
      { kicker: 'Honesty', head: 'The trust chain is never drawn across geography', body: 'Degrees are not spatial — a mutual could be in Auckland. Tapping a face dims the map and draws the chain as a diagram instead, so the app never implies a coordinate it does not have.' },
    ],
    right: [
      { kicker: 'Encoding', head: 'Ring weight is the data', body: 'Solid teal for one step, thinner for two, dashed hairline for three. You can read your own reach across a city without a legend, and colour is never asked to carry it alone.' },
      { kicker: 'Surface', head: 'The preview is a sheet, not a card', body: 'The selected home arrives as frosted glass over the map with the route named — “through Nina” — rather than a panel docked into the layout, so the map never loses its place.' },
    ],
  },
  {
    key: 'trust', label: 'Maia · Trust', accent: TEAL,
    title: 'The trust page is the product.',
    standfirst: 'Not a star rating. A paragraph a mutual friend could have written, with every claim labelled by where it came from, and the whole thing switchable between how she behaves as a host and as a guest.',
    left: [
      { kicker: 'Provenance', head: 'Every fact carries its source', body: '“their words”, “a mutual”, “a vouch”. A shared hometown is not evidence of safety and is not dressed up as it — the chips make the difference between a claim and a corroboration visible at a glance.' },
      { kicker: 'Asymmetry', head: 'Host and guest are different questions', body: 'How someone keeps a home and how someone treats a home are separate reputations. The segmented control refuses to average them into one score.' },
    ],
    right: [
      { kicker: 'Intelligence', head: 'Written by a model, from the facts', body: 'In the real build the paragraph is composed by a language model from the structured trust facts — told to use only what the graph proves and to say plainly what it can’t. It runs live, with a saved run as backstop so a demo never breaks. Here it is replayed; the web app writes one for real.' },
      { kicker: 'Closure', head: '“What this answers”', body: 'Ticks naming the questions a host actually has: who they are, how they treat a home, someone accountable. It converts a wall of prose into a decision.' },
    ],
  },
  {
    key: 'cost', label: 'Onboarding · cost', accent: '#C15B5B',
    title: 'Tell people what joining costs before they join.',
    standfirst: 'Step three of onboarding is the one no growth team would ship. It states the three obligations plainly, in the flow, at the moment someone can still walk away.',
    left: [
      { kicker: 'Copy', head: '“Some will say no. That’s the system working.”', body: 'A new member starts with nothing and hosts will see that. Saying it out loud sets an expectation the product can actually meet, instead of a warm welcome followed by silent rejections.' },
      { kicker: 'Accountability', head: 'The inviter is named, not hidden', body: '“Nina’s name is on yours.” Invite-only networks usually bury the referrer. Kiki puts the cost of vouching on screen, because that cost is what makes a vouch mean anything.' },
    ],
    right: [
      { kicker: 'Form', head: 'Caveats get a 3px red edge, never a red card', body: 'A hairline rule marks each obligation without turning the screen into a warning. The tone stays calm; the content does the work.' },
      { kicker: 'Progress', head: 'Four steps, no dark patterns', body: 'The stepper is honest about length, Back is always available, and Skip disappears on the final step because there is nothing left to skip past “Start exploring”.' },
    ],
  },
  {
    key: 'requests', label: 'Requests', accent: TEAL,
    title: 'Weight on the yes, nothing on the no.',
    standfirst: 'Accepting a stranger into your home is irreversible, so it takes a deliberate gesture. Declining is a plain tap and is never recorded — which is exactly what the copy promises.',
    left: [
      { kicker: 'Friction', head: 'Slide, with rising resistance', body: 'Drag it. Travel is eased so the last third takes real effort and a yes cannot be a mis-tap; release early and it springs home. On device: selection haptic at halfway, one medium impact on commit, nothing on ordinary taps.' },
      { kicker: 'Fairness', head: '“No timers here”', body: 'No countdown on a request, no ranking for replying fast. The inbox explicitly tells hosts to read the page, ask the mutual, and answer when they actually know.' },
    ],
    right: [
      { kicker: 'Truth', head: 'Weak ties are labelled as weak', body: '“Nobody you know has met her.” Third-degree requests lose the mint tint entirely, so mint only ever means someone can vouch. The design never flatters a thin connection.' },
      { kicker: 'Layout', head: 'Two states, one card shape', body: 'Needs-reply and waiting-on-them share a card with a 3px status edge instead of two different components, so the inbox reads as one list at a glance.' },
    ],
  },
  {
    key: 'community', label: 'Community', accent: TEAL,
    title: 'Belonging has two ledgers, never one score.',
    standfirst: 'People whose lives overlap yours, and the people quietly holding the place up. Both say plainly what they measure; neither is a compatibility score.',
    left: [
      { kicker: 'Community', head: 'Two ledgers, never one score', body: 'People-like-you (homophily — the warm reason to reach out) and giving-back (contribution — the reason to trust it) are kept apart. The app never fuses them into a single rank.' },
      { kicker: 'Contribution', head: 'Ranked by what you give', body: 'The leaderboard sorts on hosting, vouching and showing up, decayed by recency — so standing reflects recent generosity, not a lifetime hoard.' },
    ],
    right: [
      { kicker: 'Homophily', head: 'Shared facts, not a match %', body: '“In common” counts what you actually share and labels them as facts to open with — explicitly not a compatibility percentage the app invented.' },
      { kicker: 'Tier', head: 'Colour carries the tier', body: 'Newcomer → Trusted → Pillar → Legend reads from a single dot; gold is held back for the very top, so status stays scarce and earned.' },
    ],
  },
  {
    key: 'trips', label: 'Trips', accent: TEAL,
    title: 'A trip is a loop, not a transaction.',
    standfirst: 'Dates away, matches, and — the part no booking app shows — the guest-book entry you still owe. Closing that loop is what keeps the network warm.',
    left: [
      { kicker: 'Reciprocity', head: 'A stay leaves something behind', body: 'Trips isn’t a bookings list; it surfaces the entry you owe your last host, because what you write is how the next host will come to know you.' },
      { kicker: 'Coverage', head: 'Offers are partial by default', body: 'Dates away are built around weeks covered, not a yes/no — someone can take five of your six weeks and you cover the rest from your network.' },
    ],
    right: [
      { kicker: 'Honesty', head: 'The owed entry is shown, not nagged', body: '“You owe Danica an entry” states the obligation once, plainly — no red badge, no countdown, no guilt mechanics. Then it gets out of the way.' },
      { kicker: 'Unchained', head: 'Two trips cost the same as one', body: 'Every week someone covers your rent is a week you can be somewhere else. Posting the weeks you’re away invites partial offers from people you’re connected to.' },
    ],
  },
  {
    key: 'messages', label: 'Messages', accent: TEAL,
    title: 'Every thread exists because someone vouched.',
    standfirst: 'The inbox is not a cold-DM surface. Each conversation carries the route that opened it, and sending feels as instant as texting a friend.',
    left: [
      { kicker: 'Origin', head: 'Every thread has a reason', body: 'Each row carries the route that opened it — a mutual vouched — so a message is never a stranger sliding into your inbox. The connection is the permission.' },
      { kicker: 'Optimistic', head: 'Instant as an iMessage', body: 'A sent bubble lands the moment you hit send — “as instant as an Instagram DM.” The local store mirrors exactly what a real backend would hydrate.' },
    ],
    right: [
      { kicker: 'Order', head: 'By last activity, not unread count', body: 'The inbox sorts on the recency of real exchange — no manufactured urgency, no unread-badge pressure engineered to pull you back.' },
      { kicker: 'Reach', head: 'The step-distance rides along', body: 'Each thread shows how near the person is to you, so the trust context travels with the conversation rather than being left behind on a profile.' },
    ],
  },
  {
    key: 'me', label: 'Me', accent: GOLD,
    title: 'Standing you cannot buy, and cannot fake.',
    standfirst: 'Contribution, not consumption. Hosting is weighted highest and shown empty when it is empty — the profile is willing to tell you that you have not earned anything yet.',
    left: [
      { kicker: 'Incentives', head: 'The empty bar is the message', body: 'Hosted sits at zero and stays visibly at zero. Bars fill left-to-right on a stagger so the gap reads as a fact about you rather than a rendering glitch.' },
      { kicker: 'Restraint', head: 'Gold is spent once', body: 'The only gold in the app is your own standing — the ring on your avatar and the tier pill. It never appears on a CTA or another person, so status reads as earned rather than decorative.' },
    ],
    right: [
      { kicker: 'Provenance', head: 'Your own facts are labelled too', body: 'Everything others can see, and how it was established. Nothing is silently inferred, which is the same promise the trust page makes about other people.' },
      { kicker: 'Origin', head: 'How you got in stays visible', body: 'Nina’s invite and her exact words remain on your profile. The obligation does not expire once you are inside — it is the thing your standing is built on.' },
    ],
  },
  {
    key: 'notifications', label: 'Notifications', accent: TEAL,
    title: 'Only what needs you counts.',
    standfirst: 'A refinement of Kiki’s own screen, not a redesign. Anything with a person waiting comes first with its action inline; identical alerts fold into one row; the badge counts the first section and nothing else.',
    left: [
      { kicker: 'Triage', head: 'Needs you, then the rest', body: 'A request and an owed guest-book entry are the two things that hold up someone else, so they sit at the top with the action in the card. Everything below is information.' },
      { kicker: 'Grouping', head: 'Identical alerts become one row', body: 'Three new rooms that fit your dates are one line with a count, named, and the degree of the closest. Seven separate “New listing matched your search!” cards taught people to swipe them all away.' },
    ],
    right: [
      { kicker: 'Copy', head: 'The fact, once, with the degree', body: '“One step from you now.” No exclamation marks anywhere on the screen. A notification that shouts is asking to be muted.' },
      { kicker: 'Badge', head: 'A number you can trust', body: 'The bell shows how many things need you, and only that. “9+” on a bell trains people to ignore it; “3” is a to-do list.' },
    ],
  },
  {
    key: 'match', label: 'The match', accent: TEAL,
    title: 'The yes gets a screen, not a toast.',
    standfirst: 'The emotional peak of the product, held until you dismiss it. The two of you are joined through Nina, not directly, because that is literally how the match exists.',
    left: [
      { kicker: 'Structure', head: 'Through the mutual, not around her', body: 'The line runs from you to Maia by way of Nina’s avatar. On a route of three steps it still runs through the person you know, and the copy says the distance instead of pretending a vouch.' },
      { kicker: 'Promise', head: '“You do nothing.”', body: 'The first line of what happens now is Kiki’s side of the deal: ID and payment are confirmed for you. It is the same promise as the fourth onboarding card, said again at the moment it matters.' },
    ],
    right: [
      { kicker: 'Motion', head: 'The line draws when both have landed', body: 'Avatars settle in on the app’s spring; the line draws left to right over 420ms once they have; the success haptic fires when it reaches Maia. Under Reduce Motion the line appears whole and there is one haptic.' },
      { kicker: 'Growth', head: '“Tell Nina” is how the graph grows', body: 'The secondary action sends a one-line thank-you to the person who connected you. That message is what makes vouching feel good, and vouching is the only way Kiki gets bigger.' },
    ],
  },
  {
    key: 'houselist', label: 'House list', accent: TEAL,
    title: 'What a host asks of you, agreed before the key changes hands.',
    standfirst: 'Every host has rules, small kindnesses they would love, and things a guest would be looking after: a cat to feed, plants, the post. Kiki keeps them apart because they mean different things, and the last kind is a commitment the guest ticks when asking.',
    left: [
      { kicker: 'Structure', head: 'Three sections, three meanings', body: 'Rules are what the host needs (rust, a cost). Things they would love are kindness, not terms (gold, the host’s own voice). What you would be looking after carries the one check a guest ticks. One grammar, learned once.' },
      { kicker: 'Honesty', head: 'The host sees what you agreed to', body: 'On the host’s Requests card the guest’s request says, in words, “Agreed to look after: water the plants twice a week”. Not a checkbox buried in terms: a line a person reads before they decide.' },
    ],
    right: [
      { kicker: 'Full stack', head: 'The same rule in the app and the API', body: 'The send button and the server run one shared function: every care item agreed, nothing that isn’t one. The request stores the words agreed to, so a host editing the list later cannot change what a guest said yes to.' },
      { kicker: 'Boundaries', head: 'Beside the graph, never inside it', body: 'House lists live in their own table and their own query. Editing one cannot move a degree, a route or an overlap, and a test proves the trust graph is untouched by what a host asks.' },
    ],
  },
];

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let current = 0;

// ── Annotation card markup ──────────────────────────────────────────────────
function annoCard(note, accent, side) {
  const pad = side === 'left' ? '22px 24px 22px 26px' : '22px 26px 22px 24px';
  const edge = side === 'left'
    ? `left:0; top:26px; bottom:26px;`
    : `right:0; top:26px; bottom:26px;`;
  const leader = side === 'left'
    ? `<span class="leader" style="position:absolute; right:-64px; top:50%; width:64px; height:1px; background:rgba(255,255,255,0.26); display:block; z-index:0;"></span>
       <span class="leader" style="position:absolute; right:-67px; top:50%; margin-top:-3px; width:7px; height:7px; border-radius:4px; background:${accent}; display:block; z-index:0;"></span>`
    : `<span class="leader" style="position:absolute; left:-64px; top:50%; width:64px; height:1px; background:rgba(255,255,255,0.26); display:block; z-index:0;"></span>
       <span class="leader" style="position:absolute; left:-67px; top:50%; margin-top:-3px; width:7px; height:7px; border-radius:4px; background:${accent}; display:block; z-index:0;"></span>`;
  return `<div style="position:relative; display:flex; flex-direction:column; gap:8px; padding:${pad}; background:rgba(255,255,255,0.055); border:1px solid rgba(255,255,255,0.14); border-radius:20px; backdrop-filter:blur(10px); animation:dd-in 520ms cubic-bezier(0.16,0.84,0.24,1) both;">
    <span style="position:absolute; ${edge} width:3px; border-radius:2px; background:${accent}; display:block;"></span>
    <span style="font:700 10.5px/1 ui-monospace,Menlo,monospace; letter-spacing:1.3px; text-transform:uppercase; color:${accent};">${esc(note.kicker)}</span>
    <span style="font:600 17px/1.3 -apple-system,sans-serif; letter-spacing:-0.2px; color:#F6F5F1;">${esc(note.head)}</span>
    <span style="font:400 14.5px/22px -apple-system,sans-serif; color:#A9BDB6; text-wrap:pretty;">${esc(note.body)}</span>
    ${leader}
  </div>`;
}

function n2(n) { return n + 1 < 10 ? '0' + (n + 1) : String(n + 1); }

// ── Render a screen index ───────────────────────────────────────────────────
function render(i) {
  current = i;
  const s = SCREENS[i];

  $('counter').textContent = n2(i) + ' / ' + n2(SCREENS.length - 1);
  $('title').textContent = s.title;
  $('standfirst').textContent = s.standfirst;

  $('leftCol').innerHTML = s.left.map((nt) => annoCard(nt, s.accent, 'left')).join('');
  $('rightCol').innerHTML = s.right.map((nt) => annoCard(nt, s.accent, 'right')).join('');

  for (let n = 0; n < SCREENS.length; n++) {
    $('scr' + n).style.display = n === i ? 'block' : 'none';
  }

  // navigation context in the freed top-left corner
  const prev = (i - 1 + SCREENS.length) % SCREENS.length;
  $('navPrev').textContent = '‹ ' + SCREENS[prev].label;

  // tab bar: hidden on the onboarding (cost) screen — it is a modal flow
  $('tabbar').style.display = i === 3 ? 'none' : 'flex';
  const on = TEAL, off = '#626C75';
  tint($('tabExplore'), i === 0 || i === 1 || i === 2 ? on : off);
  tint($('tabRequests'), i === 4 ? on : off);
  tint($('tabCommunity'), i === 5 ? on : off);
  tint($('tabTrips'), i === 6 ? on : off);
  tint($('tabMessages'), i === 7 ? on : off);
  tint($('tabMe'), i === 8 ? '#C9A227' : off);

  // picker chips
  $('picker').innerHTML = SCREENS.map((sc, n) => {
    const active = n === i;
    const bg = active ? '#F6F5F1' : 'rgba(255,255,255,0.06)';
    const fg = active ? '#12211D' : '#BFD6CE';
    const bd = active ? '#F6F5F1' : 'rgba(255,255,255,0.18)';
    return `<span data-pick="${n}" style="border-radius:999px; padding:8px 15px; font:600 12.5px/1 -apple-system,sans-serif; white-space:nowrap; cursor:pointer; border:1px solid ${bd}; background:${bg}; color:${fg};">${esc(sc.label)}</span>`;
  }).join('');

  fit();
  if (i === 2) runIntro(); else stopIntro();
}

// Recolour a tab's svg strokes + its label.
function tint(tab, col) {
  if (!tab) return;
  tab.querySelectorAll('svg [stroke]').forEach((el) => el.setAttribute('stroke', col));
  const label = tab.querySelector('span:not([style*="position:absolute"])') || tab.querySelector('span:last-child');
  tab.querySelectorAll('span').forEach((sp) => {
    if (sp.childElementCount === 0 && sp.textContent && !/^\d+$/.test(sp.textContent.trim())) sp.style.color = col;
  });
}

// ── Phone scaling: the device is scaled to fit the viewport HEIGHT so the whole
//    phone is visible at once (wide layout); on narrow/stacked layouts it scales
//    to the column width instead. The wrap takes the scaled box so the grid centres it. ──
function fit() {
  const scaler = $('phoneScaler'), wrap = $('phoneWrap');
  if (!scaler || !wrap) return;
  const wide = window.innerWidth > 1040;
  // Wide: fit the viewport height AND leave both side columns at least 300px (plus gaps/padding),
  // so the three-column stage never crushes the annotations between ~1040px and ~1400px.
  const roomForPhone = window.innerWidth - (2 * 300) - (2 * 36) - (2 * 44);
  const scale = wide
    ? Math.max(0.55, Math.min(1, (window.innerHeight - 40) / 868, roomForPhone / 410))
    : Math.min(1, (window.innerWidth - 56) / 410);
  scaler.style.transform = 'scale(' + scale + ')';
  wrap.style.width = (410 * scale) + 'px';
  wrap.style.height = (868 * scale) + 'px';
}

// ── Self-typing trust intro (Trust screen only) ─────────────────────────────
let typer = null, looper = null;
function runIntro() {
  const el = $('introText'), chips = $('introChips');
  if (!el) return;
  el.textContent = '';
  if (chips) { chips.style.opacity = '0'; chips.style.transform = 'translateY(7px)'; }
  let i = 0;
  stopIntro();
  typer = setInterval(() => {
    i += 3;
    el.textContent = INTRO.slice(0, i);
    if (i >= INTRO.length) {
      clearInterval(typer); typer = null;
      if (chips) {
        chips.style.transition = 'opacity 520ms ease-out, transform 520ms cubic-bezier(0.16,0.84,0.24,1)';
        chips.style.opacity = '1';
        chips.style.transform = 'translateY(0)';
      }
      looper = setTimeout(() => { if (current === 2) runIntro(); }, 7000);
    }
  }, 16);
}
function stopIntro() { if (typer) { clearInterval(typer); typer = null; } if (looper) { clearTimeout(looper); looper = null; } }

// ── Slide-to-accept (Requests screen) ───────────────────────────────────────
let drag = null, currentX = 0, committed = false;
function maxTravel() { const t = $('track'); return t ? Math.max(60, t.clientWidth - 56) : 240; }
function paint(p, x) {
  const k = $('knob'), f = $('fill'), l = $('label');
  if (k) k.style.transform = 'translateX(' + x + 'px)';
  if (f) f.style.transform = 'scaleX(' + p + ')';
  if (l) l.style.opacity = String(Math.max(0, 1 - p * 1.6));
}
function onKnobDown(e) {
  const k = $('knob');
  if (!k || committed) return;
  drag = { startX: e.clientX, base: currentX || 0 };
  k.style.transition = 'none';
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  e.preventDefault();
}
function onMove(e) {
  if (!drag) return;
  const max = maxTravel();
  const raw = Math.max(0, Math.min(max, drag.base + (e.clientX - drag.startX)));
  const eased = max * Math.pow(raw / max, 1.35);
  currentX = eased;
  paint(eased / max, eased);
}
function onUp() {
  window.removeEventListener('pointermove', onMove);
  window.removeEventListener('pointerup', onUp);
  const k = $('knob'), f = $('fill'), l = $('label');
  if (!k) return;
  k.style.transition = 'transform 380ms cubic-bezier(0.16,0.84,0.24,1)';
  if (f) f.style.transition = 'transform 380ms cubic-bezier(0.16,0.84,0.24,1)';
  const max = maxTravel();
  if ((currentX || 0) / max > 0.86) {
    committed = true; currentX = max; paint(1, max);
    if (f) f.style.background = '#17A589';
    if (l) { l.textContent = 'Yes — Maia’s in'; l.style.color = '#FFFFFF'; l.style.opacity = '1'; }
    setTimeout(() => {
      committed = false; currentX = 0;
      if (f) f.style.background = '#E7F4F0';
      if (l) { l.textContent = 'Slide to say yes'; l.style.color = '#4B5563'; }
      paint(0, 0);
    }, 2400);
  } else { currentX = 0; paint(0, 0); }
  drag = null;
}

// ── Scroll reveals ──────────────────────────────────────────────────────────
let io = null, rvSafety = null;
function armReveals() {
  const root = $('root');
  if (!root) return;
  if (io) { io.disconnect(); io = null; }
  const items = root.querySelectorAll('[data-rv]');
  const show = (el) => {
    const order = parseInt(el.getAttribute('data-rv'), 10) || 0;
    el.dataset.rvDone = '1';
    el.style.transitionDelay = ((order % 10) * 110) + 'ms';
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.filter = el.dataset.baseFilter || 'none';
  };
  if (!window.IntersectionObserver) { items.forEach(show); return; }

  const pending = [];
  items.forEach((el) => {
    if (el.dataset.rvDone === '1') return;
    if (el.dataset.baseFilter === undefined) el.dataset.baseFilter = el.style.filter || '';
    const base = el.dataset.baseFilter;
    el.style.opacity = '0';
    el.style.transform = 'translateY(34px) scale(0.985)';
    el.style.filter = (base ? base + ' ' : '') + 'blur(6px)';
    el.style.transition = 'opacity 1150ms cubic-bezier(0.16,0.84,0.24,1), transform 1150ms cubic-bezier(0.16,0.84,0.24,1), filter 900ms ease-out';
    el.style.willChange = 'opacity, transform';
    pending.push(el);
  });
  if (!pending.length) return;

  io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      show(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  pending.forEach((el) => io.observe(el));

  requestAnimationFrame(() => {
    pending.forEach((el) => {
      if (el.dataset.rvDone === '1') return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) { show(el); if (io) io.unobserve(el); }
    });
  });
  clearTimeout(rvSafety);
  const nearFold = pending.filter((el) => el.getBoundingClientRect().top < window.innerHeight * 1.2);
  if (nearFold.length) {
    rvSafety = setTimeout(() => { nearFold.forEach((el) => { if (el.dataset.rvDone !== '1') show(el); }); }, 2500);
  }
}

// ── Wire it up (scoped to #root so the mobile tree on the same page is never touched) ──
document.addEventListener('click', (e) => {
  const goto = e.target.closest('#root [data-goto]');
  if (goto) { render(parseInt(goto.getAttribute('data-goto'), 10)); return; }
  const pick = e.target.closest('#root [data-pick]');
  if (pick) { render(parseInt(pick.getAttribute('data-pick'), 10)); return; }
  if (e.target.closest('#navPrev')) { render((current - 1 + SCREENS.length) % SCREENS.length); return; }
});
document.addEventListener('pointerdown', (e) => {
  if (e.target.closest('#root #knob')) onKnobDown(e);
});
window.addEventListener('resize', fit);

// Re-fit the phone whenever the layout switches (resize/rotate across the desktop breakpoint).
window.__kikiDesktopFit = fit;
if (window.matchMedia) {
  window.matchMedia('(min-width: 768px)').addEventListener('change', () => requestAnimationFrame(fit));
}

render(0);
armReveals();

// House list screen: ticking every care item unlocks Send, the same rule the app and the API share.
document.addEventListener('click', (e) => {
  const care = e.target.closest('.hl-care');
  if (!care) return;
  const scope = care.getAttribute('data-hl');
  care.classList.toggle('on');
  const on = care.classList.contains('on');
  care.style.borderColor = on ? '#17A589' : '#ECECE8';
  care.style.background = on ? '#E7F4F0' : '#fff';
  const box = care.querySelector('.hl-box');
  box.style.background = on ? '#17A589' : 'transparent';
  box.style.borderColor = on ? '#17A589' : '#ECECE8';
  box.textContent = on ? '✓' : '';
  const all = [...document.querySelectorAll('.hl-care[data-hl="' + scope + '"]')];
  const done = all.every((c) => c.classList.contains('on'));
  const send = document.querySelector('.hl-send[data-hl="' + scope + '"]');
  const why = document.querySelector('.hl-why[data-hl="' + scope + '"]');
  if (send) send.style.background = done ? '#17A589' : '#ECECE8';
  if (why) why.textContent = done ? 'Asking doesn’t commit you to anything until you both say yes.' : 'Agree to the one thing you’d be looking after first.';
});
