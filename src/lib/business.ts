export const BUSINESS = {
  name: "Mundogs & Pets",
  tagline: "Estética & Spa para Mascotas",
  subtagline: "Baño, corte y spa en local o a domicilio con nuestra estética móvil",
  slogan:
    "No solo cuidamos a tu mascota, también te hacemos parte de la experiencia.",
  quote:
    "La cotización es personalizada según el tamaño, raza, pelaje y condición de tu mascota — te la enviamos por WhatsApp una vez que agendes tu cita.",
  since: 2021,
  coverageArea: "Metepec y alrededores",
  address: {
    line: "Plaza San José, San Gaspar Tlahuelilpan",
    cityLine: "Metepec, Estado de México",
    mapsUrl: "https://maps.google.com/maps/place//data=!4m2!3m1!1s0x85cd8bc51a40bed7:0x4ff7644e5e3c1e21",
    mapsQuery: "Plaza San José San Gaspar Tlahuelilpan Metepec Estado de Mexico",
  },
  whatsapp: {
    number: "527223506049",
    display: "+52 722 350 6049",
  },
  instagram: {
    handle: "@mundogspets",
    url: "https://www.instagram.com/mundogspets",
  },
};

export type DaySchedule = { day: string; hours: string; closed?: boolean };

export const SCHEDULE: DaySchedule[] = [
  { day: "Lunes",     hours: "9:30 a.m. – 5:30 p.m." },
  { day: "Martes",    hours: "9:30 a.m. – 5:30 p.m." },
  { day: "Miércoles", hours: "9:30 a.m. – 5:30 p.m." },
  { day: "Jueves",    hours: "9:30 a.m. – 5:30 p.m." },
  { day: "Viernes",   hours: "9:30 a.m. – 5:30 p.m." },
  { day: "Sábado",    hours: "9:30 a.m. – 4:00 p.m." },
  { day: "Domingo",   hours: "Cerrado", closed: true },
];

export type ServiceLocation = "local" | "movil" | "domicilio-taxipet";

export type Service = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: "bath" | "scissors" | "sparkles" | "truck" | "car";
  location: ServiceLocation;
};

export const SERVICES: Service[] = [
  {
    id: "bano-corte",
    name: "Baño y corte",
    shortDescription: "Baño completo y corte a tijera o máquina.",
    longDescription:
      "Baño con agua caliente, secado, cepillado y corte de pelo según la raza o el estilo que prefieras. Incluye limpieza de oídos y corte de uñas.",
    icon: "scissors",
    location: "local",
  },
  {
    id: "spa",
    name: "Spa",
    shortDescription: "Una experiencia de relajación y cuidado profundo.",
    longDescription:
      "Tratamiento con productos especiales, hidratación de piel y pelo, masaje relajante y un mimo extra para que tu mascota salga renovada.",
    icon: "sparkles",
    location: "local",
  },
  {
    id: "taxipet",
    name: "TaxiPet",
    shortDescription: "Pasamos por tu mascota y la llevamos al local.",
    longDescription:
      "Si no puedes trasladar a tu mascota, nosotros vamos por ella a tu domicilio, la llevamos a nuestras instalaciones para su servicio y, si así lo prefieres, también la regresamos a casa al terminar.",
    icon: "car",
    location: "domicilio-taxipet",
  },
];

export type Package = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  items: string[];
  accent: "grape" | "lime";
  badge: string;
};

export const PACKAGES: Package[] = [
  {
    id: "paquete-tradicional",
    name: "Paquete Tradicional",
    tagline: "Todo lo que tu peludo necesita, en un solo servicio",
    description: "Bienestar que se nota, amor que se siente.",
    items: [
      "Cepillado",
      "Baño con agua caliente",
      "Secado",
      "Corte de pelo (si lo requiere)",
      "Limpieza de oídos",
      "Corte de uñas",
      "Fragancia y paliacate",
    ],
    accent: "grape",
    badge: "El más popular 🐾",
  },
  {
    id: "paquete-mundogs",
    name: "Paquete MunDogs",
    tagline: "Todo lo que tu perro necesita, y se merece",
    description: "Bienestar completo, felicidad que se siente.",
    items: [
      "Cepillado",
      "Baño con agua caliente",
      "Tratamiento con proteína para el pelo",
      "Secado",
      "Limpieza dental",
      "Corte de pelo (si lo requiere)",
      "Limpieza de oídos",
      "Corte y limado de uñas",
      "Humectación en nariz y huellas",
      "Fragancia y paliacate",
    ],
    accent: "lime",
    badge: "Experiencia completa ✨",
  },
];
