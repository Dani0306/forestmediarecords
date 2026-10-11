import { site } from "@/data/site";

/**
 * Sends the demo and studio booking forms to the label's inbox through Resend.
 *
 * Environment (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY  required; without it every send answers 503 and the form shows its error state
 *   FORMS_FROM      optional sender, on a domain verified in Resend
 *                   (default "Forest Media Récords <formularios@forestmediarecords.com>")
 *   FORMS_TO        optional inbox (default `site.contactEmail`)
 *
 * The visitor's email is set as reply-to, so answering the message answers them.
 */

type Kind = "demo" | "booking";
type Body = {
  kind?: Kind;
  subject?: string;
  replyTo?: string;
  fields?: [string, string][];
  /** Honeypot: hidden from people, filled by bots. */
  website?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PREFIX: Record<Kind, string> = { demo: "Demo", booking: "Reserva del estudio" };

// a light per-instance limit: 5 sends per visitor every 10 minutes
const WINDOW = 10 * 60_000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clip = (s: unknown, n: number) => String(s ?? "").trim().slice(0, n);

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // bots fill the hidden field: pretend it worked and drop it
  if (body.website) return Response.json({ ok: true });

  const kind = body.kind === "booking" ? "booking" : body.kind === "demo" ? "demo" : null;
  const replyTo = clip(body.replyTo, 200);
  const fields = Array.isArray(body.fields)
    ? body.fields
        .slice(0, 20)
        .map(([k, v]) => [clip(k, 80), clip(v, 4000)] as [string, string])
        .filter(([k]) => k)
    : [];
  if (!kind || !EMAIL.test(replyTo) || fields.length === 0) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return Response.json({ ok: false }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[contact] RESEND_API_KEY is not set; the form can't send");
    return Response.json({ ok: false }, { status: 503 });
  }

  const subject = `${PREFIX[kind]} · ${clip(body.subject, 140) || replyTo}`;
  const text = fields.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n— forestmediarecords.com`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
<p style="margin:0 0 16px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#c21e0e">${esc(PREFIX[kind])} · forestmediarecords.com</p>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${fields
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;vertical-align:top;color:#666;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("")}</table>
<p style="margin:20px 0 0;font-size:13px;color:#666">Responde a este correo para escribirle directamente.</p>
</div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.FORMS_FROM || "Forest Media Récords <formularios@forestmediarecords.com>",
      to: [process.env.FORMS_TO || site.contactEmail],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  }).catch(() => null);

  if (!res?.ok) {
    console.error("[contact] Resend refused the email", res?.status, await res?.text().catch(() => ""));
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
