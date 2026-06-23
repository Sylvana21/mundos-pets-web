const WEEKDAY_HOURS: Record<number, { start: string; end: string } | null> = {
  0: null, // domingo cerrado
  1: { start: "09:30", end: "17:30" },
  2: { start: "09:30", end: "17:30" },
  3: { start: "09:30", end: "17:30" },
  4: { start: "09:30", end: "17:30" },
  5: { start: "09:30", end: "17:30" },
  6: { start: "09:30", end: "16:00" },
};

const SLOT_MINUTES = 30; // cada 30 minutos

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(mins: number): string {
  const h = Math.floor(mins / 60).toString().padStart(2, "0");
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

// === BLOQUEO DE HORARIOS ===
// Clave de localStorage para horarios bloqueados manualmente desde el admin
const BLOCKED_KEY = "mundogs_blocked_slots";

export type BlockedSlots = Record<string, string[]>; // { "2025-07-10": ["10:00","10:30"] }

export function getBlockedSlots(): BlockedSlots {
  try {
    const raw = localStorage.getItem(BLOCKED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveBlockedSlots(slots: BlockedSlots): void {
  localStorage.setItem(BLOCKED_KEY, JSON.stringify(slots));
}

export function isSlotBlocked(date: string, time: string): boolean {
  const blocked = getBlockedSlots();
  return (blocked[date] ?? []).includes(time);
}

export function toggleBlockedSlot(date: string, time: string): void {
  const blocked = getBlockedSlots();
  const daySlots = blocked[date] ?? [];
  if (daySlots.includes(time)) {
    blocked[date] = daySlots.filter((t) => t !== time);
  } else {
    blocked[date] = [...daySlots, time];
  }
  saveBlockedSlots(blocked);
}
