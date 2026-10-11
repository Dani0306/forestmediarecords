import { site } from "@/data/site";

export type BookingResult = { ok: true; via: "mailto" | "api" } | { ok: false };

/**
 * Sends a studio booking request.
 *
 * Hands the request to the visitor's email app, addressed to the label's
 * contact email (same as the demo form). The caller builds the subject and
 * the body lines in the visitor's language.
 *
 * TODO: replace the mailto hand-off with a real endpoint (an API route, a
 * calendar or a form service) and return `{ ok: true, via: "api" }` / `{ ok: false }`.
 *
 * Preview the states without sending: add `?booking=sent` or `?booking=error` to the URL.
 */
export async function requestBooking(subject: string, lines: string[]): Promise<BookingResult> {
  const preview =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("booking")
      : null;
  if (preview === "error" || preview === "sent") {
    await new Promise((r) => setTimeout(r, 900));
    return preview === "error" ? { ok: false } : { ok: true, via: "api" };
  }

  try {
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    return { ok: true, via: "mailto" };
  } catch {
    return { ok: false };
  }
}
