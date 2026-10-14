"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";
import { CONSENT_CHANGED, readConsent } from "@/components/CookieBanner";

const allowed = () => readConsent()?.choice === "all";

/**
 * Vercel Web Analytics, loaded only once the visitor accepts all cookies
 * (as the privacy policy promises). Revoking consent later stops sending events.
 */
export default function SiteAnalytics() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const sync = () => setOn(allowed());
    sync();
    window.addEventListener(CONSENT_CHANGED, sync);
    return () => window.removeEventListener(CONSENT_CHANGED, sync);
  }, []);

  if (!on) return null;
  return <Analytics beforeSend={(event) => (allowed() ? event : null)} />;
}
