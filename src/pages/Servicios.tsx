import DogDeco from "../components/DogDeco";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "../lib/business";
import ServiceIcon from "../components/ServiceIcon";

export default function Servicios() {
  return (
    <div>
      <section className="bg-ink py-14 text-cream">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-mint">
            Servicios
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold">
            Cuidado a la medida de tu mascota
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-cream/70">
            La cotización es personalizada según el tamaño, raza, pelaje y
            condición de tu mascota — te la enviamos por WhatsApp al agendar.
          </p>
        </div>
      </section>

      {/* Perrito decorativo */}
      <div className="flex justify-end max-w-6xl mx-auto px-5 -mb-6">
        <DogDeco variant="sniffing" className="h-16 w-16 text-mint/25" />
      </div>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              className="flex flex-col rounded-3xl border border-ink/5 bg-white p-7 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/20 text-mint-deep">
                  <ServiceIcon icon={s.icon} className="h-6 w-6" />
                </div>
                {s.location === "domicilio-taxipet" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/60">
                    Recogemos y regresamos
                  </span>
                )}
              </div>

              <h2 className="mt-5 font-display text-xl font-bold text-ink">
                {s.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">
                {s.longDescription}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-ink/5 pt-5">
                <span className="text-sm text-ink/50 italic">
                  Cotización por WhatsApp al agendar
                </span>
                <Link
                  to="/agendar"
                  state={{ serviceId: s.id }}
                  className="inline-flex items-center gap-1 font-display text-sm font-bold text-ink hover:text-mint-deep"
                >
                  Agendar <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-cream-soft p-6 text-sm leading-relaxed text-ink/70">
          <strong className="text-ink">Sobre TaxiPet:</strong> es únicamente
          el servicio de traslado — vamos por tu mascota a tu domicilio, la
          llevamos a nuestras instalaciones para el servicio que elijas (baño,
          corte, spa, etc.) y, si lo deseas, la regresamos a casa al
          terminar. El servicio en sí siempre se realiza en el local.
        </div>
      </section>
    </div>
  );
}
