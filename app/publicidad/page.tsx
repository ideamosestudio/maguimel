import InternalPage from "../components/InternalPage";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Indumentaria publicitaria | Textil Maguimel",
  description:
    "Prendas publicitarias personalizadas para marcas, eventos y promociones. Producción a medida con bordado y estampado en Buenos Aires.",
  path: "/publicidad/",
});

export default function PublicidadPage() {
  return <InternalPage category="publicidad" />;
}
