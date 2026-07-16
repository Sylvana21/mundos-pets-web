type AlfredIconProps = { className?: string };

export default function AlfredIcon({ className = "" }: AlfredIconProps) {
  return (
    <svg viewBox="0 0 120 130" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">

      {/* ── CUERPO / TRAJE ── */}
      <rect x="30" y="88" width="60" height="38" rx="12" fill="#1A1A1A"/>
      {/* Camisa blanca */}
      <polygon points="60,90 44,102 60,108 76,102" fill="white"/>
      {/* Solapa izquierda */}
      <polygon points="60,90 30,90 30,106 44,102" fill="#1A1A1A"/>
      {/* Solapa derecha */}
      <polygon points="60,90 90,90 90,106 76,102" fill="#1A1A1A"/>
      {/* Corbatín izquierdo */}
      <polygon points="60,99 47,93 47,105" fill="#8FD4C1"/>
      {/* Corbatín derecho */}
      <polygon points="60,99 73,93 73,105" fill="#8FD4C1"/>
      {/* Nudo del corbatín */}
      <circle cx="60" cy="99" r="4" fill="#5fae9b"/>
      {/* Botones de camisa */}
      <circle cx="60" cy="110" r="1.5" fill="#ddd"/>
      <circle cx="60" cy="116" r="1.5" fill="#ddd"/>

      {/* ── OREJAS (detrás de la cabeza) ── */}
      {/* Oreja izquierda — larga y caída, tipo Cocker */}
      <ellipse cx="28" cy="58" rx="11" ry="22" fill="#C8884A" transform="rotate(-12 28 58)"/>
      <ellipse cx="28" cy="60" rx="6" ry="16" fill="#E8A870" opacity="0.7" transform="rotate(-12 28 60)"/>
      {/* Oreja derecha */}
      <ellipse cx="92" cy="58" rx="11" ry="22" fill="#C8884A" transform="rotate(12 92 58)"/>
      <ellipse cx="92" cy="60" rx="6" ry="16" fill="#E8A870" opacity="0.7" transform="rotate(12 92 60)"/>

      {/* ── CABEZA ── */}
      <ellipse cx="60" cy="52" rx="32" ry="30" fill="#F0C878"/>
      {/* Manchas café en cabeza */}
      <ellipse cx="42" cy="50" rx="12" ry="14" fill="#C8884A" opacity="0.6"/>
      <ellipse cx="74" cy="44" rx="9" ry="10" fill="#C8884A" opacity="0.4"/>

      {/* ── CEJAS expresivas, arqueadas ── */}
      <path d="M38 34 Q46 29 52 33" fill="none" stroke="#6B3A1F" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M68 33 Q74 29 82 34" fill="none" stroke="#6B3A1F" strokeWidth="2.5" strokeLinecap="round"/>

      {/* ── OJOS grandes y expresivos ── */}
      {/* Ojo izquierdo */}
      <circle cx="44" cy="48" r="8" fill="white"/>
      <circle cx="44" cy="48" r="5.5" fill="#3D1F0A"/>
      <circle cx="44" cy="48" r="3" fill="#1A0A00"/>
      <circle cx="46" cy="46" r="1.8" fill="white"/>
      <circle cx="42.5" cy="46.5" r="0.8" fill="white" opacity="0.6"/>
      {/* Ojo derecho */}
      <circle cx="76" cy="48" r="8" fill="white"/>
      <circle cx="76" cy="48" r="5.5" fill="#3D1F0A"/>
      <circle cx="76" cy="48" r="3" fill="#1A0A00"/>
      <circle cx="78" cy="46" r="1.8" fill="white"/>
      <circle cx="74.5" cy="46.5" r="0.8" fill="white" opacity="0.6"/>

      {/* ── HOCICO ── */}
      <ellipse cx="60" cy="64" rx="14" ry="10" fill="#E8B870"/>
      {/* Línea central del hocico */}
      <line x1="60" y1="60" x2="60" y2="68" stroke="#C8884A" strokeWidth="1.2" opacity="0.5"/>
      {/* Nariz */}
      <ellipse cx="60" cy="58" rx="5.5" ry="4" fill="#2A1A0A"/>
      <ellipse cx="58.5" cy="56.5" rx="1.8" ry="1.2" fill="white" opacity="0.5"/>
      {/* Sonrisa */}
      <path d="M48 68 Q60 76 72 68" fill="none" stroke="#C8884A" strokeWidth="2" strokeLinecap="round"/>
      {/* Lengüita */}
      <ellipse cx="60" cy="73" rx="5" ry="4" fill="#E05060"/>
      <line x1="60" y1="70" x2="60" y2="76" stroke="#C04050" strokeWidth="1" opacity="0.5"/>

      {/* ── BIGOTES ── */}
      <line x1="30" y1="62" x2="46" y2="65" stroke="#8B6040" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
      <line x1="30" y1="67" x2="46" y2="67" stroke="#8B6040" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
      <line x1="30" y1="72" x2="46" y2="69" stroke="#8B6040" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
      <line x1="74" y1="65" x2="90" y2="62" stroke="#8B6040" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
      <line x1="74" y1="67" x2="90" y2="67" stroke="#8B6040" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
      <line x1="74" y1="69" x2="90" y2="72" stroke="#8B6040" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>

    </svg>
  );
}
