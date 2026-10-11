/**
 * Posts a form to `/api/contact`, which emails it to the label (see that route).
 * `fields` are label/value pairs in the visitor's language, shown as-is in the email.
 * `website` is the honeypot field's value.
 */
export async function sendForm(payload: {
  kind: "demo" | "booking";
  subject: string;
  replyTo: string;
  fields: [string, string][];
  website?: string;
}): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

/** Preview the form states without sending: `?<param>=sent` or `?<param>=error` in the URL. */
export async function previewState(param: string): Promise<{ ok: boolean } | null> {
  const v = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get(param) : null;
  if (v !== "sent" && v !== "error") return null;
  await new Promise((r) => setTimeout(r, 900));
  return { ok: v === "sent" };
}
