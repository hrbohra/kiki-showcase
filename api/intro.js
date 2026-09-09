// Live mutual-friend intro proxy. Keeps the Gemini key server-side (Vercel env GEMINI_API_KEY)
// so it never ships in the client bundle. The app posts { prompt } and gets back { text }; the
// "AI intro · live" chip lights up only when this returns text. Zero-dependency: calls the Gemini
// REST API with global fetch, so it deploys as a function even on the static portfolio project.
//
// Set the key once:  vercel env add GEMINI_API_KEY production   (paste the value when prompted)

const MODEL = 'gemini-2.0-flash';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST only' });
    return;
  }
  const key = process.env.GEMINI_API_KEY;
  // Graceful: no key configured → tell the client to fall back to its baked intro.
  if (!key) {
    res.status(200).json({ text: '', live: false });
    return;
  }
  try {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
    const prompt = String(body?.prompt ?? '').slice(0, 8000);
    if (!prompt) { res.status(200).json({ text: '', live: false }); return; }

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 400 },
        }),
      },
    );
    const data = await r.json();
    const text = (data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '').trim();
    res.status(200).json({ text });
  } catch (e) {
    res.status(200).json({ text: '', live: false, error: String(e) });
  }
}
