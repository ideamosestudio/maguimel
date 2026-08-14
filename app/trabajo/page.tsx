import InternalPage from "../components/InternalPage";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Ropa de trabajo para empresas | Textil Maguimel",
  description:
    "Fabricamos ropa de trabajo y uniformes corporativos personalizados para industria, salud, logística, comercios y servicios en Buenos Aires.",
  path: "/trabajo/",
});

export default function TrabajoPage() {
  return <InternalPage category="trabajo" />;
}
