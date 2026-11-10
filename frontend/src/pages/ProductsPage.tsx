import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiFetch } from "../shared/api/client";

type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string | null;
};

type IntentId = "pedestrian" | "gates" | "enclosures" | "home" | "professionals";
type CatalogueModel = Product & { image: string; intents: IntentId[] };

const INTENTS: { id: IntentId; label: string; image: string; alt: string }[] = [
  { id: "pedestrian", label: "Puertas peatonales", image: "/catalogue/premium-gate.jpg", alt: "Puerta peatonal integrada en un cerramiento de aluminio" },
  { id: "gates", label: "Portones", image: "/catalogue/innova-gate.jpg", alt: "Portón ALUON de lamas horizontales" },
  { id: "enclosures", label: "Cerramientos", image: "/catalogue/veneciana-enclosure.jpg", alt: "Puerta y panel de lamas venecianas" },
  { id: "home", label: "Vivienda", image: "/catalogue/confort-gate.jpg", alt: "Acceso de vivienda con puerta y portón coordinados" },
  { id: "professionals", label: "Profesionales", image: "/catalogue/inox-gate.jpg", alt: "Diseño ALUON con líneas de acero inoxidable" },
];

const EDITORIAL_MODELS: CatalogueModel[] = [
  {
    id: "aluon-premium", slug: "aluon-premium", name: "ALUON Premium",
    shortDescription: "Puerta y portón de líneas depuradas.", description: "ALUON Premium",
    imageUrl: null, image: "/catalogue/premium-gate.jpg", intents: ["pedestrian", "gates", "home", "professionals"],
  },
  {
    id: "classic-celosia", slug: "classic-celosia", name: "Classic Celosía",
    shortDescription: "Un diseño clásico con celosía decorativa.", description: "Classic Celosía",
    imageUrl: null, image: "/catalogue/classic-celosia.jpg", intents: ["pedestrian", "gates", "home", "professionals"],
  },
  {
    id: "aluon-inox", slug: "aluon-inox", name: "ALUON INOX",
    shortDescription: "Un contraste de líneas en el acceso.", description: "ALUON INOX",
    imageUrl: null, image: "/catalogue/inox-gate.jpg", intents: ["pedestrian", "gates", "home", "professionals"],
  },
  {
    id: "aluon-innova", slug: "aluon-innova", name: "ALUON INNOVA",
    shortDescription: "Lamas horizontales y composición continua.", description: "ALUON INNOVA",
    imageUrl: null, image: "/catalogue/innova-gate.jpg", intents: ["pedestrian", "gates", "home", "professionals"],
  },
  {
    id: "aluon-confort", slug: "aluon-confort", name: "ALUON CONFORT",
    shortDescription: "Puerta y portón de diseño coordinado.", description: "ALUON CONFORT",
    imageUrl: null, image: "/catalogue/confort-gate.jpg", intents: ["pedestrian", "gates", "home", "professionals"],
  },
  {
    id: "aluon-veneciana", slug: "aluon-veneciana", name: "ALUON VENECIANA",
    shortDescription: "Paneles de lamas venecianas.", description: "ALUON VENECIANA",
    imageUrl: null, image: "/catalogue/veneciana-enclosure.jpg", intents: ["pedestrian", "enclosures", "home", "professionals"],
  },
];

const FAMILY_TERMS: { family: string; terms: string[] }[] = [
  { family: "Celosías", terms: ["celosia", "celosias"] },
  { family: "Venecianas", terms: ["veneciana", "venecianas"] },
  { family: "Puertas peatonales", terms: ["puerta peatonal", "peatonal"] },
  { family: "Portones", terms: ["porton", "portones", "corredera", "abatible"] },
  { family: "Cerramientos", terms: ["cerramiento", "cerramientos", "valla", "vallado"] },
];

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-ES");
}

function textFor(product: Product) {
  return normalize(`${product.name} ${product.shortDescription} ${product.description}`);
}

function intentsFor(product: Product): IntentId[] {
  const text = textFor(product);
  if (text.includes("veneciana") || text.includes("cerramiento") || text.includes("valla")) {
    return ["enclosures", "home", "professionals"];
  }
  if (text.includes("puerta peatonal") || text.includes("peatonal")) {
    return ["pedestrian", "home", "professionals"];
  }
  if (text.includes("porton") || text.includes("corredera") || text.includes("abatible")) {
    return ["gates", "home", "professionals"];
  }
  return ["pedestrian", "gates", "enclosures", "home", "professionals"];
}

function familyFor(product: Product) {
  const text = textFor(product);
  return FAMILY_TERMS.find(({ terms }) => terms.some((term) => text.includes(term)))?.family ?? "Modelos ALUON";
}

export default function ProductsPage() {
  const [intent, setIntent] = useState<IntentId>("gates");
  const [search, setSearch] = useState("");
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => apiFetch<Product[]>("/api/public/products"),
  });

  const catalogue = useMemo<CatalogueModel[]>(() => {
    if (!productsQuery.data?.length) return EDITORIAL_MODELS;
    return productsQuery.data.map((product, index) => ({
      ...product,
      image: product.imageUrl || EDITORIAL_MODELS[index % EDITORIAL_MODELS.length].image,
      intents: intentsFor(product),
    }));
  }, [productsQuery.data]);

  const visibleModels = useMemo(() => {
    const term = normalize(search.trim());
    return catalogue.filter((product) =>
      product.intents.includes(intent) && (!term || textFor(product).includes(term)),
    );
  }, [catalogue, intent, search]);

  const activeIntent = INTENTS.find((option) => option.id === intent)!;
  const isEditorial = !productsQuery.data?.length;

  return (
    <div className="catalog-page">
      <div className="catalog-main">
        <section className="catalog-discovery" id="familias" aria-labelledby="families-title">
          <div className="catalog-heading-row">
            <div>
              <p className="catalog-eyebrow">01 / Elige una familia</p>
              <h2 id="families-title">¿Qué estás buscando?</h2>
            </div>
            <p className="catalog-step-note">Empieza por el tipo de proyecto. Después, elige un modelo.</p>
          </div>

          <div className="catalog-intents" role="group" aria-label="Familias de producto">
            {INTENTS.map((option, index) => (
              <button
                key={option.id}
                className={`catalog-intent${intent === option.id ? " is-active" : ""}`}
                type="button"
                aria-pressed={intent === option.id}
                aria-controls="catalog-models"
                onClick={() => setIntent(option.id)}
              >
                <span className="catalog-intent-image">
                  <img src={option.image} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="catalog-intent-label">
                  <span className="catalog-intent-number" aria-hidden="true">0{index + 1}</span>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="catalog-models-section" id="catalog-models" aria-labelledby="models-title">
          <div className="catalog-heading-row catalog-models-heading">
            <div>
              <p className="catalog-eyebrow">02 / Elige un modelo</p>
              <h2 id="models-title">{activeIntent.label}</h2>
            </div>
            <p className="catalog-step-note">
              {visibleModels.length} {visibleModels.length === 1 ? "modelo" : "modelos"}
            </p>
          </div>

          {(productsQuery.isError || isEditorial) && (
            <p className="catalog-api-note" role="status">
              Mostramos una selección editorial mientras el catálogo se actualiza.
              {productsQuery.isError && <button type="button" onClick={() => void productsQuery.refetch()}>Volver a cargar</button>}
            </p>
          )}

          <div className="catalog-search-row">
            <label htmlFor="catalog-search">Buscar un modelo</label>
            <input
              id="catalog-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nombre del modelo"
              autoComplete="off"
            />
          </div>

          {visibleModels.length > 0 ? (
            <div className="catalog-model-grid" aria-live="polite">
              {visibleModels.map((product, index) => (
                <article className="catalog-model" key={product.id}>
                  <div className="catalog-model-image">
                    <img
                      src={product.image}
                      alt={`${product.name}, ${familyFor(product).toLocaleLowerCase("es-ES")} de aluminio ALUON`}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                      onError={(event) => {
                        const fallback = EDITORIAL_MODELS[index % EDITORIAL_MODELS.length].image;
                        if (!event.currentTarget.src.endsWith(fallback)) event.currentTarget.src = fallback;
                      }}
                    />
                  </div>
                  <div className="catalog-model-content">
                    <p className="catalog-model-family">{familyFor(product)}</p>
                    <h3>{product.name}</h3>
                    <p>{isEditorial ? product.shortDescription : product.shortDescription || product.description}</p>
                    <Link className="catalog-model-link" to={`/contacto?producto=${encodeURIComponent(product.name)}`}>
                      Consultar este modelo <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="catalog-no-results" role="status">
              <p>No hay modelos con esa búsqueda.</p>
              <button type="button" onClick={() => setSearch("")}>Borrar búsqueda</button>
            </div>
          )}
        </section>

        <section className="catalog-contact" aria-labelledby="catalog-contact-title">
          <p className="catalog-eyebrow">03 / Hablemos del proyecto</p>
          <div>
            <h2 id="catalog-contact-title">¿Tienes un proyecto en mente?</h2>
            <p>Cuéntanos qué necesitas y lo vemos contigo.</p>
          </div>
          <Link className="catalog-button" to="/contacto">Contactar con ALUON</Link>
        </section>
      </div>
    </div>
  );
}
