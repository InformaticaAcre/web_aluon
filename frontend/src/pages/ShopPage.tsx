import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch, HttpError } from "../shared/api/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PageHero from "../shared/ui/PageHero";
import backgroundOnline from "../../img/background-online.jpeg";

type Product = {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string | null;
};

type CartItem = { productId: string; name: string; qty: number };

const orderSchema = z.object({
  customerEmail: z.string().email("Email inválido.").max(320),
  customerName: z.string().min(2, "Introduce tu nombre.").max(200),
  customerPhone: z.string().max(40).optional(),
});

type OrderForm = z.infer<typeof orderSchema>;

export default function ShopPage() {
  const q = useQuery({
    queryKey: ["products"],
    queryFn: () => apiFetch<Product[]>("/api/public/products"),
  });
  const data = q.data ?? [];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const form = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: { customerEmail: "", customerName: "", customerPhone: "" },
    mode: "onTouched",
  });

  const cartDetail = useMemo(() => {
    const priceById = new Map<string, number>();
    const imageById = new Map<string, string>();
    for (const p of data) priceById.set(p.id, priceForProduct(p.id));
    for (const p of data) if (p.imageUrl) imageById.set(p.id, p.imageUrl);
    const items = cart.map((c) => ({
      ...c,
      unitPriceCents: priceById.get(c.productId) ?? 0,
      imageUrl: imageById.get(c.productId) ?? DEFAULT_PRODUCT_IMAGE,
    }));
    const subtotalCents = items.reduce((sum, i) => sum + i.unitPriceCents * i.qty, 0);
    const vatCents = Math.round(subtotalCents * 0.21);
    const totalCents = subtotalCents + vatCents;
    return { items, subtotalCents, vatCents, totalCents };
  }, [cart, data]);

  async function checkout(values: OrderForm) {
    setMessage(null);
    try {
      await apiFetch<{ id: string; status: string }>("/api/public/orders", {
        method: "POST",
        body: JSON.stringify({
          customerEmail: values.customerEmail,
          customerName: values.customerName,
          customerPhone: values.customerPhone ?? "",
          items: cart.map((c) => ({ productId: c.productId, quantity: c.qty })),
        }),
      });
      setCart([]);
      setConfirmOpen(false);
      form.reset();
      setMessage("Pedido creado. Te contactaremos para confirmar detalles.");
    } catch (e) {
      const err = e as HttpError;
      if (err.body?.type === "validation_error") {
        for (const fe of err.body.errors ?? []) {
          form.setError(fe.field as keyof OrderForm, { message: fe.message });
        }
        setConfirmOpen(false);
        return;
      }
      setMessage(err.body?.detail ?? "No se pudo crear el pedido.");
      setConfirmOpen(false);
    }
  }

  function addToCart(p: Product) {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.productId === p.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { productId: p.id, name: p.name, qty: 1 }];
    });
  }

  function increment(productId: string) {
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + 1 } : i)));
  }

  function decrement(productId: string) {
    setCart((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
        .filter((i) => i.qty > 0),
    );
  }

  function remove(productId: string) {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }

  return (
    <div className="bg-slate-50 text-slate-900 antialiased">
      <PageHero
        backgroundSrc={backgroundOnline}
        titleLine1="Venta"
        titleHighlight="Online"
        subtitle="Prepara tu pedido y envía la solicitud. No se realiza ningún cobro en esta pantalla."
        align="left"
        overlayClassName="bg-slate-950/40"
      />

      <main className="pb-20 px-6 -mt-10 sm:-mt-14 lg:-mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ol className="journey-guide shop-journey" aria-label="Pasos para preparar un pedido">
            <li className="journey-step">
              <span aria-hidden="true">01</span>
              <div><strong>Elige</strong><p>Añade productos al pedido.</p></div>
            </li>
            <li className="journey-step">
              <span aria-hidden="true">02</span>
              <div><strong>Completa tus datos</strong><p>Indica cómo contactarte.</p></div>
            </li>
            <li className="journey-step">
              <span aria-hidden="true">03</span>
              <div><strong>Envía la solicitud</strong><p>ALUON confirmará los detalles.</p></div>
            </li>
          </ol>
          <header className="rounded-3xl bg-white p-8 sm:p-10 shadow-soft border border-slate-200 flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mb-2">Prepara tu pedido</h2>
              <p className="text-slate-600">
                Revisa los productos y cantidades antes de enviar la solicitud. El envío no implica un pago.
              </p>
            </div>
            {message ? (
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold">{message}</div>
            ) : null}
          </header>

          {q.isLoading ? (
            <div className="mt-10 text-slate-600">Cargando productos…</div>
          ) : q.isError ? (
            <div className="mt-10 rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
              No se han podido cargar los productos.
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-8 space-y-6">
                {cartDetail.items.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10 text-center">
                    <div className="mx-auto h-14 w-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                    </div>
                    <h2 className="mt-5 text-xl font-extrabold uppercase">Tu carrito está vacío</h2>
                    <p className="mt-2 text-slate-500">Añade productos del catálogo para generar un pedido.</p>
                  </div>
                ) : (
                  cartDetail.items.map((i) => (
                    <div key={i.productId} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                      <div className="p-6 flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-56 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-100 aspect-[7/5] md:aspect-auto md:h-40">
                          <img
                            alt={i.name}
                            className="w-full h-full object-cover object-center"
                            src={i.imageUrl}
                            loading="lazy"
                            decoding="async"
                            sizes="(min-width: 1024px) 224px, 100vw"
                          />
                        </div>
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-6">
                              <h3 className="text-xl font-extrabold text-slate-900 uppercase">{i.name}</h3>
                              <span className="text-xl font-extrabold text-slate-900">
                                {formatEuro(i.unitPriceCents * i.qty)}
                              </span>
                            </div>
                            <p className="text-slate-500 text-sm mt-2">Configuración: personalizada | Medidas: a confirmar</p>
                            <p className="text-slate-500 text-sm">Revisión técnica incluida en el pedido.</p>
                          </div>
                          <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                              <button
                                type="button"
                                className="px-4 py-2 hover:bg-slate-200 text-slate-600 transition-colors"
                                onClick={() => decrement(i.productId)}
                                aria-label="Reducir cantidad"
                              >
                                -
                              </button>
                              <span className="px-5 py-2 font-extrabold text-slate-900 border-x border-slate-200 bg-white">
                                {i.qty}
                              </span>
                              <button
                                type="button"
                                className="px-4 py-2 hover:bg-slate-200 text-slate-600 transition-colors"
                                onClick={() => increment(i.productId)}
                                aria-label="Aumentar cantidad"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              className="text-slate-400 hover:text-rose-600 flex items-center gap-2 text-sm font-semibold transition-colors group"
                              onClick={() => remove(i.productId)}
                            >
                              <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
                                delete
                              </span>
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Catalog (to add items) */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-6 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="text-lg font-extrabold uppercase">Catálogo</h2>
                      <p className="text-slate-500 text-sm">Añade productos al pedido.</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className="shop-product-option"
                        onClick={() => addToCart(p)}
                      >
                        <img
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full object-cover object-center"
                          src={p.imageUrl ?? DEFAULT_PRODUCT_IMAGE}
                          loading="lazy"
                          decoding="async"
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/60 to-white/30"
                        />
                        <span className="shop-product-option-content">
                          <span className="flex items-start justify-between gap-4">
                            <span className="flex items-start gap-4">
                              <span className="font-extrabold uppercase">{p.name}</span>
                            </span>
                            <span className="text-sm font-extrabold text-slate-900">{formatEuro(priceForProduct(p.id))}</span>
                          </span>
                          <span className="mt-2 block text-sm text-slate-500">{p.shortDescription}</span>
                          <span className="shop-product-option-action">
                            Añadir <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tech Quote Section */}
                <div className="bg-slate-900 rounded-xl p-10 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                      <div className="bg-rose-600 p-5 rounded-2xl shadow-lg shadow-rose-600/20">
                        <span className="material-symbols-outlined text-4xl">engineering</span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-2xl font-extrabold tracking-tight mb-3 uppercase">¿Proyecto personalizado?</h3>
                        <p className="text-slate-300 max-w-md mb-0 text-lg">
                          Nuestros ingenieros revisan cada pedido. Si necesitas ajustes milimétricos, contáctanos.
                        </p>
                      </div>
                      <a
                        className="whitespace-nowrap bg-white text-slate-950 px-8 py-4 rounded-full font-extrabold uppercase tracking-wider text-sm hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-xl active:scale-95"
                        href="/contacto"
                      >
                        Solicitar presupuesto técnico
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 sticky top-28">
                  <h2 className="text-lg font-extrabold text-slate-900 mb-8 uppercase flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">account_balance_wallet</span>
                    Detalle del pago
                  </h2>

                  <div className="space-y-5 mb-8">
                    <div className="flex justify-between text-slate-500 font-medium">
                      <span>Subtotal ({cartDetail.items.length} productos)</span>
                      <span className="text-slate-900">{formatEuro(cartDetail.subtotalCents)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-medium">
                      <span>Gastos de Envío</span>
                      <span className="text-emerald-600 font-extrabold uppercase text-xs tracking-widest bg-emerald-50 px-2 py-1 rounded">
                        Gratis
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-medium">
                      <span>IVA (21%)</span>
                      <span className="text-slate-900">{formatEuro(cartDetail.vatCents)}</span>
                    </div>
                    <div className="pt-6 border-t-2 border-dashed border-slate-100 flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Total a pagar</span>
                        <span className="text-3xl font-extrabold text-slate-900 tracking-tighter">
                          {formatEuro(cartDetail.totalCents)}
                        </span>
                      </div>
                      <div className="text-rose-600 mb-1">
                        <span className="material-symbols-outlined text-3xl">shopping_cart_checkout</span>
                      </div>
                    </div>
                  </div>

                  <form className="space-y-4" onSubmit={form.handleSubmit(() => setConfirmOpen(true))} noValidate>
                    <Field label="Nombre" error={form.formState.errors.customerName?.message}>
                      <input
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 focus:border-rose-600 focus:ring-rose-600"
                        placeholder="Tu nombre"
                        {...form.register("customerName")}
                      />
                    </Field>
                    <Field label="Email" error={form.formState.errors.customerEmail?.message}>
                      <input
                        type="email"
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 focus:border-rose-600 focus:ring-rose-600"
                        placeholder="cliente@ejemplo.com"
                        {...form.register("customerEmail")}
                      />
                    </Field>
                    <Field label="Teléfono (opcional)" error={form.formState.errors.customerPhone?.message}>
                      <input
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 focus:border-rose-600 focus:ring-rose-600"
                        autoComplete="tel"
                        placeholder="900 000 000"
                        inputMode="tel"
                        type="tel"
                        {...form.register("customerPhone")}
                      />
                    </Field>

                    <button
                      className="w-full bg-rose-600 text-white py-5 rounded-xl font-extrabold uppercase tracking-widest text-sm hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={cartDetail.items.length === 0 || form.formState.isSubmitting}
                      type="submit"
                    >
                      {form.formState.isSubmitting ? "Procesando…" : "Revisar solicitud"}
                    </button>
                  </form>

                  <div className="space-y-4 mt-6">
                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span
                        className="material-symbols-outlined text-emerald-500 text-2xl"
                        style={{ fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
                      >
                        verified_user
                      </span>
                      <div>
                        <p className="text-slate-900 text-sm font-extrabold">Garantía de pago seguro</p>
                        <p className="text-slate-500 text-xs mt-1">Encriptación SSL de 256 bits para proteger tus datos.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 px-4 py-3 text-slate-500">
                      <span
                        className="material-symbols-outlined text-slate-400"
                        style={{ fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
                      >
                        local_shipping
                      </span>
                      <span className="text-sm font-medium">Entrega asegurada puerta a puerta</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Diseño defensivo: el pedido se crea en backend y queda trazado en PostgreSQL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

      {confirmOpen ? (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Confirmar pedido">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/40"
            aria-label="Cerrar"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="absolute left-1/2 top-1/2 w-[520px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white border border-slate-200 shadow-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-extrabold tracking-tight">Confirmar pedido</h4>
                <p className="mt-1 text-sm text-slate-600">Revisa los items antes de crear el pedido.</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50"
                onClick={() => setConfirmOpen(false)}
                aria-label="Cerrar"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              {cartDetail.items.map((c) => (
                <div key={c.productId} className="flex items-center justify-between gap-3 py-1">
                  <div className="text-sm font-semibold text-slate-950">{c.name}</div>
                  <div className="text-sm text-slate-600">
                    x{c.qty} · {formatEuro(c.unitPriceCents * c.qty)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-slate-600">Total (IVA incl.)</div>
              <div className="font-extrabold text-slate-950">{formatEuro(cartDetail.totalCents)}</div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold hover:bg-slate-50 active:scale-[0.98] transition"
                onClick={() => setConfirmOpen(false)}
                disabled={form.formState.isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="rounded-lg bg-rose-600 px-4 py-3 text-sm font-extrabold uppercase tracking-widest text-white active:scale-[0.98] transition disabled:opacity-60"
                disabled={form.formState.isSubmitting}
                onClick={form.handleSubmit(checkout)}
              >
                {form.formState.isSubmitting ? "Creando…" : "Crear pedido"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
        </div>
      </main>
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

const DEFAULT_PRODUCT_IMAGE =
  "https://lh3.googleusercontent.com/aida/ADBb0ujPRlDhmfz9_Rv7T-35YJsADE0XiCfeW41zZglrucwbCZEA99biOe_kdCW3cY8iJ9Ny4RPKMQCdo-qYOz4tPe1MhwDRdz8gR0UyMI_guqScroLIHvaZXQOZ29jrUIU0fARi1J4ONWzvx2hkIDCgUAKA4BvOfYumzRPWHKwVAWASA2E32NCvDD0PZ-Q6JjhJynhWrPM9YWxXzQVA-h19p86KSVuZwoHFwnXOGsAc5HGeuoCthu15nPjik_p8EVIklMOrx34Qb5Bg9Q";

function formatEuro(cents: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents / 100);
}

function priceForProduct(productId: string) {
  // Stable demo pricing derived from UUID string, 199€–1499€.
  let acc = 0;
  for (let i = 0; i < productId.length; i += 1) acc = (acc * 31 + productId.charCodeAt(i)) >>> 0;
  const euros = 199 + (acc % 1301);
  return euros * 100;
}
