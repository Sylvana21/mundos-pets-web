import { useEffect, useState } from "react";
import { Lock, RefreshCw, Phone, Mail, MapPin, PawPrint } from "lucide-react";
import {
  listAppointments,
  updateAppointmentStatus,
  type Appointment,
} from "../lib/appointments";
import { formatSlot12h } from "../lib/availability";

const ADMIN_KEY = "mundogs_admin_unlocked";
// Cambia esta clave por la que tú quieras usar para entrar al panel.
const ADMIN_PASSWORD = "mundogs2026";

const STATUS_STYLES: Record<Appointment["status"], string> = {
  pendiente: "bg-amber-100 text-amber-700",
  confirmada: "bg-mint/25 text-mint-deep",
  completada: "bg-ink/10 text-ink/60",
  cancelada: "bg-red-100 text-red-600",
};

export default function Admin() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(ADMIN_KEY) === "1"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"todas" | Appointment["status"]>("todas");

  async function load() {
    setLoading(true);
    const { data } = await listAppointments();
    setAppointments(data);
    setLoading(false);
  }

  useEffect(() => {
    if (unlocked) load();
  }, [unlocked]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_KEY, "1");
      setUnlocked(true);
      setError("");
    } else {
      setError("Clave incorrecta.");
    }
  }

  async function handleStatusChange(id: string, status: Appointment["status"]) {
    await updateAppointmentStatus(id, status);
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  }

  if (!unlocked) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col items-center justify-center px-5 text-center">
        <Lock className="h-10 w-10 text-ink/30" />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">
          Panel de Mundogs & Pets
        </h1>
        <p className="mt-1 text-sm text-ink/50">
          Acceso solo para el equipo del negocio.
        </p>
        <form onSubmit={handleLogin} className="mt-6 w-full space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Clave de acceso"
            className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
          />
          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-ink py-3 font-display text-sm font-bold text-cream hover:bg-grape"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  const filtered =
    filter === "todas"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">
            Citas agendadas
          </h1>
          <p className="text-sm text-ink/50">
            {appointments.length} cita{appointments.length !== 1 && "s"} en total
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/70 hover:border-ink/30"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Actualizar
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(["todas", "pendiente", "confirmada", "completada", "cancelada"] as const).map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold capitalize transition-colors ${
                filter === f
                  ? "bg-ink text-cream"
                  : "bg-ink/5 text-ink/60 hover:bg-ink/10"
              }`}
            >
              {f}
            </button>
          )
        )}
      </div>

      <div className="mt-6 space-y-4">
        {filtered.length === 0 && (
          <p className="rounded-2xl bg-cream-soft p-8 text-center text-sm text-ink/50">
            No hay citas en esta categoría todavía.
          </p>
        )}

        {filtered.map((a) => {
          const dateLabel = new Date(a.date + "T00:00:00").toLocaleDateString(
            "es-MX",
            { weekday: "short", day: "numeric", month: "short" }
          );
          return (
            <div
              key={a.id}
              className="rounded-2xl border border-ink/5 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <PawPrint className="h-4 w-4 text-mint-deep" />
                    <p className="font-display text-base font-bold text-ink">
                      {a.pet_name}{" "}
                      <span className="font-normal text-ink/50">
                        ({a.pet_species}{a.pet_breed ? `, ${a.pet_breed}` : ""}, {a.pet_size})
                      </span>
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-grape">
                    {a.service_name}
                  </p>
                  <p className="text-sm text-ink/60">
                    {dateLabel} · {formatSlot12h(a.time)} ·{" "}
                    {a.location_type === "local"
                      ? "En el local"
                      : a.location_type === "movil"
                      ? "Estética móvil"
                      : "TaxiPet"}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${STATUS_STYLES[a.status]}`}
                >
                  {a.status}
                </span>
              </div>

              <div className="mt-3 grid gap-1.5 border-t border-ink/5 pt-3 text-sm text-ink/65 sm:grid-cols-2">
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" /> {a.owner_name} — {a.owner_phone}
                </p>
                {a.owner_email && (
                  <p className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" /> {a.owner_email}
                  </p>
                )}
                {a.address && (
                  <p className="flex items-center gap-2 sm:col-span-2">
                    <MapPin className="h-3.5 w-3.5" /> {a.address}
                  </p>
                )}
                {a.notes && (
                  <p className="sm:col-span-2 italic text-ink/50">"{a.notes}"</p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/5 pt-3">
                {(["pendiente", "confirmada", "completada", "cancelada"] as const).map(
                  (s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(a.id, s)}
                      disabled={a.status === s}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize transition-colors ${
                        a.status === s
                          ? "cursor-default bg-ink/10 text-ink/40"
                          : "bg-ink/5 text-ink/70 hover:bg-mint/20 hover:text-mint-deep"
                      }`}
                    >
                      Marcar {s}
                    </button>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
