import { previewState, sendForm } from "./sendForm";

/**
 * Sends a studio booking request to the label's inbox (via `/api/contact` and Resend).
 * The caller builds the label/value pairs in the visitor's language.
 * Preview the states without sending: add `?booking=sent` or `?booking=error` to the URL.
 */
export async function requestBooking(req: {
  name: string;
  email: string;
  fields: [string, string][];
  website: string;
}): Promise<{ ok: boolean }> {
  const preview = await previewState("booking");
  if (preview) return preview;
  return sendForm({ kind: "booking", subject: req.name, replyTo: req.email, fields: req.fields, website: req.website });
}
