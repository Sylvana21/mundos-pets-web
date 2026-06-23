type AlfredIconProps = { className?: string };

export default function AlfredIcon({ className = "" }: AlfredIconProps) {
  return (
    <svg viewBox="0 0 100 110" className={className} aria-hidden="true">
      {/* === CUERPO / TRAJE === */}
      <rect x="28" y="72" width="44" height="32" rx="10" fill="#1A1A1A" />
      {/* Camisa blanca */}
      <path d="M50 74 L40 86 L50 90 L60 86 Z" fill="white" />
      {/* Solapa izquierda del saco */}
      <path d="M50 74 L28 74 L28 90 L40 86 Z" fill="#1A1A1A" />
      {/* Solapa derecha del saco */}
      <path d="M50 74 L72 74 L72 90 L60 86 Z" fill="#1A1A1A" />
      {/* Moño / pajarita */}
      <path d="M50 83 L41 78 L41 88 Z" fill="#8FD4C1" />
      <path d="M50 83 L59 78 L59 88 Z" fill="#8FD4C1" />
      <circle cx="50" cy="83" r="3.5" fill="#5fae9b" />

      {/* === CABEZA === */}
      <circle cx="50" cy="46" r="26" fill="#F5DEB3" />

      {/* Manchas de color (tipo beagle/spaniel) */}
      <ellipse cx="34" cy="44" rx="10" ry="12" fill="#C8975A" opacity="0.7" />
      <ellipse cx="62" cy="38" rx="7" ry="8" fill="#C8975A" opacity="0.5" />

      {/* Orejas largas caídas — tipo mayordomo elegante */}
      <ellipse cx="24" cy="48" rx="8" ry="18" fill="#C8975A" transform="rotate(-8 24 48)" />
      <ellipse cx="76" cy="48" rx="8" ry="18" fill="#C8975A" transform="rotate(8 76 48)" />
      {/* Interior orejas */}
      <ellipse cx="24" cy="50" rx="4.5" ry="12" fill="#E8B07A" opacity="0.6" transform="rotate(-8 24 50)" />
      <ellipse cx="76" cy="50" rx="4.5" ry="12" fill="#E8B07A" opacity="0.6" transform="rotate(8 76 50)" />

      {/* Cejas arqueadas — expresión inteligente */}
      <path d="M34 30 Q40 26 44 30" fill="none" stroke="#6B4226" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56 30 Q60 26 66 30" fill="none" stroke="#6B4226" strokeWidth="2.5" strokeLinecap="round" />

      {/* Ojos expresivos */}
      <circle cx="38" cy="44" r="5.5" fill="white" />
      <circle cx="62" cy="44" r="5.5" fill="white" />
      <circle cx="39" cy="45" r="3.5" fill="#3D2B1F" />
      <circle cx="63" cy="45" r="3.5" fill="#3D2B1F" />
      {/* Brillo */}
      <circle cx="40.5" cy="43.5" r="1.2" fill="white" />
      <circle cx="64.5" cy="43.5" r="1.2" fill="white" />

      {/* Hocico */}
      <ellipse cx="50" cy="56" rx="10" ry="7" fill="#F0C898" />
      {/* Nariz */}
      <ellipse cx="50" cy="52" rx="4" ry="3" fill="#3D2B1F" />
      <ellipse cx="49" cy="51.5" rx="1.2" ry="0.8" fill="white" opacity="0.5" />
      {/* Sonrisa */}
      <path d="M43 58 Q50 63 57 58" fill="none" stroke="#B07040" strokeWidth="1.8" strokeLinecap="round" />
      {/* Bigotes */}
      <line x1="28" y1="55" x2="40" y2="57" stroke="#6B4226" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="28" y1="59" x2="40" y2="59" stroke="#6B4226" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="60" y1="57" x2="72" y2="55" stroke="#6B4226" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="60" y1="59" x2="72" y2="59" stroke="#6B4226" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
