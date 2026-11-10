import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiFetch } from "../shared/api/client";
import backgroundServices from "../../img/background_services.jpg";

type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string | null;
};

type IntentId = "pedestrian" | "gates" | "enclosures" | "home" | "professionals";

const INTENT_OPTIONS: { id: IntentId; label: string; hint: string }[] = [
  { id: "pedestrian", label: "Puertas peatonales", hint: "Accesos de paso" },
  { id: "gates", label: "Portones", hint: "Acceso de vehículos" },
  { id: "enclosures", label: "Cerramientos", hint: "Límites y privacidad" },
  { id: "home", label: "Vivienda", hint: "Un proyecto residencial" },
  { id: "professionals", label: "Profesionales", hint: "Arquitectura y obra" },
];

const INTENT_TERMS: Record<Exclude<IntentId, "home" | "professionals">, string[]> = {
  pedestrian: ["puerta peatonal", "puerta de paso", "peatonal", "paso peatonal"],
  gates: ["porton", "portones", "corredera", "abatible", "vehiculo", "vehicular"],
  enclosures: ["cerramiento", "cerramientos", "valla", "vallado", "celosia", "celosia", "veneciana"],
};

const FAMILY_TERMS: { name: string; terms: string[] }[] = [
  { name: "Celosías", terms: ["celosia", "celosias"] },
  { name: "Venecianas", terms: ["veneciana", "venecianas"] },
  { name: "Puertas peatonales", terms: ["puerta peatonal", "peatonal"] },
  { name: "Portones", terms: ["porton", "portones"] },
  { name: "Cerramientos", terms: ["cerramiento", "cerramientos", "vallado"] },
];

const DEFAULT_PRODUCT_IMAGE = "/products/aluon-premium.jpg";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-ES");
}

function productText(product: Product) {
  return normalize(`${product.name} ${product.shortDescription} ${product.description}`);
}

function familyFor(product: Product) {
  const text = productText(product);
  return FAMILY_TERMS.find((family) => family.terms.some((term) => text.includes(term)))?.name ?? "Otros modelos ALUON";
}

function matchesIntent(product: Product, intent: IntentId | null) {
  if (!intent || intent === "home" || intent === "professionals") return true;
  const terms = INTENT_TERMS[intent];
  const text = productText(product);
  return terms.some((term) => text.includes(term));
}

export default function ProductsPage() {
  const [intent, setIntent] = useState<IntentId | null>(null);
  const [search, setSearch] = useState("");
  const query = useQuery({
    queryKey: ["products"],
    queryFn: () => apiFetch<Product[]>("/api/public/products"),
  });

  const visibleProducts = useMemo(() => {
    const term = normalize(search.trim());
    return (query.data ?? []).filter((product) => {
      return matchesIntent(product, intent) && (!term || productText(product).includes(term));
    });
  }, [intent, query.data, search]);

  const families = useMemo(() => {
    const groups = new Map<string, Product[]>();
    for (const product of visibleProducts) {
      const family = familyFor(product);
      groups.set(family, [...(groups.get(family) ?? []), product]);
    }
    return [...groups.entries()];
  }, [visibleProducts]);

  const selectedIntent = INTENT_OPTIONS.find((option) => option.id === intent);

  return (
    <div className="catalog-page">
      <header className="catalog-hero">
        <img className="catalog-hero-image" src={backgroundServices} alt="" aria-hidden="true" />
        <div className="catalog-hero-shade" aria-hidden="true" />
        <div className="catalog-hero-content">
          <p className="catalog-kicker">ALUON · ALUMINIO SOLDADO</p>
          <h1>Accesos que dan forma a cada proyecto.</h1>
          <p className="catalog-hero-copy">
            Un catálogo de puertas, portones y cerramientos para descubrir modelos y preparar tu consulta con ALUON.
          </p>
          <a className="catalog-hero-link" href="#catalogo">
            Ver modelos <span aria-hidden="true">↓</span>
          </a>
        </div>
        <p className="catalog-hero-note" aria-hidden="true">Diseño · Aluminio · Proyecto</p>
      </header>

      <div className="catalog-main" id="catalogo">
        <section className="catalog-intro" aria-labelledby="catalog-heading">
          <div className="catalog-intro-copy">
            <p className="catalog-eyebrow">El catálogo ALUON</p>
            <h2 id="catalog-heading">Empieza por lo que necesitas resolver.</h2>
            <p>
              Consulta los modelos publicados y sus descripciones. Si ya tienes una idea, el equipo ALUON puede ayudarte a concretar el siguiente paso.
            </p>
          </div>
          <div className="catalog-intro-aside">
            <span className="catalog-aside-number" aria-hidden="true">01—05</span>
            <p>Elige una intención para acotar el catálogo o busca directamente el nombre de un modelo.</p>
          </div>
        </section>

        <section className="catalog-explorer" aria-labelledby="intent-heading">
          <div className="catalog-section-heading">
            <div>
              <p className="catalog-eyebrow">Encuentra tu punto de partida</p>
              <h2 id="intent-heading">¿Qué tipo de proyecto tienes?</h2>
            </div>
            <p className="catalog-result-count" aria-live="polite">
              {!query.isLoading && !query.isError ? `${visibleProducts.length} ${visibleProducts.length === 1 ? "modelo" : "modelos"}` : "Catálogo ALUON"}
            </p>
          </div>

          <div className="catalog-intents" aria-label="Filtrar por tipo de proyecto">
            {INTENT_OPTIONS.map((option, index) => (
              <button
                key={option.id}
                type="button"
                className={`catalog-intent${intent === option.id ? " is-active" : ""}`}
                aria-pressed={intent === option.id}
                onClick={() => setIntent((current) => current === option.id ? null : option.id)}
              >
                <span className="catalog-intent-number" aria-hidden="true">0{index + 1}</span>
                <span className="catalog-intent-label">{option.label}</span>
                <span className="catalog-intent-hint">{option.hint}</span>
              </button>
            ))}
          </div>

          <div className="catalog-search-row">
            <label className="catalog-search-label" htmlFor="catalog-search">Buscar un modelo</label>
            <div className="catalog-search-field">
              <span aria-hidden="true" className="material-symbols-outlined">search</span>
              <input
                id="catalog-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nombre o descripción"
                autoComplete="off"
              />
              {search && (
                <button className="catalog-search-clear" type="button" onClick={() => setSearch("")}>
                  Borrar búsqueda
                </button>
              )}
            </div>
          </div>
          {selectedIntent && (
            <p className="catalog-filter-note">
              {intent === "home" || intent === "professionals"
                ? `Una selección pensada para ${intent === "home" ? "vivienda" : "profesionales"}. Se muestran todos los modelos disponibles.`
                : `Modelos relacionados con ${selectedIntent.label.toLocaleLowerCase("es-ES")} según su nombre y descripción.`}
              <button type="button" onClick={() => setIntent(null)}>Ver todo el catálogo</button>
            </p>
          )}
        </section>

        {query.isLoading ? (
          <section className="catalog-loading" role="status" aria-label="Cargando modelos del catálogo">
            <p className="catalog-eyebrow">Catálogo ALUON</p>
            <p>Estamos preparando los modelos para ti.</p>
            <div className="catalog-skeletons" aria-hidden="true">
              {[0, 1, 2].map((item) => <div className="catalog-skeleton" key={item} />)}
            </div>
          </section>
        ) : query.isError ? (
          <section className="catalog-state catalog-state-error" role="alert" aria-labelledby="catalog-error-title">
            <p className="catalog-eyebrow">No se ha podido cargar</p>
            <h2 id="catalog-error-title">El catálogo no está disponible ahora.</h2>
            <p>Comprueba la conexión e inténtalo de nuevo. También puedes enviar tu consulta al equipo ALUON.</p>
            <div className="catalog-state-actions">
              <button className="catalog-button catalog-button-primary" type="button" onClick={() => void query.refetch()}>
                Volver a intentarlo
              </button>
              <Link className="catalog-text-link" to="/contacto">Contactar con ALUON</Link>
            </div>
          </section>
        ) : query.data?.length === 0 ? (
          <section className="catalog-state" role="status" aria-labelledby="catalog-empty-title">
            <p className="catalog-eyebrow">Catálogo en preparación</p>
            <h2 id="catalog-empty-title">Todavía no hay modelos publicados.</h2>
            <p>Cuéntanos qué necesitas y te orientaremos sobre el siguiente paso.</p>
            <Link className="catalog-button catalog-button-primary" to="/contacto">Consultar con ALUON</Link>
          </section>
        ) : visibleProducts.length === 0 ? (
          <section className="catalog-state catalog-state-no-results" role="status" aria-labelledby="catalog-no-results-title">
            <p className="catalog-eyebrow">Sin coincidencias</p>
            <h2 id="catalog-no-results-title">No hay modelos con esos criterios.</h2>
            <p>Prueba con otra búsqueda o vuelve al catálogo completo.</p>
            <button className="catalog-button catalog-button-secondary" type="button" onClick={() => { setSearch(""); setIntent(null); }}>
              Ver todo el catálogo
            </button>
          </section>
        ) : (
          <div className="catalog-families" aria-label="Modelos del catálogo ALUON">
            {families.map(([family, products], familyIndex) => (
              <section className="catalog-family" key={family} aria-labelledby={`family-${familyIndex}`}>
                <div className="catalog-family-heading">
                  <p className="catalog-eyebrow">Familia {String(familyIndex + 1).padStart(2, "0")}</p>
                  <h2 id={`family-${familyIndex}`}>{family}</h2>
                  <p>{products.length} {products.length === 1 ? "modelo" : "modelos"} en esta selección</p>
                </div>
                <div className="catalog-model-grid">
                  {products.map((product, productIndex) => (
                    <article className="catalog-model" key={product.id}>
                      <div className="catalog-model-image">
                        <img
                          src={product.imageUrl || DEFAULT_PRODUCT_IMAGE}
                          alt={`Modelo ${product.name} de ALUON`}
                          loading="lazy"
                          decoding="async"
                          sizes="(min-width: 1000px) 50vw, 100vw"
                          onError={(event) => {
                            if (!event.currentTarget.src.endsWith(DEFAULT_PRODUCT_IMAGE)) {
                              event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                            }
                          }}
                        />
                        <span className="catalog-model-index" aria-hidden="true">{String(productIndex + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="catalog-model-content">
                        <p className="catalog-model-meta">{family}</p>
                        <h3>{product.name}</h3>
                        <p className="catalog-model-summary">{product.shortDescription}</p>
                        <dl className="catalog-model-details">
                          <div>
                            <dt>Aplicación</dt>
                            <dd>{selectedIntent?.label ?? family}</dd>
                          </div>
                          <div>
                            <dt>Rasgo destacado</dt>
                            <dd>{product.description}</dd>
                          </div>
                        </dl>
                        <Link className="catalog-model-link" to={`/contacto?producto=${encodeURIComponent(product.name)}`}>
                          Consultar este modelo <span aria-hidden="true">↗</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <section className="catalog-contact" aria-labelledby="catalog-contact-title">
          <p className="catalog-eyebrow">¿Tienes un proyecto en mente?</p>
          <div>
            <h2 id="catalog-contact-title">El siguiente paso es hablarlo.</h2>
            <p>Comparte tu idea con ALUON y recibe orientación para continuar.</p>
          </div>
          <Link className="catalog-button catalog-button-primary" to="/contacto">Cuéntanos tu proyecto</Link>
        </section>
      </div>
    </div>
  );
}
