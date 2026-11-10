import { Link } from "react-router-dom";
import backgroundHome from "../../img/background_home.jpeg";
import backgroundProjects from "../../img/background_proyectos.png";

const collections = [
  {
    name: "Classic",
    category: "Esencial",
    description: "Una composición limpia para entradas sobrias y atemporales.",
    image: "/products/aluon-classic.jpg",
    alt: "Puerta de aluminio de líneas horizontales en una vivienda",
  },
  {
    name: "Marita",
    category: "Adaptable",
    description: "Ritmo, privacidad y luz para integrarse con la arquitectura.",
    image: "/products/aluon-marita.jpg",
    alt: "Conjunto de puerta peatonal y portón de aluminio oscuro",
  },
  {
    name: "Veneciana",
    category: "Control solar",
    description: "Lamas que regulan la luz y la intimidad sin perder presencia.",
    image: "/products/aluon-veneciana.jpg",
    alt: "Diseño de puerta de aluminio con lamas venecianas",
  },
];

const projectSteps = [
  ["01", "Descubre", "Conoce nuestras líneas, acabados y posibilidades."],
  ["02", "Define", "Comparte las medidas, necesidades e inspiración de tu proyecto."],
  ["03", "Resuelve", "Te acompañamos hasta encontrar una solución que encaje."],
];

export default function HomePage() {
  return (
    <div className="bg-[var(--aluon-paper)] text-[var(--aluon-ink)]">
      <section className="mx-auto grid min-h-[calc(100svh-116px)] w-full max-w-[1440px] bg-[var(--aluon-ink)] text-white lg:grid-cols-[.8fr_1.2fr]" aria-labelledby="home-title">
        <div className="flex flex-col justify-between px-6 py-10 sm:px-12 lg:px-16 lg:py-14">
          <div className="flex items-center justify-between text-[.65rem] font-black uppercase tracking-[.18em] text-white/55">
            <span>ALUON / 01</span>
            <span>Arquitectura en aluminio</span>
          </div>
          <div className="max-w-[570px] py-10 lg:py-0">
            <p className="eyebrow eyebrow-light">Puertas y portones de aluminio soldado</p>
            <h1 id="home-title" className="mt-7 max-w-[12ch] font-[var(--aluon-display)] text-[clamp(3.2rem,6vw,5.8rem)] font-black leading-[.9] tracking-[-.075em]">Una entrada con criterio.</h1>
            <p className="mt-8 max-w-[42ch] text-base leading-7 text-white/80 sm:text-lg">Diseñamos soluciones que protegen, ordenan y dan carácter a la arquitectura que habitas.</p>
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Link className="button button-primary" to="/servicios">Ver colecciones <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></Link>
              <Link className="border-b border-white/45 pb-2 text-[.7rem] font-black uppercase tracking-[.14em] text-white/78 transition hover:border-white hover:text-white" to="/contacto">Hablar con un especialista</Link>
            </div>
          </div>
          <p className="max-w-[28ch] text-xs leading-5 text-white/45">Fabricación especializada para proyectos residenciales y profesionales.</p>
        </div>
        <div className="relative min-h-[330px] overflow-hidden lg:min-h-0">
          <img className="absolute inset-0 h-full w-full object-cover object-center" src={backgroundHome} alt="Entrada contemporánea con solución de aluminio ALUON" fetchPriority="high" decoding="async" sizes="(min-width: 1024px) 60vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--aluon-ink)]/20 via-transparent to-black/10" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between border-t border-white/30 bg-black/25 p-5 backdrop-blur-sm sm:p-7">
            <div>
              <p className="text-[.62rem] font-black uppercase tracking-[.16em] text-white/65">Colección destacada</p>
              <p className="mt-2 font-[var(--aluon-display)] text-2xl font-black tracking-[-.04em]">Aluminio soldado</p>
            </div>
            <span className="text-xs font-bold text-white/65">01 / 03</span>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--aluon-line)] bg-[var(--aluon-white)]" aria-label="La propuesta ALUON">
        <div className="mx-auto grid w-[min(100%-3rem,1240px)] gap-8 py-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[var(--aluon-line)]">
          {[
            ["01", "Diseño", "Proporción y presencia"],
            ["02", "Materia", "Aluminio pensado para durar"],
            ["03", "Acompañamiento", "Criterio en cada decisión"],
          ].map(([number, title, text]) => (
            <div className="grid grid-cols-[42px_1fr] gap-4 sm:px-8 first:sm:pl-0 last:sm:pr-0" key={number}>
              <span className="font-[var(--aluon-display)] text-xl font-black text-[var(--aluon-red)]">{number}</span>
              <div><p className="font-[var(--aluon-display)] text-xl font-black tracking-[-.04em]">{title}</p><p className="mt-1 text-sm text-[var(--aluon-ink-soft)]">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-[min(100%-3rem,1240px)] gap-12 py-24 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:py-36" aria-labelledby="story-title">
        <div className="relative min-h-[500px] overflow-hidden bg-[var(--aluon-paper-deep)]">
          <img className="absolute inset-0 h-full w-full object-cover" src={backgroundProjects} alt="Proyecto residencial con soluciones de aluminio ALUON" loading="lazy" decoding="async" />
          <div className="absolute left-5 top-5 bg-[var(--aluon-white)] px-4 py-3 text-[.63rem] font-black uppercase tracking-[.16em] text-[var(--aluon-ink)]">La forma de llegar</div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">El detalle importa</p>
          <h2 id="story-title" className="mt-6 max-w-[11ch] font-[var(--aluon-display)] text-5xl font-black leading-[.92] tracking-[-.065em] sm:text-6xl">La primera impresión también se construye.</h2>
          <p className="mt-8 max-w-[43ch] text-base leading-7 text-[var(--aluon-ink-soft)]">Una puerta no es solo un acceso. Es el punto donde la arquitectura recibe, protege y empieza a contar quién la habita.</p>
          <Link className="text-link mt-9" to="/portfolio">Ver proyectos ALUON <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></Link>
        </div>
      </section>

      <section className="bg-[var(--aluon-ink)] py-24 text-white lg:py-32" aria-labelledby="collections-title">
        <div className="mx-auto w-[min(100%-3rem,1240px)]">
          <div className="flex flex-col justify-between gap-7 border-b border-white/20 pb-10 lg:flex-row lg:items-end">
            <div><p className="eyebrow eyebrow-light">Colecciones</p><h2 id="collections-title" className="mt-5 max-w-[13ch] font-[var(--aluon-display)] text-5xl font-black leading-[.92] tracking-[-.065em] sm:text-6xl">Encuentra tu forma de entrar.</h2></div>
            <Link className="text-link text-white" to="/servicios">Explorar todo el catálogo <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></Link>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {collections.map((collection, index) => (
              <article className="group" key={collection.name}>
                <Link to="/servicios" aria-label={`Explorar la colección ${collection.name}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#343331]">
                    <img className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" src={collection.image} alt={collection.alt} loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><span className="text-[.65rem] font-black uppercase tracking-[.16em] text-[#efc3b5]">{collection.category}</span><span className="material-symbols-outlined text-[#efc3b5]" aria-hidden="true">north_east</span></div>
                  </div>
                  <div className="border-b border-white/20 py-5"><h3 className="font-[var(--aluon-display)] text-2xl font-black tracking-[-.04em]">ALUON {collection.name}</h3><p className="mt-3 max-w-[30ch] text-sm leading-6 text-white/60">{collection.description}</p></div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(100%-3rem,1240px)] py-24 lg:py-36" aria-labelledby="journey-title">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div><p className="eyebrow">Cómo trabajamos</p><h2 id="journey-title" className="mt-6 max-w-[11ch] font-[var(--aluon-display)] text-5xl font-black leading-[.92] tracking-[-.065em] sm:text-6xl">Una decisión bien acompañada.</h2></div>
          <ol className="border-t border-[var(--aluon-line)]">
            {projectSteps.map(([number, title, text]) => (
              <li className="grid gap-4 border-b border-[var(--aluon-line)] py-7 sm:grid-cols-[52px_150px_1fr]" key={number}><span className="font-[var(--aluon-display)] text-xl font-black text-[var(--aluon-red)]">{number}</span><h3 className="font-[var(--aluon-display)] text-2xl font-black tracking-[-.04em]">{title}</h3><p className="max-w-[36ch] text-sm leading-6 text-[var(--aluon-ink-soft)]">{text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--aluon-red-dark)] px-6 py-24 text-white sm:px-12 lg:py-32" aria-labelledby="contact-title">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col justify-between gap-10 lg:flex-row lg:items-end"><div><p className="eyebrow eyebrow-light">¿Tienes un proyecto?</p><h2 id="contact-title" className="mt-6 max-w-[12ch] font-[var(--aluon-display)] text-5xl font-black leading-[.92] tracking-[-.065em] sm:text-7xl">Hablemos de tu idea.</h2></div><div className="max-w-[31ch]"><p className="text-base leading-7 text-white/75">Cuéntanos qué necesitas y te ayudaremos a encontrar la solución adecuada.</p><Link className="button button-light mt-8" to="/contacto">Contactar con ALUON <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></Link></div></div>
      </section>
    </div>
  );
}
