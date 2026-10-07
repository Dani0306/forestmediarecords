export type BookingRequest = {
  service: string;
  date: string; // YYYY-MM-DD
  slot: string;
  blocks: number;
  total: number;
  name: string;
  artist: string;
  email: string;
  phone: string;
  notes: string;
};

/**
 * Sends a studio booking request.
 *
 * TODO: design only for now. Wire this to the real booking backend (an API
 * route, a calendar or a form service) and return `{ ok }` from its response.
 * Preview the error state with `?booking=error` in the URL.
 */
export async function requestBooking(req: BookingRequest): Promise<{ ok: boolean }> {
  void req;
  await new Promise((r) => setTimeout(r, 900));
  const preview =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("booking")
      : null;
  return { ok: preview !== "error" };
}
