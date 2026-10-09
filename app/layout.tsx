import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono, Saira_Stencil } from "next/font/google";
import ChatLayout from "@/components/chat/ChatLayout";
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

// The site's public address: used to resolve Open Graph / link-preview images.
const siteUrl = "https://forestmediarecords.com";

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
          <ChatLayout />
          <CookieBanner />
        </LangProvider>
      </body>
    </html>
  );
}
