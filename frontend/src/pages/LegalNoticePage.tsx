export default function LegalNoticePage() {
  return (
    <div className="bg-surface text-on-surface">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black tracking-tight mb-6">Aviso Legal</h1>
        <div className="space-y-6 text-secondary leading-relaxed">
          <p className="text-base">
            Este texto es un borrador informativo. Completa esta página con los datos legales reales (titularidad, NIF/CIF, domicilio, datos
            registrales, condiciones de uso, etc.).
          </p>
          <div>
            <h2 className="text-2xl font-black text-on-surface mb-2">Contacto</h2>
            <p className="text-base">info@aluon.es</p>
          </div>
        </div>
      </div>
    </div>
  );
}
