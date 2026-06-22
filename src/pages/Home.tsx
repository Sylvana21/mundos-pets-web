import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { BUSINESS, SERVICES } from "../lib/business";
import ServiceIcon from "../components/ServiceIcon";
import Paw from "../components/Paw";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="paw-texture pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--color-mint)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint/15 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-mint">
              <Paw className="h-3.5 w-3.5" /> Desde {BUSINESS.since} en {BUSINESS.coverageArea}
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
              {BUSINESS.tagline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-cream/75">
              {BUSINESS.slogan}
            </p>
            <p className="mt-2 text-sm text-cream/55">
              {BUSINESS.subtagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/agendar"
                className="inline-flex items-center gap-2 rounded-full bg-mint px-7 py-3.5 font-display text-base font-bold text-ink transition-transform hover:scale-105 hover:bg-lime"
              >
                Agenda tu cita <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 font-display text-base font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Escríbenos
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-full blur-2xl"
                style={{ background: "var(--color-mint)", opacity: 0.25 }}
              />
              <img
                src="/images/logo.png"
                alt="Mundogs & Pets"
                className="h-64 w-64 object-contain drop-shadow-2xl sm:h-80 sm:w-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DOS MODALIDADES */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-mint-deep">
            Cómo te atendemos
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-ink">
            Dos formas de cuidar a tu peludo
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-ink/5 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/20 text-mint-deep">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-ink">
              Nuestras instalaciones
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Visítanos en nuestro local en San Gaspar Tlahuelilpan para baño,
              corte o spa. Si no puedes trasladar a tu mascota, pide{" "}
              <strong>TaxiPet</strong> y nosotros vamos por ella.
            </p>
          </div>
          <div className="rounded-3xl border border-ink/5 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-grape/15 text-grape">
              <ServiceIcon icon="truck" className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-ink">
              Estética móvil
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Nuestra camioneta-estética llega hasta tu domicilio y bañamos a
              tu mascota ahí mismo, sin que tengas que salir de casa.
              Disponible en {BUSINESS.coverageArea}.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICIOS PREVIEW */}
      <section className="bg-cream-soft py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-mint-deep">
                Nuestros servicios
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-ink">
                Todo lo que tu mascota necesita
              </h2>
            </div>
            <Link
              to="/servicios"
              className="inline-flex items-center gap-1 font-display text-sm font-bold text-grape hover:underline"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                to="/servicios"
                className="group rounded-3xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/20 text-mint-deep transition-colors group-hover:bg-mint group-hover:text-ink">
                  <ServiceIcon icon={s.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  {s.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                  {s.shortDescription}
                </p>

              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-mint-deep">
            Nuestros clientes
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-ink">
            Peludos felices, dueños tranquilos
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { src: "/images/gallery/perro1.jpg", alt: "Pomerania en la estética móvil" },
            { src: "/images/gallery/perro2.jpg", alt: "Goldendoodle recién bañado" },
            { src: "/images/gallery/perro3.jpg", alt: "Familia de Pomeranias con paliacate" },
            { src: "/images/gallery/perro4.jpg", alt: "Corgi y Shih Tzu en Mundogs" },
            { src: "/images/gallery/perro5.jpg", alt: "Corgi cowboy en Mundogs" },
          ].map((photo) => (
            <div key={photo.src} className="group relative overflow-hidden rounded-2xl aspect-square">
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-center text-cream">
          <div className="paw-texture pointer-events-none absolute inset-0" />
          <Star className="mx-auto h-8 w-8 text-mint" />
          <h2 className="relative mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Tu peludo se merece un día especial
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-cream/70">
            Agenda en línea, elige el servicio y la modalidad que mejor te
            quede. Sin llamadas, sin esperas.
          </p>
          <Link
            to="/agendar"
            className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-mint px-8 py-3.5 font-display text-base font-bold text-ink transition-transform hover:scale-105 hover:bg-lime"
          >
            Agendar ahora <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
