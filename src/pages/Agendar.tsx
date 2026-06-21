import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, MapPin, Truck, Car } from "lucide-react";
import { SERVICES, PACKAGES, BUSINESS } from "../lib/business";
import { createAppointment } from "../lib/appointments";
import { getUpcomingDays, getDaySlots, formatSlot12h } from "../lib/availability";
import ServiceIcon from "../components/ServiceIcon";

type LocationType = "local" | "movil" | "taxipet";

const LOCATION_OPTIONS: {
  id: LocationType;
  label: string;
  desc: string;
  icon: typeof MapPin;
}[] = [
  {
    id: "local",
    label: "En el local",
    desc: "Tú llevas a tu mascota a nuestras instalaciones",
    icon: MapPin,
  },
  {
    id: "taxipet",
    label: "TaxiPet",
    desc: "Pasamos por tu mascota y la llevamos al local",
    icon: Car,
  },
  {
    id: "movil",
    label: "Estética móvil",
    desc: "Vamos hasta tu domicilio con la camioneta",
    icon: Truck,
  },
];

const PET_SIZES = [
  { id: "chico", label: "Chico" },
  { id: "mediano", label: "Mediano" },
  { id: "grande", label: "Grande" },
] as const;

export default function Agendar() {
  const location = useLocation();
  const navigate = useNavigate();
  const incoming = location.state as
    | { serviceId?: string; packageId?: string }
    | undefined;

  const days = useMemo(() => getUpcomingDays(21), []);

  const [serviceId, setServiceId] = useState(incoming?.serviceId ?? "");
  const [packageId, setPackageId] = useState(incoming?.packageId ?? "");
  const [locationType, setLocationType] = useState<LocationType>("local");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [petName, setPetName] = useState("");
  const [petSpecies, setPetSpecies] = useState("Perro");
  const [petBreed, setPetBreed] = useState("");
  const [petSize, setPetSize] = useState<"chico" | "mediano" | "grande">("mediano");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableSlots = selectedDate ? getDaySlots(selectedDate) : [];

  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  const needsAddress = locationType === "movil" || locationType === "taxipet";

  const selectedServiceName = serviceId
    ? SERVICES.find((s) => s.id === serviceId)?.name
    : packageId
    ? PACKAGES.find((p) => p.id === packageId)?.name
    : "";

  function validate(): string | null {
    if (!serviceId && !packageId) return "Elige un servicio o paquete.";
    if (!selectedDate) return "Elige una fecha.";
    if (!selectedTime) return "Elige un horario.";
    if (!ownerName.trim()) return "Falta tu nombre.";
    if (!ownerPhone.trim()) return "Falta tu teléfono.";
    if (!petName.trim()) return "Falta el nombre de tu mascota.";
    if (needsAddress && !address.trim())
      return "Falta la dirección para el servicio a domicilio.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }
    setErrorMsg(null);
    setSubmitting(true);

    const { error } = await createAppointment({
      owner_name: ownerName.trim(),
      owner_phone: ownerPhone.trim(),
      owner_email: ownerEmail.trim(),
      pet_name: petName.trim(),
      pet_species: petSpecies,
      pet_breed: petBreed.trim(),
      pet_size: petSize,
      service_id: serviceId || packageId,
      service_name: selectedServiceName || "",
      location_type: locationType,
      address: needsAddress ? address.trim() : null,
      date: selectedDate,
      time: selectedTime,
      notes: notes.trim() || null,
    });

    setSubmitting(false);

    if (error) {
      setErrorMsg(
        "No pudimos guardar tu cita. Intenta de nuevo o escríbenos por WhatsApp."
      );
      return;
    }

    setSuccess(true);
  }

  if (success) {
    const dateObj = new Date(selectedDate + "T00:00:00");
    const dateLabel = dateObj.toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const waText = encodeURIComponent(
      `¡Hola! Acabo de agendar una cita en la página:\n` +
        `Servicio: ${selectedServiceName}\n` +
        `Mascota: ${petName}\n` +
        `Fecha: ${dateLabel} a las ${formatSlot12h(selectedTime)}\n` +
        `¿Me pueden confirmar? Gracias 🐾`
    );

    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center">
        <CheckCircle2 className="h-16 w-16 text-mint-deep" />
        <h1 className="mt-5 font-display text-3xl font-extrabold text-ink">
          ¡Cita registrada!
        </h1>
        <p className="mt-3 text-ink/65">
          Agendamos a <strong>{petName}</strong> para{" "}
          <strong>{selectedServiceName}</strong> el{" "}
          <strong>{dateLabel}</strong> a las{" "}
          <strong>{formatSlot12h(selectedTime)}</strong>.
        </p>
        <p className="mt-2 text-sm text-ink/50">
          Para confirmar tu lugar, mándanos un mensaje por WhatsApp con los
          detalles — te responderemos lo antes posible.
        </p>
        <a
          href={`https://wa.me/${BUSINESS.whatsapp.number}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-display text-base font-bold text-white hover:opacity-90"
        >
          Confirmar por WhatsApp
        </a>
        <button
          onClick={() => navigate("/")}
          className="mt-4 font-display text-sm font-semibold text-ink/50 hover:text-ink"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-ink py-12 text-cream">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-mint">
            Agenda tu cita
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Cuéntanos de tu peludo
          </h1>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl space-y-10 px-5 py-12"
      >
        {/* 1. Servicio */}
        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            1. ¿Qué servicio necesitas?
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => {
                  setServiceId(s.id);
                  setPackageId("");
                }}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                  serviceId === s.id
                    ? "border-mint-deep bg-mint/10"
                    : "border-ink/10 bg-white hover:border-ink/20"
                }`}
              >
                <ServiceIcon icon={s.icon} className="h-5 w-5 shrink-0 text-mint-deep" />
                <span className="font-display text-sm font-bold text-ink">
                  {s.name}
                </span>
              </button>
            ))}
            {PACKAGES.map((p) => (
              <button
                type="button"
                key={p.id}
                onClick={() => {
                  setPackageId(p.id);
                  setServiceId("");
                }}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                  packageId === p.id
                    ? "border-grape bg-grape/10"
                    : "border-ink/10 bg-white hover:border-ink/20"
                }`}
              >
                <span className="font-display text-sm font-bold text-ink">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* 2. Modalidad */}
        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            2. ¿Dónde lo atendemos?
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {LOCATION_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.id}
                onClick={() => setLocationType(opt.id)}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  locationType === opt.id
                    ? "border-mint-deep bg-mint/10"
                    : "border-ink/10 bg-white hover:border-ink/20"
                }`}
              >
                <opt.icon className="h-5 w-5 text-mint-deep" />
                <p className="mt-2 font-display text-sm font-bold text-ink">
                  {opt.label}
                </p>
                <p className="mt-1 text-xs text-ink/55">{opt.desc}</p>
              </button>
            ))}
          </div>
          {needsAddress && (
            <div className="mt-4">
              <label className="block font-display text-sm font-semibold text-ink">
                Dirección para el servicio
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Calle, número, colonia, referencias"
                className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
              />
            </div>
          )}
        </fieldset>

        {/* 3. Fecha y hora */}
        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            3. Elige fecha y hora
          </legend>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {days.map((d) => (
              <button
                type="button"
                key={d.date}
                disabled={d.closed}
                onClick={() => setSelectedDate(d.date)}
                className={`flex shrink-0 flex-col items-center rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                  d.closed
                    ? "cursor-not-allowed border-ink/5 bg-ink/5 text-ink/25"
                    : selectedDate === d.date
                    ? "border-mint-deep bg-mint text-ink"
                    : "border-ink/10 bg-white text-ink/70 hover:border-ink/25"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {selectedDate && (
            <div className="mt-4">
              {availableSlots.length === 0 ? (
                <p className="text-sm text-ink/50">
                  No hay horarios disponibles ese día.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                        selectedTime === slot
                          ? "border-mint-deep bg-mint text-ink"
                          : "border-ink/10 bg-white text-ink/70 hover:border-ink/25"
                      }`}
                    >
                      {formatSlot12h(slot)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </fieldset>

        {/* 4. Datos del dueño y mascota */}
        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            4. Tus datos y los de tu mascota
          </legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-display text-sm font-semibold text-ink">
                Tu nombre
              </label>
              <input
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
                required
              />
            </div>
            <div>
              <label className="block font-display text-sm font-semibold text-ink">
                Teléfono / WhatsApp
              </label>
              <input
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                type="tel"
                className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-display text-sm font-semibold text-ink">
                Correo (opcional)
              </label>
              <input
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                type="email"
                className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
              />
            </div>
            <div>
              <label className="block font-display text-sm font-semibold text-ink">
                Nombre de tu mascota
              </label>
              <input
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
                required
              />
            </div>
            <div>
              <label className="block font-display text-sm font-semibold text-ink">
                Especie
              </label>
              <select
                value={petSpecies}
                onChange={(e) => setPetSpecies(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
              >
                <option>Perro</option>
                <option>Gato</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="block font-display text-sm font-semibold text-ink">
                Raza (si la conoces)
              </label>
              <input
                value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
              />
            </div>
            <div>
              <label className="block font-display text-sm font-semibold text-ink">
                Tamaño
              </label>
              <div className="mt-1.5 flex gap-2">
                {PET_SIZES.map((sz) => (
                  <button
                    type="button"
                    key={sz.id}
                    onClick={() => setPetSize(sz.id)}
                    className={`flex-1 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${
                      petSize === sz.id
                        ? "border-mint-deep bg-mint/15 text-ink"
                        : "border-ink/15 bg-white text-ink/60"
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-display text-sm font-semibold text-ink">
              Notas adicionales (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Alguna indicación especial, alergia, comportamiento, etc."
              className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
            />
          </div>
        </fieldset>

        {errorMsg && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-mint py-4 font-display text-base font-bold text-ink transition-transform hover:scale-[1.01] hover:bg-lime disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Agendando...
            </>
          ) : (
            "Confirmar cita"
          )}
        </button>
      </form>
    </div>
  );
}
