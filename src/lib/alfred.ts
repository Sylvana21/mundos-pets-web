import { BUSINESS, SCHEDULE, SERVICES, PACKAGES } from "./business";

export type AlfredReply = {
  text: string;
  suggestWhatsapp?: boolean;
};

function scheduleText(): string {
  return SCHEDULE.map((s) => `${s.day}: ${s.hours}`).join("\n");
}

function servicesText(): string {
  return SERVICES.map((s) => `• ${s.name}`).join("\n");
}

function packagesText(): string {
  return PACKAGES.map((p) => `• ${p.name}: ${p.description}`).join("\n");
}

type Rule = {
  keywords: string[];
  reply: () => AlfredReply;
};

const RULES: Rule[] = [
  {
    keywords: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "ola"],
    reply: () => ({
      text: `¡Guau! Soy Alfred 🎩🐾, el mayordomo de ${BUSINESS.name}. Puedo contarte sobre horarios, servicios, paquetes, ubicación o cómo agendar. ¿Qué te gustaría saber?`,
    }),
  },
  {
    keywords: ["horario", "hora", "abren", "cierran", "abierto", "cerrado"],
    reply: () => ({
      text: `Nuestros horarios son:\n${scheduleText()}`,
    }),
  },
  {
    keywords: ["servicio", "que hacen", "qué hacen", "ofrecen", "baño", "bano", "corte", "spa"],
    reply: () => ({
      text: `Estos son nuestros servicios:\n${servicesText()}\n\nLos precios varían según el tamaño y la raza de tu mascota.`,
    }),
  },
  {
    keywords: ["paquete"],
    reply: () => ({
      text: `Tenemos dos paquetes:\n${packagesText()}\n\nPregúntame por uno en específico o agéndalo directo desde la página de Paquetes.`,
    }),
  },
  {
    keywords: ["precio", "cuesta", "cuanto", "cuánto", "costo", "vale", "cotizacion", "cotización"],
    reply: () => ({
      text: `La cotización es personalizada para cada mascota según su tamaño, raza, pelaje y condición. Cuando agendes tu cita y nos mandes la foto de tu peludo, te la enviamos enseguida por WhatsApp.`,
      suggestWhatsapp: true,
    }),
  },
  {
    keywords: ["ubicacion", "ubicación", "direccion", "dirección", "donde estan", "dónde están", "local", "mapa"],
    reply: () => ({
      text: `Nos encuentras en:\n${BUSINESS.address.line}, ${BUSINESS.address.cityLine}\n\nTambién damos servicio a domicilio en ${BUSINESS.coverageArea} con TaxiPet y nuestra estética móvil.`,
    }),
  },
  {
    keywords: ["movil", "móvil", "camioneta", "domicilio", "a domicilio"],
    reply: () => ({
      text: `Nuestra estética móvil es una camioneta equipada que llega hasta tu casa para bañar a tu mascota ahí mismo, sin que tengas que moverte. Cubrimos ${BUSINESS.coverageArea}.`,
    }),
  },
  {
    keywords: ["taxipet", "taxi pet", "recoger", "recogen", "trasladar"],
    reply: () => ({
      text: `TaxiPet es nuestro servicio de traslado: vamos por tu mascota a tu domicilio, la llevamos al local para su servicio y, si quieres, también la regresamos a casa. El servicio en sí (baño, corte, spa) siempre se hace en el local.`,
    }),
  },
  {
    keywords: ["agendar", "cita", "reservar", "apartar"],
    reply: () => ({
      text: `¡Con gusto! Puedes agendar directo desde el botón "Agendar cita" en la parte de arriba de la página. Ahí eliges el servicio, la modalidad, fecha y hora.`,
    }),
  },
  {
    keywords: ["gato", "gatos", "felino"],
    reply: () => ({
      text: `Por ahora nuestros servicios están enfocados en perros. Si tienes otra mascota, cuéntanos por WhatsApp y vemos cómo podemos ayudarte.`,
      suggestWhatsapp: true,
    }),
  },
  {
    keywords: ["whatsapp", "telefono", "teléfono", "numero", "número", "contacto"],
    reply: () => ({
      text: `Puedes escribirnos directo por WhatsApp al ${BUSINESS.whatsapp.display}.`,
      suggestWhatsapp: true,
    }),
  },
  {
    keywords: ["instagram", "redes", "fotos"],
    reply: () => ({
      text: `Síguenos en Instagram: ${BUSINESS.instagram.handle} — ahí compartimos fotos de nuestros clientes peludos.`,
    }),
  },
  {
    keywords: ["gracias", "ok gracias", "perfecto gracias"],
    reply: () => ({
      text: `¡Con todo gusto! 🐾 Aquí ando por si necesitas algo más.`,
    }),
  },
];

const FALLBACK: AlfredReply = {
  text: `Hmm, esa pregunta se me escapa un poco — soy un perrito de respuestas sencillas 🐶. Para algo más específico, lo mejor es escribir directo por WhatsApp y te atienden enseguida.`,
  suggestWhatsapp: true,
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos para matchear mejor
}

export function getAlfredReply(userText: string): AlfredReply {
  const normalized = normalize(userText);

  for (const rule of RULES) {
    if (rule.keywords.some((k) => normalized.includes(normalize(k)))) {
      return rule.reply();
    }
  }

  return FALLBACK;
}

export const ALFRED_GREETING = `¡Guau! Soy Alfred 🎩🐾, el mayordomo de ${BUSINESS.name}. Puedo ayudarte con horarios, servicios, paquetes, ubicación o cómo agendar tu cita. ¿En qué te ayudo?`;

export const ALFRED_SUGGESTIONS = [
  "¿Cuáles son sus horarios?",
  "¿Qué servicios tienen?",
  "¿Dónde están ubicados?",
  "¿Cómo agendo una cita?",
];
