export default function CookiesPolicyPage() {
  return (
    <div className="bg-surface text-on-surface">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black tracking-tight mb-6">Política de Cookies</h1>
        <div className="space-y-6 text-secondary leading-relaxed">
          <p className="text-base">
            Esta web utiliza cookies para recordar tus preferencias y ayudar a que el sitio funcione correctamente. Algunas cookies pueden ser
            no esenciales (por ejemplo, de medición). Puedes aceptar o rechazar dichas cookies desde el aviso de cookies.
          </p>
          <div>
            <h2 className="text-2xl font-black text-on-surface mb-2">¿Qué son las cookies?</h2>
            <p className="text-base">Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando navegas por un sitio web.</p>
          </div>
          <div>
            <h2 className="text-2xl font-black text-on-surface mb-2">Cookies utilizadas</h2>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>
                <span className="font-bold text-on-surface">Cookies técnicas</span>: necesarias para el funcionamiento del sitio y para
                recordar tu elección.
              </li>
              <li>
                <span className="font-bold text-on-surface">Cookies no esenciales</span>: solo se utilizarán si las aceptas.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-black text-on-surface mb-2">Cómo cambiar tu elección</h2>
            <p className="text-base">
            Puedes borrar las cookies desde la configuración de tu navegador. Si eliminas la cookie de consentimiento, volveremos a mostrar el
            aviso.
          </p>
          </div>
          <div>
            <h2 className="text-2xl font-black text-on-surface mb-2">Contacto</h2>
            <p className="text-base">Si tienes dudas, puedes escribirnos a info@aluon.es.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
