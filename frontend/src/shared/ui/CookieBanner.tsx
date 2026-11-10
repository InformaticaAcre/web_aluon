import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

type CookieConsent = "accepted" | "rejected";

const CONSENT_COOKIE = "aluon_cookie_consent";
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 año

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (const cookie of cookies) {
    const [cookieName, ...rest] = cookie.split("=");
    if (cookieName === name) return rest.join("=") || "";
  }
  return null;
}

function setCookieValue(name: string, value: string, maxAgeSeconds: number) {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [ready, setReady] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const current = getCookieValue(CONSENT_COOKIE);
    if (current === "accepted" || current === "rejected") setConsent(current);
    setReady(true);
  }, []);

  const shouldShow = useMemo(() => ready && consent === null, [ready, consent]);

  function handleChoice(choice: CookieConsent) {
    setCookieValue(CONSENT_COOKIE, choice, CONSENT_MAX_AGE_SECONDS);
    setConsent(choice);
  }

  useEffect(() => {
    if (!shouldShow) {
      document.documentElement.style.setProperty("--cookie-safe-bottom", "0px");
      return;
    }

    const el = cardRef.current;
    if (!el) return;

    const apply = () => {
      const height = el.getBoundingClientRect().height;
      // +16px para margen visual con elementos flotantes (FAB, etc.)
      document.documentElement.style.setProperty("--cookie-safe-bottom", `${Math.ceil(height) + 16}px`);
    };

    apply();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => apply());
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6">
      <div ref={cardRef} className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white/95 backdrop-blur shadow-2xl">
        <div className="flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-slate-950 font-extrabold tracking-tight">
              <span className="material-symbols-outlined text-primary">cookie</span>
              Cookies
            </div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Usamos cookies para recordar tus preferencias y mejorar tu experiencia. Puedes aceptar o rechazar las cookies no esenciales.{" "}
              <Link className="font-bold text-primary hover:underline" to="/cookies">
                Ver política de cookies
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:shrink-0">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold tracking-tight text-slate-950 hover:bg-slate-50 active:scale-[0.98] transition"
              onClick={() => handleChoice("rejected")}
            >
              Rechazar
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-extrabold tracking-tight text-white shadow-soft hover:opacity-95 active:scale-[0.98] transition"
              onClick={() => handleChoice("accepted")}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
