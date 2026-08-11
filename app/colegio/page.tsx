import type { Metadata } from "next";
import InternalPage from "../components/InternalPage";

export const metadata: Metadata = {
  title: "Uniformes escolares | Textil Maguimel",
  description: "Uniformes escolares personalizados para nivel inicial, primario y secundario. Dise\u00f1o, confecci\u00f3n y atenci\u00f3n a medida.",
};

export default function ColegioPage() {
  return <InternalPage category="colegio" />;
}
