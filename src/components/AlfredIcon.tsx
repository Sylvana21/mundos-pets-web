type AlfredIconProps = { className?: string };

export default function AlfredIcon({ className = "" }: AlfredIconProps) {
  return (
    <svg viewBox="0 0 120 130" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">

      {/* ── OREJAS (detrás de la cabeza) ── */}
      {/* Oreja izquierda - larga y caída, tipo Cocker Spaniel */}
      <ellipse cx="28" cy="52" rx="13" ry="22" fill="#8B5E3C" transform="rotate(-8 28 52)" />
      <ellipse cx="28" cy="54" rx="8" ry="16" fill="#A0714F" transform="rotate(-8 28 54)" />
      {/* Oreja derecha */}
      <ellipse cx="92" cy="52" rx="13" ry="22" fill="#8B5E3C" transform="rotate(8 92 52)" />
      <ellipse cx="92" cy="54" rx="8" ry="16" fill="#A0714F" transform="rotate(8 92 54)" />

      {/* ── CABEZA ── */}
      <ellipse cx="60" cy="50" rx="32" ry="30" fill="#C8955A" />

      {/* Manchas de color más oscuro en la cabeza */}
      <ellipse cx="42" cy="48" rx="12" ry="14" fill="#8B5E3C" opacity="0.5" />
      <ellipse cx="65" cy="36" rx="9" ry="8" fill="#8B5E3C" opacity="0.3" />

      {/* ── FRENTE / CEJA zona ── */}
      {/* Cejas expresivas y arqueadas — dan expresión de elegancia */}
      <path d="M38 33 Q46 28 52 32" fill="none" stroke="#4A2E10" strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M68 32 Q74 28 82 33" fill="none" stroke="#4A2E10" strokeWidth="2.8" strokeLinecap="round"/>

      {/* ── OJOS ── */}
      {/* Ojo izquierdo */}
      <circle cx="45" cy="45" r="8" fill="white" />
      <circle cx="45" cy="45" r="5.5" fill="#3D2007" />
      <circle cx="45" cy="45" r="3" fill="#1A0A00" />
      <circle cx="47" cy="43" r="1.8" fill="white" />
      <circle cx="43.5" cy="46.5" r="0.8" fill="white" opacity="0.6" />
      {/* Ojo derecho */}
      <circle cx="75" cy="45" r="8" fill="white" />
      <circle cx="75" cy="45" r="5.5" fill="#3D2007" />
      <circle cx="75" cy="45" r="3" fill="#1A0A00" />
      <circle cx="77" cy="43" r="1.8" fill="white" />
      <circle cx="73.5" cy="46.5" r="0.8" fill="white" opacity="0.6" />

      {/* ── HOCICO ── */}
      <ellipse cx="60" cy="63" rx="16" ry="12" fill="#E8B07A" />
      {/* Nariz */}
      <ellipse cx="60" cy="57" rx="6" ry="4.5" fill="#2C1500" />
      <ellipse cx="58.5" cy="55.8" rx="2" ry="1.2" fill="white" opacity="0.4" />
      {/* Línea del hocico */}
      <path d="M60 61 L60 65" stroke="#B07848" strokeWidth="1.5" strokeLinecap="round" />
      {/* Sonrisa */}
      <path d="M50 66 Q60 73 70 66" fill="none" stroke="#B07848" strokeWidth="2" strokeLinecap="round" />
      {/* Bigotes elegantes */}
      <line x1="24" y1="60" x2="44" y2="63" stroke="#4A2E10" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
      <line x1="24" y1="65" x2="44" y2="65" stroke="#4A2E10" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
      <line x1="76" y1="63" x2="96" y2="60" stroke="#4A2E10" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
      <line x1="76" y1="65" x2="96" y2="65" stroke="#4A2E10" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />

      {/* ── CUELLO Y CAMISA ── */}
      <rect x="38" y="76" width="44" height="8" rx="4" fill="#F5F0E8" />

      {/* ── CUERPO / SACO ── */}
      <rect x="30" y="82" width="60" height="38" rx="12" fill="#1A1A1A" />
      {/* Solapa izquierda del saco */}
      <path d="M60 84 L38 84 L34 96 L50 90 Z" fill="#252525" />
      {/* Solapa derecha */}
      <path d="M60 84 L82 84 L86 96 L70 90 Z" fill="#252525" />
      {/* Camisa blanca entre solapas */}
      <path d="M50 90 L60 84 L70 90 L60 110 Z" fill="#F5F0E8" />
      {/* Botones de la camisa */}
      <circle cx="60" cy="95" r="1.5" fill="#DDD" />
      <circle cx="60" cy="101" r="1.5" fill="#DDD" />
      <circle cx="60" cy="107" r="1.5" fill="#DDD" />

      {/* ── CORBATÍN / PAJARITA ── */}
      {/* Lazo izquierdo */}
      <path d="M60 87 L46 82 L46 92 Z" fill="#8FD4C1" />
      {/* Lazo derecho */}
      <path d="M60 87 L74 82 L74 92 Z" fill="#8FD4C1" />
      {/* Nudo central */}
      <circle cx="60" cy="87" r="4.5" fill="#5fae9b" />
      <circle cx="60" cy="87" r="2" fill="#8FD4C1" opacity="0.6" />

      {/* ── DETALLE: bolsillo en el saco ── */}
      <rect x="72" y="92" width="12" height="10" rx="3" fill="none" stroke="#333" strokeWidth="1.2" />
      {/* Pañuelo en el bolsillo */}
      <path d="M73 92 Q78 88 83 92" fill="#8FD4C1" opacity="0.7" />

    </svg>
  );
}
