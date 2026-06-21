import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { BUSINESS } from "../lib/business";

const LINKS = [
  { to: "/servicios", label: "Servicios" },
  { to: "/paquetes", label: "Paquetes" },
  { to: "/ubicacion", label: "Ubicación" },
  { to: "/nosotros", label: "Nosotros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "bg-ink/95 backdrop-blur shadow-lg shadow-black/20"
          : "bg-ink"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/images/logo.png"
            alt="Mundogs & Pets"
            className="h-12 w-12 object-contain"
          />
          <span className="font-display text-lg font-bold text-cream leading-tight">
            {BUSINESS.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-display text-sm font-semibold tracking-wide transition-colors ${
                  isActive ? "text-mint" : "text-cream/80 hover:text-mint"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/agendar"
            className="rounded-full bg-mint px-5 py-2.5 font-display text-sm font-bold text-ink transition-transform hover:scale-105 hover:bg-lime"
          >
            Agendar cita
          </Link>
        </nav>

        <button
          className="text-cream md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-cream/10 bg-ink px-5 pb-5 md:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 font-display text-base font-semibold ${
                    isActive ? "bg-mint/15 text-mint" : "text-cream/85"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/agendar"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-mint px-5 py-3 text-center font-display text-base font-bold text-ink"
            >
              Agendar cita
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
