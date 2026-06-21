import { Link } from "react-router-dom";
import { Heart, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { BUSINESS } from "../lib/business";

export default function Nosotros() {
  return (
    <div>
      <section className="bg-ink py-14 text-cream">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-mint">
            Nosotros
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold">
            Más que una estética, una experiencia
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14">
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/logo.png"
            alt="Mundogs & Pets"
            className="h-32 w-32 object-contain"
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
            {BUSINESS.slogan}
          </p>
          <p className="mt-3 text-sm font-semibold text-ink/45">
            Cuidando peludos en {BUSINESS.coverageArea} desde {BUSINESS.since}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl bg-cream-soft p-7 text-center">
            <Heart className="mx-auto h-7 w-7 text-grape" />
            <h3 className="mt-4 font-display text-base font-bold text-ink">
              Amor en cada detalle
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              Tratamos a cada mascota como si fuera nuestra, con paciencia y
              cariño en cada servicio.
            </p>
          </div>
          <div className="rounded-3xl bg-cream-soft p-7 text-center">
            <Sparkles className="mx-auto h-7 w-7 text-mint-deep" />
            <h3 className="mt-4 font-display text-base font-bold text-ink">
              Bienestar que se nota
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              No solo limpieza: cuidamos piel, pelo y comodidad de tu mascota
              en todo momento.
            </p>
          </div>
          <div className="rounded-3xl bg-cream-soft p-7 text-center">
            <MapPin className="mx-auto h-7 w-7 text-grape" />
            <h3 className="mt-4 font-display text-base font-bold text-ink">
              Donde tú prefieras
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              En nuestro local, con TaxiPet o con la estética móvil hasta tu
              puerta — tú eliges.
            </p>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/agendar"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-display text-base font-bold text-cream hover:bg-grape"
          >
            Agenda tu cita <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
