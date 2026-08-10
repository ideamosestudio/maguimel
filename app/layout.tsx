import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-body", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ideamosestudio.github.io/textil-maguimel/"),
  title: "Textil Maguimel | Uniformes para colegios y empresas",
  description: "Uniformes escolares, indumentaria de trabajo y prendas publicitarias a medida en Ramos Mejía.",
  openGraph: {
    title: "Textil Maguimel | Uniformes para colegios y empresas",
    description: "Uniformes escolares, laborales y publicitarios con producción a medida.",
    images: [{ url: "og.png", width: 1200, height: 630, alt: "Textil Maguimel" }],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Textil Maguimel",
    description: "Indumentaria para colegios y empresas.",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${space.variable}`}>{children}</body>
    </html>
  );
}
