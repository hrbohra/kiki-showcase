// Generate the two QR PNGs at build time (offline — an online-only QR is a broken QR).
// Usage: node scripts/gen-qr.mjs <webUrl> <expoUrl>
// Falls back to placeholders so the page never ships a 404.
import QRCode from 'qrcode';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'assets');

const webUrl = process.argv[2] || 'https://kiki-portfolio.vercel.app/app/';
const expoUrl = process.argv[3] || 'https://expo.dev/';

const opts = { margin: 1, width: 300, color: { dark: '#12211D', light: '#F6F5F1' } };

await QRCode.toFile(join(out, 'qr-web.png'), webUrl, opts);
await QRCode.toFile(join(out, 'qr-expo.png'), expoUrl, opts);
console.log('QR codes written:\n  web  →', webUrl, '\n  expo →', expoUrl);
