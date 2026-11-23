import { notFound } from "next/navigation";
import Support from "@/components/Support";

/**
 * Dev-only preview of "Apoya a Forest" on its own, so the section can be reviewed before
 * the real details arrive in data/support.ts. Add `?apoyo=demo` (or `demo-llave`,
 * `demo-error`, `gracias`; see lib/support.ts) for the stand-in details. Production returns 404.
 */
export const metadata = { robots: { index: false } };

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <main className="pt-16">
      <Support />
    </main>
  );
}
