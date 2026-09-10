// Live mutual-friend intro proxy. Keeps the Gemini key server-side (Vercel env GEMINI_API_KEY)
// so it never ships in the client bundle. The app posts { prompt } and gets back { text }.
//
// Demo resilience: the demo data is fixed, so every prompt is deterministic. We ship a cache of
// the responses from a real run (intro-cache.json, keyed by sha256 of the prompt). If Gemini is
// rate-limited or errors, we serve the cached response instead of failing — running out of quota
// never breaks the demo. If there's no cache hit either, we return empty and the app falls back
// to its own baked intro. Zero-dependency: global fetch + node:crypto.
//
// Set the key once:  vercel env add GEMINI_API_KEY production
import { createHash } from 'node:crypto';
import cache from './intro-cache.json' with { type: 'json' };

const MODEL = 'gemini-3.6-flash';
const hash = (s) => createHash('sha256').update(s).digest('hex');

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const prompt = String(body?.prompt ?? '').slice(0, 8000);
  if (!prompt) { res.status(200).json({ text: '', live: false }); return; }

  const cached = cache[hash(prompt)];
  const key = process.env.GEMINI_API_KEY;

  // No key configured → serve the cached run so the demo still shows real content.
  if (!key) { res.status(200).json({ text: cached ?? '', live: false, cached: !!cached }); return; }

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.8, maxOutputTokens: 400 } }),
      },
    );
    if (!r.ok) {
      // Rate-limited (429) or any API error → fall back to the cached run.
      res.status(200).json({ text: cached ?? '', live: false, cached: !!cached });
      return;
    }
    const data = await r.json();
    const text = (data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '').trim();
    if (text) { res.status(200).json({ text, live: true }); return; }
    res.status(200).json({ text: cached ?? '', live: false, cached: !!cached });
  } catch {
    res.status(200).json({ text: cached ?? '', live: false, cached: !!cached });
  }
}
