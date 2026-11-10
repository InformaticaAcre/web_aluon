import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../shared/api/client";
import PageHero from "../shared/ui/PageHero";
import backgroundServices from "../../img/background_services.jpg";

type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string | null;
};

export default function ProductsPage() {
  const q = useQuery({
    queryKey: ["products"],
    queryFn: () => apiFetch<Product[]>("/api/public/products"),
  });
  const data = q.data ?? [];

  return (
    <div className="bg-slate-50 text-slate-900 overflow-x-hidden">
      <PageHero
        backgroundSrc={backgroundServices}
        titleLine1="Catálogo de"
        titleHighlight="Productos"
        subtitle="Selección de modelos y soluciones ALUON disponibles desde el catálogo."
      />

      <div className="max-w-7xl mx-auto px-6 -mt-10 sm:-mt-14 lg:-mt-16 relative z-10 pb-14">
        <header className="rounded-3xl bg-white p-8 sm:p-10 shadow-soft border border-slate-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">Explorar catálogo</h2>
          <p className="mt-2 text-slate-600 max-w-2xl">Catálogo gestionado desde el backend (PostgreSQL / Flyway).</p>
        </header>

        {q.isLoading ? (
          <div className="mt-10 text-slate-600">Cargando productos…</div>
        ) : q.isError ? (
          <div className="mt-10 rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
            No se han podido cargar los productos. Revisa la conexión con el backend.
          </div>
        ) : data.length === 0 ? (
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-600">
            Aún no hay productos publicados.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((p) => (
              <article key={p.id} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
                <div className="mb-6 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 aspect-[16/9]">
                  <img
                    alt={p.name}
                    className="h-full w-full object-cover object-center"
                    src={p.imageUrl ?? DEFAULT_PRODUCT_IMAGE}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 340px, (min-width: 768px) 45vw, 100vw"
                  />
                </div>
                <h2 className="text-xl font-extrabold tracking-tight">{p.name}</h2>
                <p className="mt-2 text-slate-600 leading-relaxed">{p.shortDescription}</p>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed">{p.description}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const DEFAULT_PRODUCT_IMAGE = "/products/aluon-premium.jpg";
