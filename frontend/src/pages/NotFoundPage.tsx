import { Link } from "react-router-dom";
import CorporateH1 from "../shared/ui/CorporateH1";

export default function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-3xl bg-white p-10 sm:p-14 text-center shadow-soft border border-slate-200">
        <CorporateH1 className="mx-auto max-w-3xl text-slate-950" line1="Página" highlight="No encontrada" />
        <p className="text-slate-600 max-w-xl mx-auto">La URL no existe o fue movida.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-primary transition"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
