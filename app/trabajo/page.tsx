import type { Metadata } from "next";
import InternalPage from "../components/InternalPage";

export const metadata: Metadata = {
  title: "Indumentaria de trabajo | Textil Maguimel",
  description: "Uniformes laborales y corporativos funcionales, c\u00f3modos y personalizados para empresas, industria, salud y servicios.",
};

export default function TrabajoPage() {
  return <InternalPage category="trabajo" />;
}
