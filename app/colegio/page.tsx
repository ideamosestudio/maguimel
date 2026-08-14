import InternalPage from "../components/InternalPage";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Uniformes escolares a medida | Textil Maguimel",
  description:
    "Fabricamos uniformes escolares personalizados para nivel inicial, primario y secundario en Zona Oeste. Diseño, confección y atención a medida.",
  path: "/colegio/",
});

export default function ColegioPage() {
  return <InternalPage category="colegio" />;
}
