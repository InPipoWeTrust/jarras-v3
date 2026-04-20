import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: { default: "Maderas del Sur · Jarras artesanales", template: "%s · Maderas del Sur" },
  description: "Jarras de madera con grabados láser y acero inoxidable. Diseña la tuya.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LangProvider>
          <Navbar />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
