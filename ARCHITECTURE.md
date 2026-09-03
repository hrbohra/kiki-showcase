# Kiki showcase — Architecture & Engineering Notes

A **static, dependency-free** web page (HTML + CSS + vanilla JS) that presents an app as design work: an interactive, to-scale phone emulator with per-screen design-decision notes, plus the real app embedded at `/app/`. No build step, no framework, no bundler. This document explains how it is put together so it can be edited or extended from zero.

---

## 1. Design goals & constraints

- **Self-contained & static** — ships as plain files; any static host serves it. No React, no build.
- **One URL, two experiences** — desktop shows the flanking-annotation emulator; phones show a full-bleed swipe experience. The switch is a CSS media query (so there is no redirect and no flash), with a manual `?view=` override.
- **The emulator is *live*, not screenshots** — the phone renders real, tappable HTML screens with a couple of genuine interactions (a self-typing intro, a slide-to-accept gesture), so the page argues "this is real and buildable," not "here are pictures."
- **Every claim is attached to a screen** — annotation cards state a problem, a decision, and the reason, and connect to the device with leader lines.

---

## 2. File map

```
index.html   The entire page. Contains BOTH trees:
               #root         → the desktop experience (hero, premise, emulator showcase, run-it)
               #mobile-root  → the mobile experience (full-bleed app + draggable sheet)
             A tiny inline <script> in <head> applies ?view= overrides before paint.
             All screen markup for both trees lives here (scr0..scr8 desktop, mScr0..mScr8 mobile).
app.js       Desktop controller. Globals are scoped by querying within #root so they never touch
             the mobile tree. Holds the SCREENS data (title, standfirst, accent, left/right notes),
             renders the picker + annotation columns, runs scroll-reveals, the self-typing intro,
             the slide-to-accept gesture, and fit() (scales the phone to the viewport height).
mobile.js    Mobile controller, scoped to #mobile-root. Holds its own SCREENS (four notes each in a
             sheet), the draggable decision sheet (position by `top`, declarative rest states),
             horizontal swipe navigation, the intro typer, and the slide-to-accept gesture.
assets/      avatars/, listings/, map/london.jpg, and generated qr-*.png.
app/         A static web export of the companion app, served at /app/ (see §7).
scripts/gen-qr.mjs   Node script (uses the `qrcode` dev dependency) to emit offline QR PNGs.
vercel.json  Static hosting: cleanUrls + long-cache headers on /assets/*.
```

---

## 3. How the two experiences coexist on one page

Both DOM trees are always present in `index.html`; CSS decides which is shown:

```css
@media (max-width: 767.98px) { #root        { display: none; } }  /* phones → mobile tree   */
@media (min-width: 768px)    { #mobile-root { display: none; } }  /* desktop/tablet → desktop */
html.force-desktop #root { display:block } html.force-desktop #mobile-root { display:none }
html.force-mobile  #mobile-root { display:block } html.force-mobile #root { display:none }
```

- The breakpoint (768px) sends iPad to the desktop layout deliberately — it has the width for flanking annotations.
- A `<head>` script reads `?view=desktop|mobile` and sets `html.force-*` **before paint**, so a manual override never flashes the wrong tree.
- `app.js` and `mobile.js` each **scope their DOM queries and event delegation to their own root** (`#root` / `#mobile-root`), so the two controllers coexist without cross-firing. Both initialise on load; the hidden one is inert.

---

## 4. Desktop controller — `app.js`

- **`SCREENS`** — an array of screen descriptors: `{ key, label, accent, title, standfirst, left:[2 notes], right:[2 notes] }`. This is the content source of truth for the desktop emulator; the phone screen *markup* lives in `index.html` as `scr0..scr8`.
- **`render(i)`** — shows `scr{i}`, fills the top-left context (counter/title/standfirst + a prev-screen link), builds the top-right screen picker, renders the four annotation cards (with leader lines and the screen's accent), tints the phone's bottom tab bar, and calls `fit()`. Screen 2 (Trust) starts the self-typing intro.
- **`fit()`** — the key layout routine. The phone is authored at a fixed 410×868 and **scaled to fit the viewport height** (`scale = min(1, (innerHeight − pad) / 868)`) on wide screens, or to the column width on narrow/stacked layouts. The scaled wrapper takes the scaled box so the CSS grid centres it. This is what makes the whole device visible at once without scrolling.
- **Interactions:** click delegation (scoped to `#root`) drives the picker, the in-phone card/tab/back taps, and the prev-screen link; a pointer handler runs the slide-to-accept knob; the self-typing intro types the paragraph then fades in provenance chips and loops.
- **Scroll-reveals:** an `IntersectionObserver` fades/rises elements marked `data-rv` as they enter view, with the standard guards (capture the authored filter once; reveal above-the-fold on the next frame; a bounded safety timeout).

## 5. Mobile controller — `mobile.js`

- Its own `SCREENS` (four notes each, shown inside the sheet). Phone screen markup is `mScr0..mScr8` in `index.html`.
- **The decision sheet** is positioned by `top` with **declarative rest states** (peek vs open via a CSS class), so an in-flight drag can set an inline `top` and clear it on release, letting the declarative position take over — no transform math with `svh` (which does not resolve inside transforms). Drag snaps open past ~45% of travel.
- **Swipe navigation** changes screen only past a horizontal threshold and when horizontal intent clearly exceeds vertical, so scrolling a screen never triggers a screen change; it is ignored while the sheet is open.
- Same self-typing intro and slide-to-accept as desktop, adapted to phone widths.

---

## 6. Adding or editing content

- **Edit a note or title:** change the relevant entry in `SCREENS` in `app.js` (desktop) and/or `mobile.js` (mobile).
- **Add a screen:** add the phone markup as `scr{n}` in `index.html` (and `mScr{n}` for mobile), add a matching `SCREENS` entry in `app.js`/`mobile.js` (the render loops over `SCREENS.length`), and wire the bottom-tab tint/goto if it maps to a tab. Keep desktop and mobile screen indices aligned.
- **Change the phone scale headroom or breakpoint:** `fit()` and the media queries in `index.html`.

---

## 7. The embedded app — `/app/`

`app/` is a **static web export of the companion app** (an Expo / react-native-web build). It is served at the `/app/` path, so the app must be exported with its base URL set to `/app` (otherwise its absolute asset URLs resolve at the site root and 404). To refresh it: rebuild the app's web export with that base URL and copy the output over `app/`. The page links to it from the "run it yourself" section and the mobile closing cards.

---

## 8. Deploy

Static. `vercel.json` sets clean URLs and asset caching; any static host works. QR PNGs are generated at authoring time by `scripts/gen-qr.mjs` (offline images — an online-only QR is a broken QR).
