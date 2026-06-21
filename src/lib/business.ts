// Información central de Mundogs & Pets.
// Edita aquí los datos del negocio: precios, horarios, contacto, etc.

export const BUSINESS = {
  name: "Mundogs & Pets",
  tagline: "Estética & Spa para Mascotas",
  subtagline: "Baño, Estética móvil y báñalo tú mismo & Productos para tu mascota",
  slogan:
    "No solo cuidamos a tu mascota, también te hacemos parte de la experiencia.",
  since: 2021,
  coverageArea: "Metepec y alrededores",
  address: {
    line: "C. 20 de Noviembre Manzana 013, Lázaro Cárdenas",
    cityLine: "52148 San Gaspar Tlahuelilpan, Méx.",
    mapsQuery:
      "C. 20 de Noviembre Manzana 013, Lazaro Cardenas, 52148 San Gaspar Tlahuelilpan, Mexico",
  },
  whatsapp: {
    number: "527223506049", // formato internacional sin '+' para wa.me
    display: "+52 722 350 6049",
  },
  instagram: {
    handle: "@mundogspets",
    url: "https://www.instagram.com/mundogspets",
  },
};

export type DaySchedule = { day: string; hours: string; closed?: boolean };

export const SCHEDULE: DaySchedule[] = [
  { day: "Lunes", hours: "9:30 a.m. – 5:30 p.m." },
  { day: "Martes", hours: "9:30 a.m. – 5:30 p.m." },
  { day: "Miércoles", hours: "9:30 a.m. – 5:30 p.m." },
  { day: "Jueves", hours: "9:30 a.m. – 5:30 p.m." },
  { day: "Viernes", hours: "9:30 a.m. – 5:30 p.m." },
  { day: "Sábado", hours: "9:30 a.m. – 4:00 p.m." },
  { day: "Domingo", hours: "Cerrado", closed: true },
];

export type ServiceLocation = "local" | "movil" | "domicilio-taxipet" | "cliente";

export type Service = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  priceFrom: number | null; // null = "consultar"
  icon: "bath" | "scissors" | "sparkles" | "home" | "truck" | "car";
  location: ServiceLocation;
};

export const SERVICES: Service[] = [
  {
    id: "bano-corte",
    name: "Baño y corte",
    shortDescription: "El clásico: baño completo y corte a tijera o máquina.",
    longDescription:
      "Baño con agua caliente, secado, cepillado y corte de pelo según la raza o el estilo que prefieras para tu peludo. Incluye limpieza de oídos y corte de uñas.",
    priceFrom: 250,
    icon: "scissors",
    location: "local",
  },
  {
    id: "spa",
    name: "Spa",
    shortDescription: "Una experiencia de relajación y cuidado profundo.",
    longDescription:
      "Tratamiento con productos especiales, hidratación de piel y pelo, masaje relajante y un mimo extra para que tu mascota salga renovada por dentro y por fuera.",
    priceFrom: 350,
    icon: "sparkles",
    location: "local",
  },
  {
    id: "banalo-tu-mismo",
    name: "Báñalo tú mismo",
    shortDescription: "Tú lo bañas, nosotros ponemos todo lo demás.",
    longDescription:
      "Usa nuestras instalaciones, tina, agua caliente, shampoo y secadora para bañar tú mismo a tu mascota. Una opción ideal si quieres ahorrar y compartir ese momento con ella.",
    priceFrom: 120,
    icon: "bath",
    location: "local",
  },
  {
    id: "estetica-movil",
    name: "Estética móvil",
    shortDescription: "La camioneta va hasta tu casa y bañamos ahí mismo a tu mascota.",
    longDescription:
      "Nuestra unidad móvil llega a tu domicilio totalmente equipada para bañar y arreglar a tu mascota sin que tengas que moverte. Ideal si prefieres todo el servicio en la comodidad de tu casa.",
    priceFrom: 400,
    icon: "truck",
    location: "movil",
  },
  {
    id: "taxipet",
    name: "TaxiPet",
    shortDescription: "Pasamos por tu mascota, la llevamos al local y la regresamos.",
    longDescription:
      "Si no puedes trasladar a tu mascota, nosotros vamos por ella a tu domicilio, la llevamos a nuestras instalaciones para su servicio y, si así lo prefieres, también la regresamos a casa al terminar. El servicio (baño, corte, spa, etc.) se realiza en el local; TaxiPet es solo el traslado.",
    priceFrom: 100,
    icon: "car",
    location: "domicilio-taxipet",
  },
];

export type Package = {
  id: string;
  name: string;
  description: string;
  items: string[];
  accent: "grape" | "lime";
  priceFrom: number | null;
};

export const PACKAGES: Package[] = [
  {
    id: "paquete-tradicional",
    name: "Paquete Tradicional",
    description: "Todo lo que tu peludo necesita, en un solo servicio.",
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
    priceFrom: null,
  },
  {
    id: "paquete-mundogs",
    name: "Paquete MunDogs",
    description: "Todo lo que tu perro necesita, y se merece.",
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
    priceFrom: null,
  },
];
