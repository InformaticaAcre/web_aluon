import { NavLink, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import CookieBanner from "../shared/ui/CookieBanner";
import logo from "../../img/logo.png";
import logoWhite from "../../img/logo-white.png";

const primaryLinks = [
  { to: "/", label: "Inicio", end: true },
  { to: "/servicios", label: "Colecciones" },
  { to: "/portfolio", label: "Proyectos" },
  { to: "/venta-online", label: "Pedido" },
  { to: "/contacto", label: "Contacto" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx("site-nav-link", isActive && "site-nav-link-active");

export default function SiteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const wasMobileOpen = useRef(false);
  const focusAfterClose = useRef<"menu" | "main">("menu");

  function closeMobileMenu(focusTarget: "menu" | "main" = "menu") {
    focusAfterClose.current = focusTarget;
    setMobileOpen(false);
  }

  useEffect(() => {
    if (mobileOpen) closeButtonRef.current?.focus();
    else if (wasMobileOpen.current) {
      const target = focusAfterClose.current;
      requestAnimationFrame(() => {
        if (target === "main") document.getElementById("main-content")?.focus();
        else menuButtonRef.current?.focus();
      });
    }
    wasMobileOpen.current = mobileOpen;
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMobileMenu();
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
      <a className="skip-link" href="#main-content" tabIndex={mobileOpen ? -1 : 0}>Saltar al contenido</a>
      <header className="site-header" inert={mobileOpen || undefined}>
        <div className="mx-auto hidden w-[min(100%-3rem,1240px)] items-center justify-between border-b border-[var(--aluon-line)] py-2 text-[.62rem] font-bold uppercase tracking-[.14em] text-[var(--aluon-ink-soft)] lg:flex">
          <span>Aluminio soldado · Diseño que permanece</span>
          <span className="flex items-center gap-5"><span>Atención personalizada</span><a href="tel:+34900000000">900 000 000</a></span>
        </div>
        <div className="site-header-inner">
          <NavLink to="/" className="site-brand" aria-label="ALUON, inicio">
            <img src={logo} alt="ALUON" width="140" height="56" />
            <span className="hidden border-l border-[var(--aluon-line)] pl-4 text-[.6rem] font-bold uppercase leading-[1.35] tracking-[.12em] text-[var(--aluon-ink-soft)] xl:block">Sistemas<br />de aluminio</span>
          </NavLink>

          <nav className="site-primary-nav" aria-label="Navegación principal">
            {primaryLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header-actions">
            <a className="header-phone" href="tel:+34900000000" aria-label="Llamar a ALUON">
              <span className="material-symbols-outlined" aria-hidden="true">call</span>
              <span className="hidden xl:inline">Llamar</span>
            </a>
            <NavLink to="/contacto" className="button button-primary header-contact">Iniciar proyecto</NavLink>
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-toggle"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">{mobileOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-menu-layer">
          <button type="button" className="mobile-menu-backdrop" tabIndex={-1} aria-label="Cerrar menú" onClick={() => closeMobileMenu()} />
          <nav id="mobile-navigation" className="mobile-menu" aria-label="Navegación móvil" aria-modal="true" role="dialog" aria-labelledby="mobile-navigation-title">
            <div className="mobile-menu-heading">
              <div>
                <span id="mobile-navigation-title" className="mobile-menu-label">Explorar ALUON</span>
                <p className="mt-2 max-w-[18ch] font-[var(--aluon-display)] text-2xl font-black leading-none text-[var(--aluon-ink)]">Diseño que permanece.</p>
              </div>
              <button ref={closeButtonRef} type="button" className="icon-button" onClick={() => closeMobileMenu()} aria-label="Cerrar menú">
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>
            <div className="mobile-menu-links">
              {primaryLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.end} onClick={() => closeMobileMenu("main")} className={navLinkClass}>
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/login" onClick={() => closeMobileMenu("main")} className={navLinkClass}>Acceder</NavLink>
            </div>
            <div className="mt-auto border-t border-[var(--aluon-line)] pt-6">
              <p className="mb-3 text-xs leading-5 text-[var(--aluon-ink-soft)]">¿Tienes un proyecto en mente? Hablemos de materiales, medidas y posibilidades.</p>
              <a className="button button-primary mobile-call" href="tel:+34900000000">
                <span className="material-symbols-outlined" aria-hidden="true">call</span>
                Llamar a ALUON
              </a>
            </div>
          </nav>
        </div>
      )}

      <main id="main-content" className="site-main" tabIndex={-1} inert={mobileOpen || undefined}>
        <Outlet />
      </main>

      <footer className="site-footer" inert={mobileOpen || undefined}>
        <div className="site-footer-grid">
          <div className="col-span-full border-b border-white/15 pb-10 lg:flex lg:items-end lg:justify-between lg:gap-10">
            <div>
              <p className="mb-4 text-[.65rem] font-black uppercase tracking-[.18em] text-[#d7a18d]">ALUON / Sistemas de aluminio</p>
              <p className="max-w-[18ch] font-[var(--aluon-display)] text-4xl font-black leading-[.95] tracking-[-.06em] text-white sm:text-5xl">La entrada define el lugar.</p>
            </div>
            <p className="mt-7 max-w-[34ch] text-sm leading-6 text-white/60 lg:mt-0">Diseñamos, fabricamos y acompañamos soluciones de aluminio para espacios que merecen durar.</p>
          </div>
          <div className="footer-intro">
            <NavLink to="/" aria-label="ALUON, inicio" className="footer-brand">
              <img src={logoWhite} alt="" width="140" height="56" loading="lazy" />
            </NavLink>
            <p>Precisión, materia y criterio en cada proyecto.</p>
          </div>
          <nav aria-label="Explorar">
            <h2>Explorar</h2>
            <ul>
              <li><NavLink to="/servicios">Colecciones</NavLink></li>
              <li><NavLink to="/portfolio">Proyectos</NavLink></li>
              <li><NavLink to="/venta-online">Pedido</NavLink></li>
            </ul>
          </nav>
          <nav aria-label="Información legal">
            <h2>Información</h2>
            <ul>
              <li><NavLink to="/aviso-legal">Aviso legal</NavLink></li>
              <li><NavLink to="/privacidad">Privacidad</NavLink></li>
              <li><NavLink to="/cookies">Cookies</NavLink></li>
            </ul>
          </nav>
          <address className="footer-contact">
            <h2>Hablemos</h2>
            <ul>
              <li><NavLink to="/contacto">Iniciar proyecto</NavLink></li>
              <li><a href="tel:+34900000000">900 000 000</a></li>
              <li><a href="mailto:info@aluon.es">info@aluon.es</a></li>
            </ul>
          </address>
        </div>
        <div className="site-footer-bottom flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ALUON. Todos los derechos reservados.</span>
          <span className="text-[.62rem] uppercase tracking-[.14em]">Diseño que permanece</span>
        </div>
      </footer>

      <div inert={mobileOpen || undefined}>
        <CookieBanner />
      </div>
    </div>
  );
}
