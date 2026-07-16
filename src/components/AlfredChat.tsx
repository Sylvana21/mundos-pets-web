import { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import AlfredIcon from "./AlfredIcon";
import { BUSINESS } from "../lib/business";
import {
  getAlfredReply,
  ALFRED_GREETING,
  ALFRED_SUGGESTIONS,
} from "../lib/alfred";

type ChatMessage = {
  id: string;
  from: "alfred" | "user";
  text: string;
  suggestWhatsapp?: boolean;
};

export default function AlfredChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !hasOpenedOnce) {
      setMessages([
        { id: crypto.randomUUID(), from: "alfred", text: ALFRED_GREETING },
      ]);
      setHasOpenedOnce(true);
    }
  }, [open, hasOpenedOnce]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      from: "user",
      text: trimmed,
    };
    const reply = getAlfredReply(trimmed);
    const alfredMsg: ChatMessage = {
      id: crypto.randomUUID(),
      from: "alfred",
      text: reply.text,
      suggestWhatsapp: reply.suggestWhatsapp,
    };

    setMessages((prev) => [...prev, userMsg, alfredMsg]);
    setInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cream shadow-lg shadow-black/30 ring-2 ring-ink/10 transition-transform hover:scale-110"
          aria-label="Hablar con Alfred"
        >
          <AlfredIcon className="h-10 w-10" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[28rem] w-[20rem] max-w-[90vw] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-ink/10 sm:right-24 sm:w-80">
          {/* Header */}
          <div className="flex items-center justify-between bg-ink px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cream">
                <AlfredIcon className="h-7 w-7" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-cream">Alfred</p>
                <p className="text-[11px] text-cream/50">Asistente de {BUSINESS.name}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-cream/60 hover:text-cream"
              aria-label="Cerrar chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-cream-soft px-3 py-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-mint text-ink"
                      : "bg-white text-ink/80 shadow-sm"
                  }`}
                >
                  {m.text}
                  {m.suggestWhatsapp && (
                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white hover:opacity-90"
                    >
                      Escribir por WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ALFRED_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-semibold text-ink/60 hover:border-mint-deep hover:text-mint-deep"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-ink/5 bg-white p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 rounded-full border border-ink/10 px-4 py-2 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
            />
            <button
              type="submit"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint text-ink hover:bg-lime"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
