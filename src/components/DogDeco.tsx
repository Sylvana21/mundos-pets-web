/**
 * Perrito decorativo sin fondo — para usar como elemento visual sutil.
 * Pasa opacity/size via className.
 */
type DogDecoProps = {
  className?: string;
  variant?: "sitting" | "running" | "sniffing";
};

export default function DogDeco({ className = "", variant = "sitting" }: DogDecoProps) {
  if (variant === "running") {
    return (
      <svg viewBox="0 0 120 80" className={className} fill="currentColor" aria-hidden="true">
        {/* cuerpo */}
        <ellipse cx="60" cy="48" rx="28" ry="16" />
        {/* cabeza */}
        <circle cx="88" cy="34" r="14" />
        {/* oreja izq */}
        <ellipse cx="82" cy="22" rx="5" ry="8" transform="rotate(-20 82 22)" opacity="0.85" />
        {/* oreja der */}
        <ellipse cx="96" cy="20" rx="4" ry="7" transform="rotate(15 96 20)" opacity="0.85" />
        {/* hocico */}
        <ellipse cx="100" cy="37" rx="6" ry="4.5" opacity="0.75" />
        {/* nariz */}
        <circle cx="105" cy="35" r="2" opacity="0.9" />
        {/* cola */}
        <path d="M32 42 Q14 28 18 18 Q22 10 28 16" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        {/* patas delanteras */}
        <rect x="78" y="60" width="7" height="18" rx="4" />
        <rect x="88" y="62" width="7" height="16" rx="4" />
        {/* patas traseras */}
        <rect x="40" y="60" width="7" height="18" rx="4" />
        <rect x="50" y="62" width="7" height="16" rx="4" />
      </svg>
    );
  }

  if (variant === "sniffing") {
    return (
      <svg viewBox="0 0 100 90" className={className} fill="currentColor" aria-hidden="true">
        {/* cuerpo inclinado */}
        <ellipse cx="50" cy="55" rx="26" ry="14" transform="rotate(-15 50 55)" />
        {/* cabeza abajo */}
        <circle cx="76" cy="66" r="13" />
        {/* orejas */}
        <ellipse cx="68" cy="56" rx="5" ry="9" transform="rotate(-30 68 56)" opacity="0.85" />
        <ellipse cx="82" cy="57" rx="4" ry="7" transform="rotate(10 82 57)" opacity="0.85" />
        {/* hocico al suelo */}
        <ellipse cx="86" cy="72" rx="6" ry="4" opacity="0.75" />
        <circle cx="90" cy="70" r="2" opacity="0.9" />
        {/* cola arriba */}
        <path d="M26 48 Q10 30 16 18 Q20 10 26 18" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        {/* patas */}
        <rect x="68" y="76" width="7" height="14" rx="4" />
        <rect x="78" y="76" width="7" height="14" rx="4" />
        <rect x="36" y="64" width="7" height="16" rx="4" />
        <rect x="46" y="64" width="7" height="16" rx="4" />
      </svg>
    );
  }

  // sitting (default)
  return (
    <svg viewBox="0 0 80 100" className={className} fill="currentColor" aria-hidden="true">
      {/* cuerpo */}
      <ellipse cx="40" cy="66" rx="22" ry="18" />
      {/* cabeza */}
      <circle cx="40" cy="36" r="18" />
      {/* orejas caídas */}
      <ellipse cx="24" cy="26" rx="7" ry="12" transform="rotate(-15 24 26)" opacity="0.85" />
      <ellipse cx="56" cy="26" rx="7" ry="12" transform="rotate(15 56 26)" opacity="0.85" />
      {/* ojos */}
      <circle cx="34" cy="33" r="3" fill="white" opacity="0.9" />
      <circle cx="46" cy="33" r="3" fill="white" opacity="0.9" />
      <circle cx="34.8" cy="33.8" r="1.5" fill="#161616" />
      <circle cx="46.8" cy="33.8" r="1.5" fill="#161616" />
      {/* hocico */}
      <ellipse cx="40" cy="42" rx="6" ry="4" opacity="0.75" />
      <circle cx="40" cy="40" r="2" fill="#161616" opacity="0.9" />
      {/* sonrisa */}
      <path d="M35 45 q5 3 10 0" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* patas sentado */}
      <rect x="28" y="80" width="9" height="16" rx="5" />
      <rect x="43" y="80" width="9" height="16" rx="5" />
      {/* colita */}
      <path d="M60 62 Q74 54 70 44" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}
