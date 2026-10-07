import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono, Saira_Stencil } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

const stencil = Saira_Stencil({
  variable: "--font-saira-stencil",
  subsets: ["latin"],
  axes: ["wdth"],
  adjustFontFallback: false,
});

const mono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
  axes: ["wdth"],
});

const sans = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

// Until the custom domain exists, resolve Open Graph images against the Vercel URL.
// TODO: set the real domain here once it's bought (see docs/Decisions/Deploy on Vercel).
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Forest Media Récords — Forjamos artistas emergentes en Medellín",
  description:
    "Forest Media Récords es una compañía musical de Medellín dedicada a desarrollar artistas emergentes. Agenda de conciertos, streams en Kick, showcases y lanzamientos.",
  openGraph: {
    title: "Forest Media Récords",
    description: "Forjamos artistas emergentes en Medellín. Con el apoyo de Kick.",
    images: ["/logo.png"],
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${stencil.variable} ${mono.variable} ${sans.variable} antialiased`}>
      <body>
        <LangProvider>
          {children}
          <CookieBanner />
        </LangProvider>
      </body>
    </html>
  );
}
