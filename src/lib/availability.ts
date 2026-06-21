// Genera los slots de horario disponibles para agendar, basados en el
// horario real del negocio (ver business.ts -> SCHEDULE).

const WEEKDAY_HOURS: Record<number, { start: string; end: string } | null> = {
  0: null, // domingo cerrado
  1: { start: "09:30", end: "17:30" },
  2: { start: "09:30", end: "17:30" },
  3: { start: "09:30", end: "17:30" },
  4: { start: "09:30", end: "17:30" },
  5: { start: "09:30", end: "17:30" },
  6: { start: "09:30", end: "16:00" },
};

const SLOT_MINUTES = 60; // cada cuanto se puede agendar

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(mins: number): string {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function isClosedDate(dateStr: string): boolean {
  const d = new Date(dateStr + "T00:00:00");
  return WEEKDAY_HOURS[d.getDay()] === null;
}

export function getDaySlots(dateStr: string): string[] {
  const d = new Date(dateStr + "T00:00:00");
  const range = WEEKDAY_HOURS[d.getDay()];
  if (!range) return [];

  const start = toMinutes(range.start);
  const end = toMinutes(range.end);
  const slots: string[] = [];
  for (let t = start; t < end; t += SLOT_MINUTES) {
    slots.push(toHHMM(t));
  }
  return slots;
}

export function formatSlot12h(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "p.m." : "a.m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

// Próximos N días a partir de hoy, con su estado (abierto/cerrado)
export function getUpcomingDays(count = 21) {
  const days: { date: string; label: string; closed: boolean }[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("es-MX", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    days.push({ date: dateStr, label, closed: isClosedDate(dateStr) });
  }
  return days;
}
