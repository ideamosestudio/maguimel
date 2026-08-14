import type { Metadata } from "next";

type PageSeo = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: path,
      siteName: "Textil Maguimel",
      title,
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
      title,
      description,
      images: ["/og.webp"],
    },
  };
}
