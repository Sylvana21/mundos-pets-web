import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import { BUSINESS, SCHEDULE } from "../lib/business";
import Paw from "./Paw";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.46 1.36 4.92L2 22l5.27-1.39a9.86 9.86 0 0 0 4.77 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.13-2.9-7C17.18 3.03 14.7 2 12.04 2Zm0 1.67c2.23 0 4.33.87 5.9 2.44a8.23 8.23 0 0 1 2.43 5.8c0 4.56-3.72 8.27-8.29 8.27h-.01a8.3 8.3 0 0 1-4.21-1.15l-.3-.18-3.13.82.84-3.04-.2-.31a8.21 8.21 0 0 1-1.27-4.41c0-4.56 3.72-8.24 8.24-8.24Zm-4.6 4.37c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.13.17 1.71 2.7 4.21 3.69 2.08.83 2.5.66 2.95.62.45-.04 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28-.25-.13-1.46-.72-1.69-.8-.23-.08-.39-.13-.56.13-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.44-.06-.13-.56-1.37-.78-1.87-.2-.49-.41-.42-.56-.43-.14-.01-.31-.01-.47-.01Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Mundogs & Pets"
              className="h-14 w-14 object-contain"
            />
            <div>
              <p className="font-display text-lg font-bold">{BUSINESS.name}</p>
              <p className="text-xs text-cream/60">Desde {BUSINESS.since}</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            {BUSINESS.slogan}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-mint transition-colors hover:bg-mint hover:text-ink"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={BUSINESS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-mint transition-colors hover:bg-mint hover:text-ink"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide text-mint">
            Horarios
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-cream/75">
            {SCHEDULE.map((s) => (
              <li key={s.day} className="flex justify-between gap-4">
                <span className={s.closed ? "text-cream/40" : ""}>{s.day}</span>
                <span className={s.closed ? "text-cream/40" : ""}>{s.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wide text-mint">
            Visítanos
          </p>
          <div className="mt-4 flex gap-2 text-sm text-cream/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
            <p>
              {BUSINESS.address.line}
              <br />
              {BUSINESS.address.cityLine}
            </p>
          </div>
          <div className="mt-3 flex gap-2 text-sm text-cream/75">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
            <p>Cobertura: {BUSINESS.coverageArea}</p>
          </div>
          <Link
            to="/agendar"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 font-display text-sm font-bold text-ink hover:bg-lime"
          >
            <Paw className="h-4 w-4" />
            Agenda tu cita
          </Link>
        </div>
      </div>

      <div className="border-t border-cream/10 px-5 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {BUSINESS.name}. Hecho con cariño para los peludos de {BUSINESS.coverageArea}.
      </div>
    </footer>
  );
}
