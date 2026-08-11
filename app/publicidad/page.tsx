import type { Metadata } from "next";
import InternalPage from "../components/InternalPage";

export const metadata: Metadata = {
  title: "Indumentaria publicitaria | Textil Maguimel",
  description: "Prendas personalizadas para marcas, eventos, promociones y equipos. Producci\u00f3n a medida con bordado y estampado.",
};

export default function PublicidadPage() {
  return <InternalPage category="publicidad" />;
}
