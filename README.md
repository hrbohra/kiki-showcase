# Kiki — design-decisions showcase

A single, self-contained static web page that presents the Kiki app as a **body of design work**: a life-size, *interactive* phone emulator with the reasoning behind every screen shown as annotation cards, plus a link to the real app running in the browser.

Zero build, zero framework — plain HTML/CSS/vanilla JS, deployable as static files. The real app it documents is embedded at **`/app/`** (a static web export of the companion app).

## What's on the page

1. **Hero + premise** — the product thesis and the four things the build rests on.
2. **The emulator (centrepiece)** — a to-scale iPhone that renders nine app screens (Explore, Map, Trust, Onboarding-cost, Requests, Community, Trips, Messages, Me). Each screen is live and tappable (a self-typing trust intro, a slide-to-accept gesture, working tabs), and is flanked by four **design-decision notes** (problem → decision → reason) joined to the device by leader lines. The phone scales to the viewport height so the whole device is visible at once; navigation lives in the top corners.
3. **Run it yourself** — routes to the app in the browser (`/app/`) and, when available, Expo Go.

## Responsive behaviour (one URL, no redirect)

- **≥ 768px (desktop / tablet, incl. iPad):** the flanking-annotation emulator above.
- **< 768px (phone):** a purpose-built mobile experience — full-bleed app with a **draggable decision sheet** and horizontal swipe between screens.
- A media query decides before paint (no flash), re-evaluated on rotate. A manual override is available and linked both ways: `?view=desktop` / `?view=mobile`.

## Files

```
index.html          The whole page: both the desktop tree (#root) and the mobile tree (#mobile-root).
app.js              Desktop showcase controller (IIFE-free globals scoped to #root): screen data +
                    notes, the picker, scroll-reveals, the self-typing intro, slide-to-accept,
                    and the fit-to-viewport-height phone scaler.
mobile.js           Mobile controller (scoped to #mobile-root): the draggable sheet, swipe nav,
                    the same nine screens + notes.
assets/             Avatars, listing photos, the map basemap, and generated QR PNGs.
app/                A static web export of the companion app (served at /app/).
scripts/gen-qr.mjs  Regenerates the offline QR PNGs.
vercel.json         Static hosting config (clean URLs, asset caching).
```

See **`ARCHITECTURE.md`** for how the two controllers coexist on one page, how the emulator scales, and how to add or edit screens and notes.

## Develop & deploy

It is static — open `index.html` in a browser, or serve the folder with any static server. Deploy the folder as-is to any static host (configured here for Vercel).

Regenerate QR codes:

```bash
node scripts/gen-qr.mjs "<web-app-url>" "<expo-url>"
```

Refresh the embedded app after rebuilding it:

```bash
# in the companion app repo, export web with base URL /app, then:
cp -r <app>/dist-web ./app
```
