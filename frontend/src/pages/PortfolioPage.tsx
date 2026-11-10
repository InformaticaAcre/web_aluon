import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../shared/api/client";
import { Link } from "react-router-dom";
import PageHero from "../shared/ui/PageHero";
import backgroundProyectos from "../../img/background_proyectos.png";
import backgroundPortfolio from "../../img/background_portfolio.jpg";

type Item = {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string | null;
};

export default function PortfolioPage() {
  const q = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => apiFetch<Item[]>("/api/public/portfolio"),
  });
  const data = q.data ?? [];
  const featured = data[0];
  const secondary = data[1];

  return (
    <div className="bg-white text-slate-900 selection:bg-rose-600 selection:text-white">
      <main className="pb-20">
        <PageHero
          backgroundSrc={backgroundProyectos}
          titleLine1="Proyectos"
          titleHighlight="Industriales"
          subtitle="Explora nuestra trayectoria en cerramientos de alta seguridad y diseño clásico. Innovación técnica aplicada a la arquitectura metálica desde 1986."
          align="left"
          overlayClassName="bg-slate-950/35"
        />

        <header className="max-w-7xl mx-auto px-6 -mt-10 sm:-mt-14 lg:-mt-16 relative z-10 mb-16">
          <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-soft border border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-rose-600 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 block">
                Excelencia en Aluminio Soldado
              </span>
              <p className="text-slate-600 leading-relaxed font-light">
                Selección de proyectos y modelos destacados. Catálogo visual conectado al backend.
              </p>
              {q.isError ? (
                <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
                  No se han podido cargar los proyectos. Revisa la conexión con el backend.
                </div>
              ) : null}
            </div>
            <div className="flex items-center space-x-6 border-l border-slate-200 pl-8 py-4">
              <div className="text-5xl font-extrabold text-slate-950 tracking-tighter">{Math.max(150, data.length)}+</div>
              <div className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-slate-500 leading-tight">
                Proyectos
                <br />
                Finalizados
              </div>
            </div>
          </div>
        </header>

        {/* Featured Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.4em] text-slate-400">Instalaciones destacadas</h2>
            <div className="h-px w-24 bg-slate-200" />
          </div>

          {q.isLoading ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-slate-700">Cargando portfolio…</div>
          ) : data.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-700">
              Aún no hay proyectos publicados.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
              {/* Bento Item 1 */}
              <div className="md:col-span-12 group relative overflow-hidden bg-slate-100 aspect-[21/9]">
                <img
                  alt={featured?.title ?? "Instalación destacada"}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-1000"
                  src={featured?.imageUrl ?? backgroundPortfolio}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 768px) 1100px, 100vw"
                />
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"
                  style={{ backgroundImage: `url(${backgroundPortfolio})` }}
                  aria-hidden="true"
                />
                <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 pointer-events-none">
                  <span className="inline-block bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-[0.3em] px-4 py-1 mb-4">
                    {featured?.category ?? "Línea Classic"}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tighter">
                    {featured?.title ?? "Classic Celosía"}
                  </h3>
                  <p className="text-white/80 text-sm mt-2 max-w-sm font-light">
                    {featured?.description ?? "Capacidad de ornamentar con un diseño clásico sobre sistemas de aluminio soldado."}
                  </p>
                </div>
              </div>

              {/* Bento Item 2 */}
              <div className="md:col-span-6 group relative overflow-hidden bg-slate-50 flex items-center justify-center p-12">
                <div className="text-center">
                  <img
                    alt="Aluon Reasons"
                    className="w-full max-w-md mx-auto mb-8"
                    src={DEFAULT_PORTFOLIO_IMAGE_2}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 768px) 500px, 100vw"
                  />
                  <div className="h-px w-12 bg-rose-600 mx-auto mb-6" />
                  <p className="text-slate-500 text-sm font-light tracking-wide uppercase italic">Cada modelo es una razón</p>
                </div>
              </div>

              {/* Bento Item 3 */}
              <div className="md:col-span-6 grid grid-cols-2 gap-1">
                <div className="bg-slate-950 p-10 flex flex-col justify-between aspect-square">
                  <span className="material-symbols-outlined text-white text-3xl">shield</span>
                  <div>
                    <div className="text-3xl font-extrabold text-white mb-2">+35</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 leading-relaxed">
                      Años fabricando soluciones en aluminio soldado
                    </div>
                  </div>
                </div>
                <div className="bg-rose-600 p-10 flex flex-col justify-between aspect-square group cursor-pointer overflow-hidden relative">
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <span className="material-symbols-outlined text-white text-3xl">architecture</span>
                    <div>
                      <div className="text-xs font-extrabold text-white uppercase tracking-[0.2em] mb-2">Diseño</div>
                      <div className="text-xl font-extrabold text-white tracking-tight">Arquitectura a medida</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </div>
              </div>
            </div>
          )}

          {/* Secondary highlight from data (subtle, keeps functional mapping) */}
          {secondary ? (
            <div className="mt-8 flex items-start justify-between gap-6 flex-wrap">
              <div className="text-sm text-slate-600">
                Siguiente destacado: <span className="font-extrabold text-slate-950">{secondary.title}</span>{" "}
                <span className="text-slate-400">({secondary.category})</span>
              </div>
              <Link className="text-sm font-extrabold uppercase tracking-widest text-rose-600 hover:text-rose-700" to="/contacto">
                Solicitar presupuesto
              </Link>
            </div>
          ) : null}
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-950 py-24 px-8 sm:px-12 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tighter relative z-10">
              ¿Buscas un diseño exclusivo?
            </h2>
            <p className="text-white/50 max-w-xl mb-12 font-light text-lg relative z-10">
              Solicita nuestro catálogo completo de modelos y herrajes. Nuestros técnicos te asesorarán para encontrar la solución que mejor se adapte a tu espacio.
            </p>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <Link className="bg-rose-600 px-12 py-5 font-extrabold uppercase tracking-[0.2em] text-xs text-white hover:bg-rose-700 transition-all" to="/contacto">
                Solicitar presupuesto
              </Link>
              <Link className="border border-white/20 px-12 py-5 font-extrabold uppercase tracking-[0.2em] text-xs text-white hover:border-white transition-all" to="/servicios">
                Ver catálogo
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const DEFAULT_PORTFOLIO_IMAGE_2 =
  "https://lh3.googleusercontent.com/aida/ADBb0ugU7KtFYn6EFCo5h8ewFVccyW24yPxoJ6rnEANglgB-UvSUjyvRvcNxLof0vuYFlI6JNEFUBeRF8WmrZdTfgdKRjXAJiSSc6Wnf_Nooid977mRzdJJ0zP_TbIBDdyNaC3HS28x6qkHONL1pk-9PuVJc0N-XniNukcnvSh-Os2ydEYzdgKnp6CdZnro4SLjF5SPgdtJMilXiJLKRSz6DkaIrB6xLKWrgoMNYnBf3SjcGFw2Ir0psin5Ys1jEkAbzVmdGj6XkGi1zO_s";
