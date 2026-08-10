import type { Metadata } from "next";
import { Montserrat, Oswald, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["300", "400", "700"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: ["500", "700"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ideamosestudio.github.io/maguimel/"),
  title: "Textil Maguimel | Uniformes para colegios y empresas",
  description: "Uniformes escolares, indumentaria de trabajo y prendas publicitarias a medida en Ramos Mejía.",
  openGraph: {
    title: "Textil Maguimel | Uniformes para colegios y empresas",
    description: "Uniformes escolares, laborales y publicitarios con producción a medida.",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Textil Maguimel",
    description: "Indumentaria para colegios y empresas.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${roboto.variable} ${oswald.variable} ${montserrat.variable}`}>{children}</body>
    </html>
  );
}
