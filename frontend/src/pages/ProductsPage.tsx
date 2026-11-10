import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
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
    <div className="catalog-page">
      <PageHero
        backgroundSrc={backgroundServices}
        titleLine1="Catálogo de"
        titleHighlight="Productos"
        subtitle="Selección de modelos y soluciones ALUON disponibles desde el catálogo."
      />

      <main className="catalog-main">
        <section className="catalog-intro" aria-labelledby="catalog-title">
          <div>
            <p className="catalog-eyebrow">Encontrá tu punto de partida</p>
            <h2 id="catalog-title">Explorá las soluciones ALUON</h2>
            <p className="catalog-lede">
              Mirá los modelos publicados y contanos qué necesitás. Te ayudamos a definir la solución para tu espacio.
            </p>
          </div>
          <ol className="journey-guide" aria-label="Cómo solicitar asesoramiento">
            <li className="journey-step">
              <span aria-hidden="true">01</span>
              <div><strong>Explorá</strong><p>Compará estilos y detalles.</p></div>
            </li>
            <li className="journey-step">
              <span aria-hidden="true">02</span>
              <div><strong>Contanos</strong><p>Compartí tu idea y medidas.</p></div>
            </li>
            <li className="journey-step">
              <span aria-hidden="true">03</span>
              <div><strong>Recibí orientación</strong><p>ALUON revisa tu consulta.</p></div>
            </li>
          </ol>
        </section>

        {q.isLoading ? (
          <div className="catalog-state" role="status">Cargando productos…</div>
        ) : q.isError ? (
          <div className="catalog-state catalog-state-error" role="alert">
            No se han podido cargar los productos. Revisa la conexión con el backend.
          </div>
        ) : data.length === 0 ? (
          <div className="catalog-state catalog-state-empty" role="status">
            <h3>Aún no hay productos publicados.</h3>
            <p>Si ya tenés una idea para tu espacio, podemos ayudarte a definirla.</p>
            <Link className="button button-primary" to="/contacto">Contanos tu proyecto</Link>
          </div>
        ) : (
          <section className="catalog-grid" aria-label="Productos disponibles">
            {data.map((p, index) => (
              <article key={p.id} className="catalog-card">
                <div className="catalog-card-image">
                  <img
                    alt={p.name}
                    className="h-full w-full object-cover object-center"
                    src={p.imageUrl ?? DEFAULT_PRODUCT_IMAGE}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 340px, (min-width: 768px) 45vw, 100vw"
                  />
                  <span className="catalog-card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="catalog-card-content">
                  <p className="catalog-eyebrow">Colección ALUON</p>
                  <h3>{p.name}</h3>
                  <p className="catalog-card-summary">{p.shortDescription}</p>
                  <p className="catalog-card-detail">{p.description}</p>
                  <Link className="text-link" to={`/contacto?producto=${encodeURIComponent(p.name)}`}>
                    Consultar este modelo <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
        <div className="catalog-footer-cta">
          <p>¿No sabés qué modelo elegir?</p>
          <Link className="button button-primary" to="/contacto">Hablemos de tu proyecto</Link>
        </div>
      </main>
    </div>
  );
}

const DEFAULT_PRODUCT_IMAGE = "/products/aluon-premium.jpg";
