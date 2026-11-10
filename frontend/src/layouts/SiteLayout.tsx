import { NavLink, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import CookieBanner from "../shared/ui/CookieBanner";

const primaryLinks = [
  { to: "/", label: "Inicio", end: true },
  { to: "/servicios", label: "Productos" },
  { to: "/portfolio", label: "Proyectos" },
  { to: "/venta-online", label: "Venta online" },
  { to: "/contacto", label: "Contacto" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx("site-nav-link", isActive && "site-nav-link-active");

export default function SiteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (mobileOpen) closeButtonRef.current?.focus();
    else menuButtonRef.current?.focus();
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const drawer = document.getElementById("mobile-navigation");
      const focusable = drawer?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <header className="site-header">
        <div className="site-header-inner">
          <NavLink to="/" className="site-brand" aria-label="ALUON, inicio">
            <img src="/logo.png" alt="ALUON" width="140" height="56" />
          </NavLink>

          <nav className="site-primary-nav" aria-label="Navegación principal">
            {primaryLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header-actions">
            <a className="header-phone" href="tel:+34900000000">
              <span className="material-symbols-outlined" aria-hidden="true">call</span>
              <span>Llamar</span>
            </a>
            <NavLink to="/contacto" className="button button-primary header-contact">Pedir asesoramiento</NavLink>
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-toggle"
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen(true)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">menu</span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-menu-layer">
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label="Cerrar menú"
            onClick={() => setMobileOpen(false)}
          />
          <nav id="mobile-navigation" className="mobile-menu" aria-label="Navegación móvil" aria-modal="true" role="dialog">
            <div className="mobile-menu-heading">
              <img src="/logo.png" alt="ALUON" width="120" height="48" />
              <button
                ref={closeButtonRef}
                type="button"
                className="icon-button"
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
              >
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>
            <div className="mobile-menu-links">
              {primaryLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setMobileOpen(false)} className={navLinkClass}>
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/login" onClick={() => setMobileOpen(false)} className={navLinkClass}>Acceder</NavLink>
            </div>
            <a className="button button-primary mobile-call" href="tel:+34900000000">
              <span className="material-symbols-outlined" aria-hidden="true">call</span>
              Llamar a ALUON
            </a>
          </nav>
        </div>
      )}

      <main id="main-content" className="site-main" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer-grid">
          <div className="footer-intro">
            <img src="/logo.png" alt="ALUON" width="140" height="56" loading="lazy" />
            <p>Soluciones de aluminio para espacios que merecen durar.</p>
          </div>
          <div>
            <h2>Explorar</h2>
            <ul>
              <li><NavLink to="/servicios">Productos</NavLink></li>
              <li><NavLink to="/portfolio">Proyectos</NavLink></li>
              <li><NavLink to="/venta-online">Venta online</NavLink></li>
            </ul>
          </div>
          <div>
            <h2>Información</h2>
            <ul>
              <li><NavLink to="/aviso-legal">Aviso legal</NavLink></li>
              <li><NavLink to="/privacidad">Privacidad</NavLink></li>
              <li><NavLink to="/cookies">Cookies</NavLink></li>
            </ul>
          </div>
          <div>
            <h2>Hablemos</h2>
            <ul>
              <li><NavLink to="/contacto">Contactar con ALUON</NavLink></li>
              <li><a href="tel:+34900000000">900 000 000</a></li>
              <li><a href="mailto:info@aluon.es">info@aluon.es</a></li>
            </ul>
          </div>
        </div>
        <div className="site-footer-bottom">
          © {new Date().getFullYear()} ALUON. Todos los derechos reservados.
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}
