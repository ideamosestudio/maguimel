import type { Metadata } from "next";
import { Montserrat, Oswald, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["300", "400", "700"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: ["500", "700"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["500", "600"] });

const siteUrl = "https://textilmaguimel.com.ar";
const description =
  "Fabricamos uniformes escolares, ropa de trabajo e indumentaria publicitaria a medida en Ramos Mejía. Más de 40 años y envíos a todo el país.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": siteUrl + "/#website",
      url: siteUrl + "/",
      name: "Textil Maguimel",
      description,
      inLanguage: "es-AR",
      publisher: { "@id": siteUrl + "/#business" },
    },
    {
      "@type": "LocalBusiness",
      "@id": siteUrl + "/#business",
      name: "Textil Maguimel",
      url: siteUrl + "/",
      logo: siteUrl + "/images/logo-maguimel.webp",
      image: siteUrl + "/og.webp",
      description,
      telephone: "+54 11 4464-4647",
      email: "textilmaguimel@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "French 150",
        addressLocality: "Ramos Mejía",
        addressRegion: "Buenos Aires",
        addressCountry: "AR",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Buenos Aires" },
        { "@type": "Country", name: "Argentina" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "13:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "15:00",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/textilmaguimel/",
        "https://www.facebook.com/textilmaguimel.uniformes/",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Líneas de indumentaria",
        itemListElement: [
          { "@type": "OfferCatalog", name: "Uniformes escolares" },
          { "@type": "OfferCatalog", name: "Indumentaria publicitaria" },
          { "@type": "OfferCatalog", name: "Indumentaria de trabajo" },
        ],
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Uniformes escolares y de trabajo | Textil Maguimel",
  description,
  applicationName: "Textil Maguimel",
  keywords: [
    "uniformes escolares",
    "ropa de trabajo",
    "indumentaria laboral",
    "indumentaria publicitaria",
    "uniformes personalizados",
    "uniformes para empresas",
    "Ramos Mejía",
    "Zona Oeste",
    "Buenos Aires",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Textil Maguimel",
    title: "Uniformes escolares y de trabajo | Textil Maguimel",
    description,
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Textil Maguimel, uniformes para colegios y empresas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uniformes escolares y de trabajo | Textil Maguimel",
    description,
    images: ["/og.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "geo.region": "AR-B",
    "geo.placename": "Ramos Mejía",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body className={`${roboto.variable} ${oswald.variable} ${montserrat.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
