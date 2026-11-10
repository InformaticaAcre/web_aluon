import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiFetch, HttpError } from "../shared/api/client";
import CorporateH1 from "../shared/ui/CorporateH1";

const schema = z.object({
  fullName: z.string().min(2, "Introduce tu nombre completo.").max(200),
  phone: z.string().min(6, "Introduce un teléfono válido.").max(40),
  email: z.string().email("Email inválido.").max(320),
  projectType: z.string().min(2, "Selecciona un tipo de proyecto.").max(120),
  description: z.string().min(10, "Añade algo más de detalle.").max(5000),
  privacyAccepted: z.boolean().refine((v) => v === true, "Debes aceptar la política de privacidad."),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const projectTypes = useMemo(
    () => ["Cerramientos de Aluminio", "Ventanas y Puertas", "Fachadas Comerciales", "Pérgolas Bioclimáticas", "Otros Proyectos"],
    [],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { projectType: projectTypes[0], privacyAccepted: false },
    mode: "onTouched",
  });

  async function onSubmit(values: FormValues) {
    setServerMessage(null);
    try {
      await apiFetch<{ id: string }>("/api/public/contact", { method: "POST", body: JSON.stringify(values) });
      form.reset({ ...values, description: "", privacyAccepted: false });
      setServerMessage("Solicitud enviada. Te contactaremos lo antes posible.");
    } catch (e) {
      const err = e as HttpError;
      if (err.body?.type === "validation_error") {
        for (const fe of err.body.errors ?? []) {
          form.setError(fe.field as keyof FormValues, { message: fe.message });
        }
        return;
      }
      setServerMessage(err.body?.detail ?? "No se pudo enviar la solicitud. Inténtalo de nuevo.");
    }
  }

  return (
    <div className="bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Hero (based on screens/contacto.html) */}
      <div className="relative h-[260px] sm:h-[320px] lg:h-[400px] w-full overflow-hidden">
        <img
          alt="Industrial Facility Background"
          className="w-full h-full object-cover object-center brightness-50"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSThbsWVIvqt0RdIAm5PHHLj6sfuthFU2xmFlad4GUhfPlkuQqncUyy1jdy86pAj8L4vSIztcSNiM3aS5hr-F6566PtD6IG5vwaUl-7uBJ2lG6iF4FzPS-bwvvJgdNJi8mJ8tij-cKBUbKsMDuN1sAgZ841GvXET4OPfmfqASYR5Ewl-90YzsnfqI9ChvzmL7-SIR-dbExMRuKxDKkTY9I8_3hO-GyF0Q4-QPu91GWBaYPGHECvaP4W3tBec0U_my1MXXHCU_tBCGf"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
          <div className="max-w-7xl w-full px-6 text-center">
            <CorporateH1 className="mb-4 text-white" line1="Contacto" highlight="Presupuesto" />
            <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto font-medium">
              Expertos en carpintería de aluminio. Solicite su presupuesto personalizado.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 sm:-mt-16 lg:-mt-20 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Info Sidebar */}
          <aside className="lg:col-span-4 space-y-4">
            <InfoCard icon="call" title="Teléfono" value="925 554 014" />
            <InfoCard icon="mail" title="Email" value="info@aluon.es" />
            <InfoCard
              icon="location_on"
              title="Oficina Central"
              value="Carretera 4004 km. 29,200. Pantoja. Toledo"
              valueClassName="text-xl"
            />

            <div className="bg-slate-950 p-8 text-white">
              <h4 className="text-sm font-bold uppercase tracking-widest text-rose-500 mb-6">Compromiso Aluon</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-rose-500 mt-1">verified</span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider mb-1">Presupuesto Rápido</p>
                    <p className="text-xs text-slate-400">Detalles en menos de 48 horas sin compromiso.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-rose-500 mt-1">engineering</span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider mb-1">Instalación Certificada</p>
                    <p className="text-xs text-slate-400">Técnicos especializados con certificación oficial.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-rose-500 mt-1">shield</span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider mb-1">10 Años de Garantía</p>
                    <p className="text-xs text-slate-400">Garantía integral en todos nuestros perfiles.</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          {/* Form Section */}
          <section className="lg:col-span-8 bg-white p-8 md:p-16 shadow-2xl border border-slate-100">
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 uppercase">Solicitud de Presupuesto</h2>
              <div className="h-1 w-20 bg-rose-600" />
            </div>

            {serverMessage ? (
              <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-800">{serverMessage}</div>
            ) : null}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field label="Nombre completo" error={form.formState.errors.fullName?.message}>
                  <input
                    className="w-full border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-rose-600 py-3 px-0 bg-transparent transition-colors text-lg"
                    placeholder="Juan Pérez"
                    {...form.register("fullName")}
                  />
                </Field>
                <Field label="Teléfono" error={form.formState.errors.phone?.message}>
                  <input
                    className="w-full border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-rose-600 py-3 px-0 bg-transparent transition-colors text-lg"
                    autoComplete="tel"
                    placeholder="900 000 000"
                    inputMode="tel"
                    type="tel"
                    {...form.register("phone")}
                  />
                </Field>
              </div>

              <Field label="Email profesional" error={form.formState.errors.email?.message}>
                <input
                  className="w-full border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-rose-600 py-3 px-0 bg-transparent transition-colors text-lg"
                  placeholder="email@empresa.com"
                  type="email"
                  {...form.register("email")}
                />
              </Field>

              <Field label="Tipo de proyecto" error={form.formState.errors.projectType?.message}>
                <select
                  className="w-full border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-rose-600 py-3 px-0 bg-transparent transition-colors text-lg appearance-none cursor-pointer"
                  {...form.register("projectType")}
                >
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Descripción del proyecto" error={form.formState.errors.description?.message}>
                <textarea
                  className="w-full border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-rose-600 py-3 px-0 bg-transparent transition-colors text-lg min-h-[100px]"
                  placeholder="Detalles específicos..."
                  rows={3}
                  {...form.register("description")}
                />
              </Field>

              <div className="flex items-start gap-3 py-2">
                <input
                  className="mt-1 text-rose-600 focus:ring-rose-600 border-slate-300 h-4 w-4 rounded"
                  type="checkbox"
                  {...form.register("privacyAccepted")}
                />
                <div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Acepto la política de privacidad y el tratamiento de mis datos para fines comerciales relacionados con mi consulta.
                  </p>
                  {form.formState.errors.privacyAccepted?.message ? (
                    <p className="mt-1 text-xs text-rose-700">{form.formState.errors.privacyAccepted.message}</p>
                  ) : null}
                </div>
              </div>

              <button
                className="w-full bg-slate-950 text-white font-bold uppercase tracking-widest py-6 hover:bg-rose-600 transition-all duration-300 shadow-xl text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting ? "Enviando…" : "Enviar solicitud"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field(props: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">{props.label}</label>
      {props.children}
      {props.error ? <p className="text-xs text-rose-700">{props.error}</p> : null}
    </div>
  );
}

function InfoCard(props: {
  icon: string;
  title: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="bg-white p-8 border-l-4 border-rose-600 shadow-xl">
      <span className="material-symbols-outlined text-rose-600 text-3xl mb-4 block">{props.icon}</span>
      <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">{props.title}</h3>
      <p className={`font-extrabold text-slate-900 ${props.valueClassName ?? "text-2xl"}`}>{props.value}</p>
    </div>
  );
}
