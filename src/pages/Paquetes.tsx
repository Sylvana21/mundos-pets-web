import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { PACKAGES } from "../lib/business";
import Paw from "../components/Paw";

const ACCENTS = {
  grape: {
    badge: "bg-grape/15 text-grape",
    icon: "bg-grape text-cream",
    button: "bg-grape text-cream hover:bg-grape-deep",
  },
  lime: {
    badge: "bg-lime/25 text-lime-deep",
    icon: "bg-lime text-ink",
    button: "bg-lime text-ink hover:bg-lime-deep",
  },
};

export default function Paquetes() {
  return (
    <div>
      <section className="bg-ink py-14 text-cream">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-mint">
            Paquetes
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold">
            Bienestar completo, en un solo paquete
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-cream/70">
            Más que estética, es bienestar que se nota — combina varios
            servicios en una sola visita.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-8 md:grid-cols-2">
          {PACKAGES.map((pkg) => {
            const accent = ACCENTS[pkg.accent];
            return (
              <div
                key={pkg.id}
                className="flex flex-col rounded-3xl border border-ink/5 bg-white p-8 shadow-sm"
              >
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-wide ${accent.badge}`}
                >
                  Paquete
                </span>
                <h2 className="mt-4 font-display text-2xl font-extrabold text-ink">
                  {pkg.name}
                </h2>
                <p className="mt-1.5 text-sm text-ink/60">{pkg.description}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink/75">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent.icon}`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center justify-between border-t border-ink/5 pt-6">
                  <span className="text-sm font-semibold text-ink/50">
                    Precio según tamaño y raza
                  </span>
                  <Link
                    to="/agendar"
                    state={{ packageId: pkg.id }}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-bold transition-colors ${accent.button}`}
                  >
                    Quiero este <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center gap-3 rounded-2xl bg-cream-soft p-6 text-sm leading-relaxed text-ink/70">
          <Paw className="h-5 w-5 shrink-0 text-mint-deep" />
          <p>
            Pregúntanos por WhatsApp el precio exacto de cada paquete según el
            tamaño y la raza de tu mascota.
          </p>
        </div>
      </section>
    </div>
  );
}
