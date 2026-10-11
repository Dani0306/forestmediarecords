import { previewState, sendForm } from "./sendForm";

export type DemoPayload = {
  name: string;
  email: string;
  city: string;
  link: string;
  message: string;
  /** Honeypot value. */
  website: string;
};

/**
 * Sends a demo submission to the label's inbox (via `/api/contact` and Resend).
 * Preview the states without sending: add `?demo=sent` or `?demo=error` to the URL.
 */
export async function sendDemo(
  p: DemoPayload,
  labels: { name: string; email: string; city: string; link: string; message: string },
): Promise<{ ok: boolean }> {
  const preview = await previewState("demo");
  if (preview) return preview;
  const fields: [string, string][] = [
    [labels.name, p.name],
    [labels.email, p.email],
  ];
  if (p.city) fields.push([labels.city, p.city]);
  fields.push([labels.link, p.link]);
  if (p.message) fields.push([labels.message, p.message]);
  return sendForm({ kind: "demo", subject: p.name, replyTo: p.email, fields, website: p.website });
}
