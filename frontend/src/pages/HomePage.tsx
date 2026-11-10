import { Link } from "react-router-dom";
import portfolioBackground from "../../img/background_portfolio.jpg";

const featuredProducts = [
  {
    name: "ALUON Classic",
    category: "Líneas limpias",
    description: "Un diseño sencillo y funcional para una entrada de carácter atemporal.",
    image: "/products/aluon-classic.jpg",
    alt: "Puerta de aluminio de líneas horizontales en una vivienda",
  },
  {
    name: "ALUON Marita",
    category: "Diseño adaptable",
    description: "Combina zonas de privacidad y detalles abiertos en una misma solución.",
    image: "/products/aluon-marita.jpg",
    alt: "Conjunto de puerta peatonal y portón de aluminio oscuro",
  },
  {
    name: "ALUON Veneciana",
    category: "Luz y ventilación",
    description: "Lamas orientadas para graduar la entrada de luz y la ventilación.",
    image: "/products/aluon-veneciana.jpg",
    alt: "Diseño de puerta de aluminio con lamas tipo veneciana",
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <img
          className="home-hero-image"
          src={portfolioBackground}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
        />
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="home-hero-content">
          <p className="eyebrow eyebrow-light">Aluminio para vivirlo</p>
          <h1 id="home-title">Diseñado para tu espacio.<br /><span>Hecho para durar.</span></h1>
          <p className="home-hero-copy">
            Puertas, portones y soluciones de aluminio que unen presencia, funcionalidad y oficio.
          </p>
          <div className="home-hero-actions">
            <Link className="button button-primary" to="/servicios">
              Explorar productos <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </Link>
            <Link className="button button-quiet" to="/contacto">Hablar con ALUON</Link>
          </div>
          <p className="hero-note">Soluciones residenciales y técnicas en aluminio</p>
        </div>
        <a className="hero-scroll" href="#productos">
          Descubrir <span className="material-symbols-outlined" aria-hidden="true">south</span>
        </a>
      </section>

      <section className="home-intro" aria-label="Sobre las soluciones ALUON">
        <p>Materia, precisión y diseño</p>
        <span aria-hidden="true" />
        <p>Aluminio pensado para cada proyecto</p>
      </section>

      <section className="product-discovery" id="productos" aria-labelledby="products-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Colecciones ALUON</p>
            <h2 id="products-title">Una entrada que habla de vos.</h2>
          </div>
          <div className="section-heading-aside">
            <p>Explorá líneas, acabados y configuraciones para encontrar el equilibrio de tu espacio.</p>
            <Link className="text-link" to="/servicios">
              Ver todos los productos <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <article className="product-card" key={product.name}>
              <Link className="product-card-image" to="/servicios" aria-label={`Explorar ${product.name}`}>
                <img src={product.image} alt={product.alt} loading="lazy" decoding="async" />
                <span className="product-index">0{index + 1}</span>
                <span className="product-card-arrow material-symbols-outlined" aria-hidden="true">north_east</span>
              </Link>
              <div className="product-card-copy">
                <p className="product-category">{product.category}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-story" aria-labelledby="story-title">
        <div className="story-image">
          <img src="/products/aluon-premium.jpg" alt="Detalle de una solución ALUON en aluminio" loading="lazy" decoding="async" />
        </div>
        <div className="story-copy">
          <p className="eyebrow">El valor está en los detalles</p>
          <h2 id="story-title">Una solución, muchas formas de hacerla tuya.</h2>
          <p>Conocé las opciones de diseño y las posibilidades de cada línea. Nuestro equipo puede ayudarte a orientar la elección según tu espacio.</p>
          <Link className="text-link" to="/contacto">
            Conversar sobre mi proyecto <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>
      </section>

      <section className="home-cta" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow eyebrow-light">Tu proyecto empieza acá</p>
          <h2 id="contact-title">Hablemos de lo que necesitás.</h2>
          <p>Contanos qué estás buscando y te ayudamos a dar el próximo paso.</p>
        </div>
        <div className="home-cta-actions">
          <Link className="button button-light" to="/contacto">Contactar con ALUON</Link>
          <a className="cta-phone" href="tel:+34900000000">
            <span className="material-symbols-outlined" aria-hidden="true">call</span> 900 000 000
          </a>
        </div>
      </section>
    </div>
  );
}
