import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type CookieConsent = "accepted" | "rejected";

const CONSENT_COOKIE = "aluon_cookie_consent";
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

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

  useEffect(() => {
    const current = getCookieValue(CONSENT_COOKIE);
    if (current === "accepted" || current === "rejected") setConsent(current);
    setReady(true);
  }, []);

  function handleChoice(choice: CookieConsent) {
    setCookieValue(CONSENT_COOKIE, choice, CONSENT_MAX_AGE_SECONDS);
    setConsent(choice);
  }

  if (!ready || consent !== null) return null;

  return (
    <aside className="cookie-consent" aria-labelledby="cookie-consent-title">
      <div className="cookie-consent-inner">
        <div className="cookie-consent-copy">
          <p className="cookie-consent-kicker">Tus preferencias</p>
          <h2 id="cookie-consent-title">Cookies</h2>
          <p>
            Usamos cookies para recordar tus preferencias y mejorar tu experiencia. Puedes aceptar o rechazar las cookies no esenciales.{" "}
            <Link to="/cookies">Ver política de cookies</Link>.
          </p>
        </div>
        <div className="cookie-consent-actions" aria-label="Elegir preferencias de cookies">
          <button type="button" className="cookie-button cookie-button-secondary" onClick={() => handleChoice("rejected")}>
            Rechazar
          </button>
          <button type="button" className="cookie-button cookie-button-primary" onClick={() => handleChoice("accepted")}>
            Aceptar
          </button>
        </div>
      </div>
    </aside>
  );
}
