/**
 * Shared copy of the Mundial de Tiraderas winners, so every visitor sees them.
 * Without the store configured it answers { configured: false } and the site keeps using localStorage only.
 *
 * Environment (Vercel → Settings → Environment Variables):
 *   KV_REST_API_URL, KV_REST_API_TOKEN   from an Upstash Redis database (Vercel Marketplace → Upstash)
 *                                         (UPSTASH_REDIS_REST_URL / _TOKEN also work)
 *   WINNERS_PASSWORD                      the admin password; required to save
 */
const STORE_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const PASSWORD = process.env.WINNERS_PASSWORD;
const KEY = "fmr-winners";
const headers = { "Cache-Control": "no-store" };

const clean = (input: unknown) => {
  const out: Record<string, string> = {};
  if (input && typeof input === "object") {
    for (const [k, v] of Object.entries(input).slice(0, 20)) {
      if (/^(qf[0-3]|sf[01]|final)$/.test(k) && typeof v === "string") out[k] = v.slice(0, 60);
    }
  }
  return out;
};

export async function GET() {
  if (!STORE_URL || !TOKEN) return Response.json({ configured: false }, { headers });
  try {
    const r = await fetch(`${STORE_URL}/get/${KEY}`, { headers: { Authorization: `Bearer ${TOKEN}` }, cache: "no-store" });
    const { result } = (await r.json()) as { result: string | null };
    return Response.json({ configured: true, winners: clean(result ? JSON.parse(result) : {}) }, { headers });
  } catch {
    return Response.json({ configured: false }, { headers });
  }
}

export async function POST(request: Request) {
  if (!STORE_URL || !TOKEN || !PASSWORD) return Response.json({ ok: false }, { status: 503 });
  let body: { password?: string; winners?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (body.password !== PASSWORD) return Response.json({ ok: false }, { status: 401 });
  const r = await fetch(`${STORE_URL}/set/${KEY}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(clean(body.winners)),
  });
  return Response.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
}
