import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiFetch, HttpError } from "../shared/api/client";
import { Link, useNavigate } from "react-router-dom";
import CorporateH1 from "../shared/ui/CorporateH1";

const schema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(1, "Introduce tu contraseña."),
  remember: z.boolean().optional(),
});

type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { remember: true } });

  async function onSubmit(values: Values) {
    setServerError(null);
    try {
      const res = await apiFetch<{ accessToken: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: values.email, password: values.password }),
      });
      localStorage.setItem("aluon_token", res.accessToken);
      navigate("/", { replace: true });
    } catch (e) {
      const err = e as HttpError;
      setServerError(err.body?.detail ?? "No se pudo iniciar sesión.");
    }
  }

  return (
    <div className="min-h-[calc(100dvh-80px)] flex flex-col md:flex-row">
      {/* Hero Section Side (from screens/login-registro.html) */}
      <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-slate-950 items-center justify-center">
        <img
          alt="Carpintería de aluminio moderna"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          sizes="(min-width: 768px) 50vw, 100vw"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaEQL54-EotVyg9hmz9UUJFffl7joH42ZgwTqHLr6C11tzi4fqoGGBAhmvPMguiseM2jwONzjx1V-0i2LuJqlLBq-u1Bd8sNIRGhRq_Gi2SdfmsL5p5aGukzGBeYRn69KnG1_4HRXcTxXGKUNlDn6ZwMNhzBqC-VOmLvFnmj9-XLzrNGzf3t53hRXSwwDBP25ozk65o6SCBPLCkDNT6mD2hptUd_xozI3gfXZECfOijPt3hqdFw7ROZSz7Lpq0hcnWkI1S_kYXeFYe"
        />
        <div className="relative z-10 px-12 text-left">
          <CorporateH1 className="text-white" line1="Excelencia en" highlight="Aluminio" />
          <p className="text-slate-300 text-lg max-w-md font-light leading-relaxed">
            Acceda a nuestra plataforma exclusiva para profesionales y clientes. Gestione sus proyectos de carpintería técnica con la máxima precisión.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="border-l-2 border-primary pl-4">
              <div className="text-white font-extrabold text-2xl tracking-tight">100%</div>
              <div className="text-slate-400 text-xs uppercase tracking-widest">Calidad Certificada</div>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <div className="text-white font-extrabold text-2xl tracking-tight">+25</div>
              <div className="text-slate-400 text-xs uppercase tracking-widest">Años de Experiencia</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 blur-[120px] rounded-full" />
      </section>

      {/* Login Form Section */}
      <section className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-950 uppercase mb-2">Iniciar sesión</h2>
            <p className="text-slate-500 font-medium">Introduzca sus credenciales para acceder al portal.</p>
          </div>

          {serverError ? (
            <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800">{serverError}</div>
          ) : null}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-950 mb-2">Correo electrónico</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </span>
                <input
                  type="email"
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-0 border-b-2 border-slate-200 focus:border-primary focus:ring-0 text-slate-900 transition-all placeholder:text-slate-400 font-medium"
                  placeholder="usuario@dominio.com"
                  {...form.register("email")}
                />
              </div>
              {form.formState.errors.email?.message ? (
                <p className="mt-2 text-xs text-rose-700">{form.formState.errors.email.message}</p>
              ) : null}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-950">Contraseña</label>
                <button
                  type="button"
                  className="text-xs font-bold text-primary hover:opacity-90 uppercase tracking-tight"
                  onClick={() => setServerError("Recuperación de contraseña: por implementar.")}
                >
                  ¿Olvidó su clave?
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <span className="material-symbols-outlined text-xl">lock</span>
                </span>
                <input
                  type="password"
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-0 border-b-2 border-slate-200 focus:border-primary focus:ring-0 text-slate-900 transition-all placeholder:text-slate-400 font-medium"
                  placeholder="••••••••"
                  {...form.register("password")}
                />
              </div>
              {form.formState.errors.password?.message ? (
                <p className="mt-2 text-xs text-rose-700">{form.formState.errors.password.message}</p>
              ) : null}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
                {...form.register("remember")}
              />
              <label className="ml-2 block text-sm font-medium text-slate-600">Recordar mi sesión</label>
            </div>

            <button
              className="w-full bg-slate-950 hover:bg-slate-900 text-white font-extrabold uppercase tracking-widest py-5 rounded-none transition-all flex items-center justify-center gap-2 group active:opacity-80 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Accediendo…" : "Acceder al sistema"}
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>

            <div className="relative my-8">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="px-4 bg-white text-slate-400 font-bold">O entrar con</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                className="flex w-full items-center justify-center gap-3 px-4 py-3 border-2 border-slate-100 bg-white text-slate-950 font-extrabold text-sm uppercase tracking-tight hover:bg-slate-50 transition-colors"
                type="button"
                onClick={() => setServerError("Acceso biométrico: demo UI (sin implementación).")}
              >
                <span className="material-symbols-outlined">fingerprint</span>
                Acceso biométrico
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              ¿No tiene una cuenta?{" "}
              <Link className="text-primary font-bold hover:underline" to="/contacto">
                Contacte con soporte técnico
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Note: corporate header/footer comes from SiteLayout. This page only renders the body.
