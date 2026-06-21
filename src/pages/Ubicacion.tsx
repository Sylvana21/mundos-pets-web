import { MapPin, Clock, Truck } from "lucide-react";
import { BUSINESS, SCHEDULE } from "../lib/business";

export default function Ubicacion() {
  const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    BUSINESS.address.mapsQuery
  )}&output=embed`;
  const mapsLinkSrc = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    BUSINESS.address.mapsQuery
  )}`;

  return (
    <div>
      <section className="bg-ink py-14 text-cream">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-mint">
            Ubicación y horarios
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold">
            Visítanos o pídenos a domicilio
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-ink/5 shadow-sm">
              <iframe
                title="Ubicación de Mundogs & Pets"
                src={mapsEmbedSrc}
                className="h-80 w-full sm:h-96"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={mapsLinkSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-display text-sm font-bold text-cream hover:bg-grape"
            >
              <MapPin className="h-4 w-4" /> Cómo llegar
            </a>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-ink/5 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-2 text-mint-deep">
                <MapPin className="h-5 w-5" />
                <p className="font-display text-sm font-bold uppercase tracking-wide">
                  Nuestro local
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">
                {BUSINESS.address.line}
                <br />
                {BUSINESS.address.cityLine}
              </p>
            </div>

            <div className="rounded-3xl border border-ink/5 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-2 text-grape">
                <Truck className="h-5 w-5" />
                <p className="font-display text-sm font-bold uppercase tracking-wide">
                  Estética móvil
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">
                Llegamos hasta tu domicilio en {BUSINESS.coverageArea} con
                nuestra unidad equipada para bañar a tu mascota.
              </p>
            </div>

            <div className="rounded-3xl bg-ink p-7 text-cream shadow-sm">
              <div className="flex items-center gap-2 text-mint">
                <Clock className="h-5 w-5" />
                <p className="font-display text-sm font-bold uppercase tracking-wide">
                  Horarios
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {SCHEDULE.map((s) => (
                  <li
                    key={s.day}
                    className="flex justify-between border-b border-cream/10 pb-2 last:border-0"
                  >
                    <span className={s.closed ? "text-cream/40" : "text-cream/90"}>
                      {s.day}
                    </span>
                    <span
                      className={
                        s.closed ? "text-cream/40" : "font-semibold text-mint"
                      }
                    >
                      {s.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
