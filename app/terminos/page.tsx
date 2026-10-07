import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Términos y condiciones — Forest Media Récords",
  description: "Condiciones de uso del sitio, envío de demos y reservas del estudio de Forest Media Récords.",
};

export default function Page() {
  return <LegalPage doc="terms" />;
}
