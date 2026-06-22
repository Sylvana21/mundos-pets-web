import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  Truck,
  Car,
  Plus,
  Trash2,
  PawPrint,
} from "lucide-react";
import { SERVICES, PACKAGES, BUSINESS } from "../lib/business";
import { createAppointment, type PetEntry } from "../lib/appointments";
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

const SPECIES_OPTIONS = ["Perro", "Otro"];

const ALL_SERVICE_OPTIONS = [
  ...SERVICES.map((s) => ({ id: s.id, name: s.name })),
  ...PACKAGES.map((p) => ({ id: p.id, name: p.name })),
];

function emptyPet(serviceId: string): PetEntry {
  return {
    pet_name: "",
    pet_species: "Perro",
    pet_breed: "",
    pet_size: "mediano",
    service_id: serviceId,
    service_name:
      ALL_SERVICE_OPTIONS.find((s) => s.id === serviceId)?.name ?? "",
  };
}

export default function Agendar() {
  const location = useLocation();
  const navigate = useNavigate();
  const incoming = location.state as
    | { serviceId?: string; packageId?: string }
    | undefined;

  const days = useMemo(() => getUpcomingDays(21), []);
  const initialServiceId = incoming?.serviceId || incoming?.packageId || "";

  const [pets, setPets] = useState<PetEntry[]>([emptyPet(initialServiceId)]);
  const [locationType, setLocationType] = useState<LocationType>("local");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [petPhotos, setPetPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableSlots = selectedDate ? getDaySlots(selectedDate) : [];

  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  const needsAddress = locationType === "movil" || locationType === "taxipet";

  function updatePet(index: number, patch: Partial<PetEntry>) {
    setPets((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...patch } : p))
    );
  }

  function setPetService(index: number, serviceId: string) {
    const name = ALL_SERVICE_OPTIONS.find((s) => s.id === serviceId)?.name ?? "";
    updatePet(index, { service_id: serviceId, service_name: name });
  }

  function addPet() {
    setPets((prev) => [...prev, emptyPet("")]);
  }

  function removePet(index: number) {
    setPets((prev) => prev.filter((_, i) => i !== index));
  }

  function validate(): string | null {
    if (pets.length === 0) return "Agrega al menos una mascota.";
    for (const p of pets) {
      if (!p.pet_name.trim()) return "Falta el nombre de alguna mascota.";
      if (!p.service_id) return `Elige un servicio para ${p.pet_name || "tu mascota"}.`;
    }
    if (!selectedDate) return "Elige una fecha.";
    if (!selectedTime) return "Elige un horario.";
    if (!ownerName.trim()) return "Falta tu nombre.";
    if (!ownerPhone.trim()) return "Falta tu teléfono.";
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
      pets: pets.map((p) => ({
        ...p,
        pet_name: p.pet_name.trim(),
        pet_breed: p.pet_breed.trim(),
      })),
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
    const petsList = pets
      .map((p) => `${p.pet_name} (${p.service_name})`)
      .join(", ");
    const waText = encodeURIComponent(
      `¡Hola! Acabo de agendar una cita en la página:\n` +
        `Mascotas: ${petsList}\n` +
        `Fecha: ${dateLabel} a las ${formatSlot12h(selectedTime)}\n` +
        `¿Me pueden confirmar? Adjunto foto(s) de mi mascota para la cotización. Gracias 🐾`
    );

    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center">
        <CheckCircle2 className="h-16 w-16 text-mint-deep" />
        <h1 className="mt-5 font-display text-3xl font-extrabold text-ink">
          ¡Cita registrada!
        </h1>
        <p className="mt-3 text-ink/65">
          Agendamos a <strong>{petsList}</strong> para el{" "}
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
            Agenda tu cita
          </h1>
          <p className="mt-2 text-sm text-cream/60">
            ¿Tienes más de una mascota? Agrégalas todas. Te enviamos la cotización por WhatsApp según el pelaje y condición de cada una.
          </p>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl space-y-10 px-5 py-12"
      >
        {/* 1. Mascotas y servicios */}
        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            1. Tus mascotas y su servicio
          </legend>

          <div className="mt-4 space-y-5">
            {pets.map((pet, index) => (
              <div
                key={index}
                className="rounded-2xl border border-ink/10 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink/70">
                    <PawPrint className="h-4 w-4 text-mint-deep" />
                    <span className="font-display text-sm font-bold">
                      Mascota {index + 1}
                    </span>
                  </div>
                  {pets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePet(index)}
                      className="text-ink/40 hover:text-red-500"
                      aria-label="Quitar mascota"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block font-display text-sm font-semibold text-ink">
                      Nombre de tu mascota
                    </label>
                    <input
                      value={pet.pet_name}
                      onChange={(e) =>
                        updatePet(index, { pet_name: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-display text-sm font-semibold text-ink">
                      Especie
                    </label>
                    <select
                      value={pet.pet_species}
                      onChange={(e) =>
                        updatePet(index, { pet_species: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:border-mint-deep focus:outline-none focus:ring-2 focus:ring-mint/30"
                    >
                      {SPECIES_OPTIONS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-display text-sm font-semibold text-ink">
                      Raza (si la conoces)
                    </label>
                    <input
                      value={pet.pet_breed}
                      onChange={(e) =>
                        updatePet(index, { pet_breed: e.target.value })
                      }
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
                          onClick={() => updatePet(index, { pet_size: sz.id })}
                          className={`flex-1 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${
                            pet.pet_size === sz.id
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
                    Servicio para {pet.pet_name || "esta mascota"}
                  </label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {SERVICES.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setPetService(index, s.id)}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left transition-colors ${
                          pet.service_id === s.id
                            ? "border-mint-deep bg-mint/10"
                            : "border-ink/10 bg-white hover:border-ink/20"
                        }`}
                      >
                        <ServiceIcon
                          icon={s.icon}
                          className="h-4 w-4 shrink-0 text-mint-deep"
                        />
                        <span className="font-display text-xs font-bold text-ink">
                          {s.name}
                        </span>
                      </button>
                    ))}
                    {PACKAGES.map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setPetService(index, p.id)}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left transition-colors ${
                          pet.service_id === p.id
                            ? "border-grape bg-grape/10"
                            : "border-ink/10 bg-white hover:border-ink/20"
                        }`}
                      >
                        <span className="font-display text-xs font-bold text-ink">
                          {p.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addPet}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-dashed border-ink/25 px-5 py-2.5 font-display text-sm font-bold text-ink/60 hover:border-mint-deep hover:text-mint-deep"
          >
            <Plus className="h-4 w-4" /> Agregar otra mascota
          </button>
        </fieldset>

        {/* 2. Modalidad */}
        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            2. ¿Dónde las atendemos?
          </legend>
          <p className="mt-1 text-xs text-ink/45">
            Aplica para todas las mascotas de esta cita.
          </p>
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

        {/* 4. Datos del dueño */}
        <fieldset>
          <legend className="font-display text-lg font-bold text-ink">
            4. Tus datos de contacto
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
          </div>

          {/* Foto(s) de la mascota para cotización */}
          <div className="mt-4 rounded-2xl border-2 border-dashed border-ink/15 bg-cream-soft p-5">
            <label className="block font-display text-sm font-bold text-ink">
              📷 Foto(s) de tu mascota
            </label>
            <p className="mt-1 text-xs text-ink/50">
              Necesitamos ver el pelaje y condición de tu mascota para preparar tu cotización. Puedes subir varias fotos.
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setPetPhotos(Array.from(e.target.files));
                }
              }}
              className="mt-3 w-full cursor-pointer rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink/60 file:mr-3 file:rounded-full file:border-0 file:bg-mint file:px-4 file:py-1.5 file:font-display file:text-xs file:font-bold file:text-ink hover:file:bg-lime"
            />
            {petPhotos.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {petPhotos.map((f, i) => (
                  <div key={i} className="relative h-16 w-16 overflow-hidden rounded-xl border border-ink/10">
                    <img
                      src={URL.createObjectURL(f)}
                      alt={`Foto ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                <p className="w-full text-xs text-mint-deep font-semibold mt-1">
                  {petPhotos.length} foto{petPhotos.length > 1 ? "s" : ""} lista{petPhotos.length > 1 ? "s" : ""}
                </p>
              </div>
            )}
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
