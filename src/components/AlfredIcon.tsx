type AlfredIconProps = {
  className?: string;
};

export default function AlfredIcon({ className = "" }: AlfredIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {/* Cabeza */}
      <circle cx="50" cy="46" r="30" fill="#F2E4C9" />
      {/* Orejas caídas */}
      <ellipse cx="20" cy="42" rx="9" ry="16" fill="#C9A876" transform="rotate(-15 20 42)" />
      <ellipse cx="80" cy="42" rx="9" ry="16" fill="#C9A876" transform="rotate(15 80 42)" />
      {/* Mancha en el ojo */}
      <ellipse cx="32" cy="44" rx="11" ry="13" fill="#C9A876" />
      {/* Ojos */}
      <circle cx="33" cy="46" r="3.4" fill="#1A1A1A" />
      <circle cx="64" cy="46" r="3.4" fill="#1A1A1A" />
      <circle cx="34.2" cy="44.8" r="1" fill="#fff" />
      <circle cx="65.2" cy="44.8" r="1" fill="#fff" />
      {/* Hocico */}
      <ellipse cx="50" cy="60" rx="13" ry="9" fill="#FBF6EA" />
      <ellipse cx="50" cy="55" r="3.2" fill="#1A1A1A" />
      <path d="M50 58 v4" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M44 64 q6 4 12 0" stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Cuello / cuerpo */}
      <rect x="32" y="72" width="36" height="20" rx="8" fill="#F2E4C9" />
      {/* Moño de esmoquin (pajarita) */}
      <path d="M50 80 L38 74 V86 Z" fill="#161616" />
      <path d="M50 80 L62 74 V86 Z" fill="#161616" />
      <circle cx="50" cy="80" r="3.5" fill="#8FD4C1" />
      {/* Cuello blanco de camisa */}
      <path d="M40 72 L50 80 L60 72" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
