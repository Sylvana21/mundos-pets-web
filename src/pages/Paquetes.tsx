import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { PACKAGES, BUSINESS } from "../lib/business";
import Paw from "../components/Paw";
import DogDeco from "../components/DogDeco";

export default function Paquetes() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-ink py-14 text-cream">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-mint">
            Paquetes
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold">
            Bienestar completo en un solo servicio
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-cream/70">
            Más que estética, es bienestar que se nota. La cotización es
            personalizada — te la enviamos por WhatsApp al agendar.
          </p>
        </div>
      </section>

      {/* PAQUETES */}
      <section className="mx-auto max-w-5xl px-5 py-14">
        <div className="grid gap-6 md:grid-cols-3 items-start">
          {/* PAQUETE TRADICIONAL */}
          <div className="relative overflow-hidden rounded-3xl bg-ink text-cream shadow-xl">
            {/* Fondo decorativo */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-grape/30 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-mint/20 blur-2xl" />

            <div className="relative p-8">
              {/* Badge */}
              <span className="inline-block rounded-full bg-grape px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-cream">
                {PACKAGES[0].badge}
              </span>

              {/* Título */}
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight">
                Paquete<br />
                <span className="text-grape" style={{ WebkitTextStroke: "1px #7C5CBF" }}>
                  Tradicional
                </span>
              </h2>
              <p className="mt-1 text-sm text-cream/60 italic">
                {PACKAGES[0].tagline}
              </p>

              {/* Divisor con huellitas */}
              <div className="my-5 flex items-center gap-2">
                <div className="h-px flex-1 bg-cream/15" />
                <Paw className="h-4 w-4 text-grape" />
                <Paw className="h-3 w-3 text-grape/60" />
                <div className="h-px flex-1 bg-cream/15" />
              </div>

              {/* Items */}
              <ul className="space-y-3">
                {PACKAGES[0].items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-grape">
                      <Check className="h-3.5 w-3.5 text-cream" strokeWidth={3} />
                    </span>
                    <span className="text-cream/85">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="mt-7 flex items-center justify-between rounded-2xl bg-cream/10 px-5 py-4">
                <p className="text-xs text-cream/50">
                  Cotización personalizada por WhatsApp
                </p>
                <Link
                  to="/agendar"
                  state={{ packageId: PACKAGES[0].id }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-grape px-4 py-2 font-display text-sm font-bold text-cream hover:bg-grape-deep"
                >
                  Agendar <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* FOTO decorativa entre paquetes */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative">
              <div className="h-52 w-52 overflow-hidden rounded-full border-4 border-mint/30 shadow-xl">
                <img
                  src="/images/gallery/perro1.jpg"
                  alt="Perrito feliz en Mundogs & Pets"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-1.5 font-display text-xs font-bold text-mint whitespace-nowrap shadow">
                ¡Peludo feliz! 🐾
              </div>
            </div>
          </div>

          {/* PAQUETE MUNDOGS */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl" style={{ background: "#161616" }}>
            {/* Fondo decorativo */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full blur-2xl" style={{ background: "#C3E94A33" }} />
            <div className="pointer-events-none absolute -bottom-6 left-1/4 h-32 w-32 rounded-full blur-2xl" style={{ background: "#8FD4C133" }} />

            {/* Banda verde lima superior */}
            <div className="h-2 w-full" style={{ background: "linear-gradient(90deg, #C3E94A, #8FD4C1)" }} />

            <div className="relative p-8">
              {/* Badge */}
              <span
                className="inline-block rounded-full px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-ink"
                style={{ background: "#C3E94A" }}
              >
                {PACKAGES[1].badge}
              </span>

              {/* Título */}
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-cream">
                Paquete<br />
                <span style={{ color: "#C3E94A" }}>MunDogs</span>
              </h2>
              <p className="mt-1 text-sm italic text-cream/60">
                {PACKAGES[1].tagline}
              </p>

              {/* Divisor */}
              <div className="my-5 flex items-center gap-2">
                <div className="h-px flex-1 bg-cream/15" />
                <Paw className="h-4 w-4 text-lime" />
                <Paw className="h-3 w-3 text-lime opacity-60" />
                <div className="h-px flex-1 bg-cream/15" />
              </div>

              {/* Items */}
              <ul className="space-y-3">
                {PACKAGES[1].items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "#C3E94A" }}
                    >
                      <Check className="h-3.5 w-3.5 text-ink" strokeWidth={3} />
                    </span>
                    <span className="text-cream/85">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="mt-7 flex items-center justify-between rounded-2xl bg-cream/10 px-5 py-4">
                <p className="text-xs text-cream/50">
                  Cotización personalizada por WhatsApp
                </p>
                <Link
                  to="/agendar"
                  state={{ packageId: PACKAGES[1].id }}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-bold text-ink"
                  style={{ background: "#C3E94A" }}
                >
                  Agendar <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Foto perrito */}
        <div className="mt-10 overflow-hidden rounded-3xl shadow-md">
          <div className="relative h-56 sm:h-72">
            <img
              src="/images/gallery/perro1.jpg"
              alt="Pomerania en la estética Mundogs & Pets"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-6 font-display text-xl font-extrabold text-cream drop-shadow">
              Peludo feliz, dueño tranquilo 🐾
            </p>
          </div>
        </div>

        {/* Perrito deco + Nota cotización */}
        <div className="flex justify-end -mb-2 pr-4">
          <DogDeco variant="sitting" className="h-14 w-12 text-grape/20" />
        </div>
        <div className="mt-2 flex items-start gap-3 rounded-2xl bg-cream-soft p-6 text-sm leading-relaxed text-ink/70">
          <Paw className="mt-0.5 h-5 w-5 shrink-0 text-mint-deep" />
          <p>
            <strong className="text-ink">¿Cuánto cuesta?</strong>{" "}
            {BUSINESS.quote}
          </p>
        </div>
      </section>
    </div>
  );
}
