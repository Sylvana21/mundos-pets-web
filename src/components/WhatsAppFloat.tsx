import { BUSINESS } from "../lib/business";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${BUSINESS.whatsapp.number}?text=${encodeURIComponent(
        "¡Hola! Vengo de la página de Mundogs & Pets 🐾"
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-110"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.46 1.36 4.92L2 22l5.27-1.39a9.86 9.86 0 0 0 4.77 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.13-2.9-7C17.18 3.03 14.7 2 12.04 2Zm0 1.67c2.23 0 4.33.87 5.9 2.44a8.23 8.23 0 0 1 2.43 5.8c0 4.56-3.72 8.27-8.29 8.27h-.01a8.3 8.3 0 0 1-4.21-1.15l-.3-.18-3.13.82.84-3.04-.2-.31a8.21 8.21 0 0 1-1.27-4.41c0-4.56 3.72-8.24 8.24-8.24Zm-4.6 4.37c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.13.17 1.71 2.7 4.21 3.69 2.08.83 2.5.66 2.95.62.45-.04 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28-.25-.13-1.46-.72-1.69-.8-.23-.08-.39-.13-.56.13-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.44-.06-.13-.56-1.37-.78-1.87-.2-.49-.41-.42-.56-.43-.14-.01-.31-.01-.47-.01Z" />
      </svg>
    </a>
  );
}
