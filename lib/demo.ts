import { site } from "@/data/site";

export type DemoPayload = {
  name: string;
  email: string;
  city: string;
  link: string;
  message: string;
};

export type DemoResult = { ok: true; via: "mailto" | "api" } | { ok: false };

/**
 * Sends a demo submission.
 *
 * TODO: replace the mailto hand-off with a real endpoint (an API route or a
 * form service) and return `{ ok: true, via: "api" }` / `{ ok: false }` from
 * its response. The form already shows sending, thanks and error states.
 *
 * Preview the states without sending: add `?demo=sent` or `?demo=error` to the URL.
 */
export async function sendDemo(
  p: DemoPayload,
  labels: { subject: string; name: string; email: string; city: string; link: string },
): Promise<DemoResult> {
  const preview =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("demo")
      : null;
  if (preview === "error") {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: false };
  }
  if (preview === "sent") {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, via: "api" };
  }

  try {
    const lines = [`${labels.name}: ${p.name}`, `${labels.email}: ${p.email}`];
    if (p.city) lines.push(`${labels.city}: ${p.city}`);
    lines.push(`${labels.link}: ${p.link}`);
    if (p.message) lines.push("", p.message);
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
      `${labels.subject} · ${p.name}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    return { ok: true, via: "mailto" };
  } catch {
    return { ok: false };
  }
}
