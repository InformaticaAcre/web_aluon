import { Link } from "react-router-dom";
import backgroundHome from "../../img/background_home.jpeg";
import backgroundProjects from "../../img/background_proyectos.png";

const featuredProducts = [
  {
    name: "Classic",
    label: "Línea esencial",
    description: "Proporciones limpias y una presencia serena para entradas que no pasan de moda.",
    image: "/products/aluon-classic.jpg",
    alt: "Puerta de aluminio de líneas horizontales en una vivienda",
  },
  {
    name: "Marita",
    label: "Línea adaptable",
    description: "Privacidad, luz y ritmo en una solución pensada para dialogar con la arquitectura.",
    image: "/products/aluon-marita.jpg",
    alt: "Conjunto de puerta peatonal y portón de aluminio oscuro",
  },
  {
    name: "Veneciana",
    label: "Línea de control",
    description: "Lamas y textura para graduar la luz, la ventilación y la intimidad del espacio.",
    image: "/products/aluon-veneciana.jpg",
    alt: "Diseño de puerta de aluminio con lamas tipo veneciana",
  },
];

const principles = [
  { number: "01", title: "Materia", text: "Aluminio soldado y acabados elegidos para resistir el paso del tiempo." },
  { number: "02", title: "Proporción", text: "Diseños que encuentran el equilibrio entre protección, luz y presencia." },
  { number: "03", title: "Criterio", text: "Acompañamiento experto para elegir la solución adecuada a cada proyecto." },
];

export default function HomePage() {
  return (
    <div className="bg-[var(--aluon-paper)] text-[var(--aluon-ink)]">
      <section className="relative isolate min-h-[720px] overflow-hidden bg-[#292522] text-white lg:min-h-[calc(100vh-84px)]" aria-labelledby="home-title">
        <img
          className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
          src={backgroundHome}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,18,17,.94)_0%,rgba(19,18,17,.72)_40%,rgba(19,18,17,.16)_78%,rgba(19,18,17,.28)_100%)]" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[720px] w-[min(100%-3rem,1240px)] items-end pb-20 pt-28 lg:min-h-[calc(100vh-84px)] lg:pb-24">
          <div className="grid w-full items-end gap-14 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="max-w-[760px]">
              <p className="mb-7 flex items-center gap-3 text-[.68rem] font-black uppercase tracking-[.22em] text-[#efc3b5]">
                <span className="h-px w-10 bg-[#efc3b5]" aria-hidden="true" />
                Arquitectura en aluminio
              </p>
              <h1 id="home-title" className="max-w-[760px] font-[var(--aluon-display)] text-[clamp(3.5rem,8vw,7.8rem)] font-black leading-[.88] tracking-[-.075em]">
                La entrada
                <br />
                <span className="text-[#e7b5a6]">define el lugar.</span>
              </h1>
              <p className="mt-8 max-w-[44ch] text-base leading-7 text-white/75 sm:text-lg">
                Sistemas de aluminio soldados para proyectos que buscan seguridad, proporción y una presencia arquitectónica duradera.
              </p>
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link className="button button-primary" to="/servicios">
                  Explorar soluciones <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </Link>
                <Link className="inline-flex min-h-12 items-center border-b border-white/60 px-1 text-[.73rem] font-black uppercase tracking-[.14em] text-white transition hover:border-white" to="/contacto">
                  Hablemos de tu proyecto
                </Link>
              </div>
            </div>

            <aside className="hidden border-l border-white/30 pl-7 lg:block" aria-label="Principios de ALUON">
              <p className="text-[.65rem] font-black uppercase tracking-[.18em] text-white/55">El lenguaje ALUON</p>
              <p className="mt-4 font-[var(--aluon-display)] text-2xl font-black leading-tight">Menos ruido.<br />Más intención.</p>
              <p className="mt-5 text-sm leading-6 text-white/65">Diseño, fabricación y acompañamiento para que cada decisión tenga sentido.</p>
            </aside>
          </div>
        </div>
        <a className="absolute bottom-8 right-8 hidden items-center gap-3 text-[.65rem] font-black uppercase tracking-[.16em] text-white/70 transition hover:text-white sm:flex" href="#colecciones">
          Descubrir ALUON <span className="material-symbols-outlined text-base" aria-hidden="true">south</span>
        </a>
      </section>

      <section className="border-b border-[var(--aluon-line)] bg-[var(--aluon-white)]" aria-label="Compromiso ALUON">
        <div className="mx-auto grid w-[min(100%-3rem,1240px)] gap-8 py-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[var(--aluon-line)]">
          {[
            ["25+", "años de experiencia"],
            ["100%", "fabricación especializada"],
            ["01", "equipo para tu proyecto"],
          ].map(([value, label]) => (
            <div className="flex items-baseline gap-4 sm:px-8 first:sm:pl-0 last:sm:pr-0" key={label}>
              <strong className="font-[var(--aluon-display)] text-3xl font-black tracking-[-.06em] text-[var(--aluon-red)]">{value}</strong>
              <span className="text-xs font-bold uppercase tracking-[.1em] text-[var(--aluon-ink-soft)]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-[min(100%-3rem,1240px)] gap-12 py-24 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:py-36" aria-labelledby="approach-title">
        <div>
          <p className="eyebrow">Una forma de hacer</p>
          <h2 id="approach-title" className="mt-5 max-w-[12ch] font-[var(--aluon-display)] text-5xl font-black leading-[.92] tracking-[-.065em] sm:text-6xl">El detalle también protege.</h2>
          <p className="mt-8 max-w-[38ch] text-base leading-7 text-[var(--aluon-ink-soft)]">No fabricamos elementos aislados. Diseñamos cómo se siente llegar, habitar y volver a un espacio.</p>
          <Link className="text-link mt-9" to="/portfolio">Ver proyectos realizados <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></Link>
        </div>
        <div className="relative min-h-[470px]">
          <img className="absolute inset-0 h-[88%] w-[82%] object-cover" src={backgroundProjects} alt="Proyecto residencial con soluciones ALUON" loading="lazy" decoding="async" />
          <div className="absolute bottom-0 right-0 w-[62%] bg-[var(--aluon-ink)] p-7 text-white sm:p-9">
            <p className="text-[.65rem] font-black uppercase tracking-[.18em] text-[#efc3b5]">La diferencia se nota</p>
            <p className="mt-4 font-[var(--aluon-display)] text-2xl font-black leading-tight sm:text-3xl">Cuando el diseño cumple su función.</p>
          </div>
        </div>
      </section>

      <section id="colecciones" className="bg-[var(--aluon-ink)] py-24 text-white lg:py-32" aria-labelledby="collections-title">
        <div className="mx-auto w-[min(100%-3rem,1240px)]">
          <div className="flex flex-col justify-between gap-7 border-b border-white/20 pb-10 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow eyebrow-light">Colecciones ALUON</p>
              <h2 id="collections-title" className="mt-5 max-w-[14ch] font-[var(--aluon-display)] text-5xl font-black leading-[.92] tracking-[-.065em] sm:text-6xl">Elegí el carácter de tu entrada.</h2>
            </div>
            <p className="max-w-[34ch] text-sm leading-6 text-white/60">Tres maneras de empezar a imaginar tu proyecto. El resto lo definimos juntos.</p>
          </div>
          <div className="mt-12 grid gap-px bg-white/20 md:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <article className="group bg-[var(--aluon-ink)]" key={product.name}>
                <Link className="block" to="/servicios" aria-label={`Explorar colección ${product.name}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#343331]">
                    <img className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" src={product.image} alt={product.alt} loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" aria-hidden="true" />
                    <span className="absolute left-5 top-5 text-xs font-black tracking-[.15em] text-white/70">0{index + 1}</span>
                    <span className="absolute bottom-5 left-5 text-[.65rem] font-black uppercase tracking-[.16em] text-[#efc3b5]">{product.label}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/20 py-5">
                    <h3 className="font-[var(--aluon-display)] text-2xl font-black tracking-[-.04em]">ALUON {product.name}</h3>
                    <span className="material-symbols-outlined text-[#efc3b5] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">north_east</span>
                  </div>
                  <p className="max-w-[32ch] py-5 text-sm leading-6 text-white/60">{product.description}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-3rem,1240px)] py-24 lg:py-36" aria-labelledby="principles-title">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="eyebrow">Del primer boceto al último detalle</p>
            <h2 id="principles-title" className="mt-5 max-w-[11ch] font-[var(--aluon-display)] text-5xl font-black leading-[.92] tracking-[-.065em] sm:text-6xl">Un proyecto bien acompañado.</h2>
          </div>
          <ol className="border-t border-[var(--aluon-line)]">
            {principles.map((principle) => (
              <li className="grid gap-5 border-b border-[var(--aluon-line)] py-7 sm:grid-cols-[64px_160px_1fr] sm:items-start" key={principle.number}>
                <span className="font-[var(--aluon-display)] text-2xl font-black text-[var(--aluon-red)]">{principle.number}</span>
                <h3 className="font-[var(--aluon-display)] text-2xl font-black tracking-[-.04em]">{principle.title}</h3>
                <p className="max-w-[38ch] text-sm leading-6 text-[var(--aluon-ink-soft)]">{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[var(--aluon-red-dark)] py-24 text-white lg:py-32" aria-labelledby="contact-title">
        <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(circle_at_center,rgba(239,195,181,.24),transparent_62%)]" aria-hidden="true" />
        <div className="mx-auto flex w-[min(100%-3rem,1240px)] flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow eyebrow-light">Tu proyecto empieza acá</p>
            <h2 id="contact-title" className="mt-5 max-w-[12ch] font-[var(--aluon-display)] text-5xl font-black leading-[.92] tracking-[-.065em] sm:text-7xl">Hablemos de lo que querés construir.</h2>
          </div>
          <div className="max-w-[31ch] lg:pb-2">
            <p className="text-base leading-7 text-white/75">Compartí una idea, una medida o una imagen. Te ayudamos a encontrar una solución con criterio.</p>
            <Link className="button button-light mt-8" to="/contacto">Iniciar conversación <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
