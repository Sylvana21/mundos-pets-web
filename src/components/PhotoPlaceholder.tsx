import Paw from "./Paw";

type PhotoPlaceholderProps = {
  className?: string;
  label?: string;
};

/**
 * Espacio reservado para una foto real de Mundogs & Pets.
 * Para reemplazarlo: agrega tu imagen en /public/images/gallery/
 * y cambia este componente por una <img src="/images/gallery/tu-foto.jpg" />
 * en el lugar donde se está usando.
 */
export default function PhotoPlaceholder({
  className = "",
  label = "Foto próximamente",
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-mint/25 via-cream-soft to-grape/10 ${className}`}
    >
      <Paw className="h-8 w-8 text-mint-deep/60" />
      <span className="font-display text-xs font-bold uppercase tracking-wide text-ink/35">
        {label}
      </span>
    </div>
  );
}
