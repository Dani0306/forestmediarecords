import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad — Forest Media Récords",
  description: "Cómo Forest Media Récords recoge, usa y protege tus datos personales.",
};

export default function Page() {
  return <LegalPage doc="privacy" />;
}
