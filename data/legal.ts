import { site } from "./site";

/**
 * Legal pages: privacy policy (/privacidad) and terms (/terminos).
 *
 * DRAFT written for Colombia (Ley 1581 de 2012, Decreto 1377 de 2013) from
 * what the site actually does. `draft: true` shows a "pending legal review"
 * tag. Have a lawyer review it, fill the [brackets], then drop the flag.
 */
export type LegalSection = { id: string; title: string; body: string[]; list?: string[] };
export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };

export const legalMeta = {
  updated: "2026-10-06",
  draft: true,
  /** TODO: legal details of the company. */
  holder: "Forest Media Récords",
  taxId: "[NIT por confirmar]",
  address: "[Dirección por confirmar], Medellín, Antioquia, Colombia",
  email: site.contactEmail,
};

const m = legalMeta;

export const privacy: Record<"es" | "en", LegalDoc> = {
  es: {
    title: "Política de privacidad",
    intro: `Esta política explica cómo ${m.holder} recoge, usa y protege tus datos personales cuando usas este sitio, nos envías tu música o solicitas una reserva en el estudio, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.`,
    sections: [
      {
        id: "responsable",
        title: "Responsable del tratamiento",
        body: [
          `${m.holder}, identificado con ${m.taxId}, con domicilio en ${m.address}. Correo de contacto: ${m.email}.`,
        ],
      },
      {
        id: "datos",
        title: "Qué datos recogemos",
        body: ["Solo los que tú nos das y los mínimos para que el sitio funcione:"],
        list: [
          "Envío de demos: nombre artístico, correo, ciudad, link a tu música y el mensaje que escribas.",
          "Reservas del estudio: nombre, nombre artístico, correo, número de WhatsApp, servicio, fecha, franja horaria y notas del proyecto.",
          "Preferencias en tu navegador: el idioma elegido y tu decisión sobre cookies, guardados en el almacenamiento local de tu dispositivo.",
        ],
      },
      {
        id: "finalidad",
        title: "Para qué los usamos",
        body: ["Usamos tus datos únicamente para:"],
        list: [
          "Escuchar tu música y responderte sobre tu demo.",
          "Gestionar tu solicitud de reserva: confirmar disponibilidad, horario y pago.",
          "Contactarte por correo o WhatsApp sobre lo que nos pediste.",
          "Recordar tu idioma y tus preferencias en el sitio.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies y almacenamiento local",
        body: [
          "El sitio guarda en tu navegador el idioma y tu elección sobre cookies; esto es necesario para que funcione como esperas.",
          "Si aceptas todas las cookies, podríamos usar herramientas de medición para entender cómo se usa el sitio. Puedes cambiar tu decisión cuando quieras desde «Preferencias de cookies» en el pie de página.",
        ],
      },
      {
        id: "terceros",
        title: "Con quién los compartimos",
        body: [
          "No vendemos ni alquilamos tus datos. Pueden pasar por los proveedores que usamos para operar: el servicio de correo, el alojamiento del sitio y, cuando aplique, WhatsApp. Kick, Spotify y YouTube son sitios externos con sus propias políticas.",
        ],
      },
      {
        id: "derechos",
        title: "Tus derechos",
        body: ["Como titular de tus datos puedes:"],
        list: [
          "Conocer, actualizar y rectificar tus datos.",
          "Pedir prueba de la autorización que nos diste.",
          "Saber cómo hemos usado tus datos.",
          "Revocar la autorización o pedir que los eliminemos, cuando no exista un deber legal de conservarlos.",
          "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).",
        ],
      },
      {
        id: "ejercer",
        title: "Cómo ejercerlos",
        body: [
          `Escríbenos a ${m.email} con tu nombre, tu solicitud y un medio de contacto. Respondemos consultas en máximo 10 días hábiles y reclamos en máximo 15 días hábiles, como indica la ley.`,
        ],
      },
      {
        id: "conservacion",
        title: "Cuánto tiempo los guardamos",
        body: [
          "Mientras sean necesarios para la finalidad por la que nos los diste, o el tiempo que exija la ley. Si una demo no avanza, puedes pedirnos que la borremos en cualquier momento.",
        ],
      },
      {
        id: "seguridad",
        title: "Seguridad",
        body: [
          "Tomamos medidas razonables para proteger tus datos contra acceso no autorizado, pérdida o uso indebido.",
        ],
      },
      {
        id: "menores",
        title: "Menores de edad",
        body: [
          "Si eres menor de 18 años, envía tu música o tu reserva con la autorización de tu madre, padre o representante legal.",
        ],
      },
      {
        id: "cambios",
        title: "Cambios a esta política",
        body: [
          "Podemos actualizarla; publicaremos aquí la nueva versión con su fecha. Al enviar un formulario aceptas el tratamiento descrito en la versión vigente.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy policy",
    intro: `This policy explains how ${m.holder} collects, uses and protects your personal data when you use this site, send us your music or request a studio booking, under Colombian Law 1581 of 2012 and Decree 1377 of 2013.`,
    sections: [
      {
        id: "responsable",
        title: "Data controller",
        body: [`${m.holder}, tax ID ${m.taxId}, based at ${m.address}. Contact email: ${m.email}.`],
      },
      {
        id: "datos",
        title: "What we collect",
        body: ["Only what you give us, plus the minimum the site needs to work:"],
        list: [
          "Demo submissions: artist name, email, city, link to your music and your message.",
          "Studio bookings: name, artist name, email, WhatsApp number, service, date, time slot and project notes.",
          "Browser preferences: your chosen language and your cookie choice, kept in your device's local storage.",
        ],
      },
      {
        id: "finalidad",
        title: "What we use it for",
        body: ["We use your data only to:"],
        list: [
          "Listen to your music and reply about your demo.",
          "Handle your booking request: confirm availability, time and payment.",
          "Contact you by email or WhatsApp about what you asked for.",
          "Remember your language and preferences on the site.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies and local storage",
        body: [
          "The site stores your language and your cookie choice in your browser; this is needed for it to work as you expect.",
          "If you accept all cookies, we may use analytics tools to understand how the site is used. You can change your choice at any time from “Cookie preferences” in the footer.",
        ],
      },
      {
        id: "terceros",
        title: "Who we share it with",
        body: [
          "We don't sell or rent your data. It may pass through the providers we use to operate: email, site hosting and, when relevant, WhatsApp. Kick, Spotify and YouTube are external sites with their own policies.",
        ],
      },
      {
        id: "derechos",
        title: "Your rights",
        body: ["As the owner of your data you can:"],
        list: [
          "Know, update and correct your data.",
          "Ask for proof of the consent you gave us.",
          "Know how we have used your data.",
          "Withdraw consent or ask us to delete it, unless we're legally required to keep it.",
          "File complaints with the Superintendence of Industry and Commerce (SIC).",
        ],
      },
      {
        id: "ejercer",
        title: "How to exercise them",
        body: [
          `Write to ${m.email} with your name, your request and a way to reach you. We answer queries within 10 business days and claims within 15 business days, as the law requires.`,
        ],
      },
      {
        id: "conservacion",
        title: "How long we keep it",
        body: [
          "For as long as it's needed for the purpose you gave it to us for, or as long as the law requires. If a demo doesn't move forward, you can ask us to delete it at any time.",
        ],
      },
      {
        id: "seguridad",
        title: "Security",
        body: ["We take reasonable measures to protect your data against unauthorised access, loss or misuse."],
      },
      {
        id: "menores",
        title: "Minors",
        body: ["If you're under 18, send your music or booking with the permission of a parent or legal guardian."],
      },
      {
        id: "cambios",
        title: "Changes to this policy",
        body: [
          "We may update it; the new version will be posted here with its date. By sending a form you accept the processing described in the current version.",
        ],
      },
    ],
  },
};

export const terms: Record<"es" | "en", LegalDoc> = {
  es: {
    title: "Términos y condiciones",
    intro: `Estos términos regulan el uso del sitio de ${m.holder} y de sus servicios: envío de demos y reservas del estudio de grabación. Al usar el sitio los aceptas.`,
    sections: [
      {
        id: "uso",
        title: "Uso del sitio",
        body: [
          "Puedes navegar, escuchar y compartir el contenido del sitio para uso personal. No está permitido usarlo para actividades ilegales, enviar contenido ajeno como propio ni intentar afectar su funcionamiento.",
        ],
      },
      {
        id: "propiedad",
        title: "Propiedad intelectual",
        body: [
          `La marca, el logo, los textos, las fotos, los videos y el diseño del sitio pertenecen a ${m.holder} o a sus artistas, y están protegidos por las leyes de derechos de autor y propiedad industrial. Los afiches y contenidos de terceros pertenecen a sus autores.`,
        ],
      },
      {
        id: "demos",
        title: "Envío de demos",
        body: ["Cuando nos envías tu música:"],
        list: [
          "Declaras que eres autor o tienes los derechos de lo que envías.",
          "Sigues siendo dueño de tu música: enviarla no nos da derechos sobre ella, solo permiso para escucharla y evaluarla.",
          "Enviar una demo no crea una relación contractual ni nos obliga a firmarte, producirte o responder en un plazo fijo.",
          "Cualquier acuerdo de trabajo se hará por escrito y por separado.",
        ],
      },
      {
        id: "reservas",
        title: "Reservas del estudio",
        body: ["Sobre los servicios y reservas del estudio:"],
        list: [
          "Los precios están en pesos colombianos (COP) y pueden cambiar; aplica el precio vigente al confirmar la reserva.",
          "Enviar el formulario es una solicitud: la reserva queda en firme cuando te confirmamos disponibilidad y se acuerda el pago.",
          "[Política de anticipo, cancelación y reprogramación por confirmar.]",
          "La producción completa incluye instrumental original y sesión de grabación, como se indica en las tarifas.",
          "Los derechos sobre las grabaciones y producciones se definen en el acuerdo de cada servicio.",
        ],
      },
      {
        id: "externos",
        title: "Enlaces externos",
        body: [
          "El sitio enlaza a Kick, Spotify, YouTube y otras plataformas. No controlamos esos sitios ni respondemos por su contenido o sus políticas.",
        ],
      },
      {
        id: "eventos",
        title: "Agenda y eventos",
        body: [
          "Las fechas, lugares y lineups pueden cambiar. Las fechas marcadas como «Ejemplo» no son eventos confirmados.",
        ],
      },
      {
        id: "responsabilidad",
        title: "Responsabilidad",
        body: [
          "Hacemos lo posible para que el sitio funcione y su información sea correcta, pero no garantizamos que esté libre de errores o interrupciones.",
        ],
      },
      {
        id: "datos",
        title: "Datos personales",
        body: ["El tratamiento de tus datos se rige por nuestra política de privacidad."],
      },
      {
        id: "ley",
        title: "Ley aplicable",
        body: [
          "Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se resolverá ante los jueces de Medellín.",
        ],
      },
      {
        id: "cambios",
        title: "Cambios y contacto",
        body: [`Podemos actualizar estos términos; la versión vigente es la publicada aquí. Dudas: ${m.email}.`],
      },
    ],
  },
  en: {
    title: "Terms and conditions",
    intro: `These terms govern the use of the ${m.holder} site and its services: demo submissions and recording studio bookings. By using the site you accept them.`,
    sections: [
      {
        id: "uso",
        title: "Using the site",
        body: [
          "You may browse, listen to and share the site's content for personal use. You may not use it for illegal activities, submit someone else's work as your own or try to disrupt it.",
        ],
      },
      {
        id: "propiedad",
        title: "Intellectual property",
        body: [
          `The brand, logo, texts, photos, videos and design of the site belong to ${m.holder} or its artists and are protected by copyright and trademark law. Third-party posters and content belong to their authors.`,
        ],
      },
      {
        id: "demos",
        title: "Demo submissions",
        body: ["When you send us your music:"],
        list: [
          "You confirm you are the author or hold the rights to what you send.",
          "You keep ownership of your music: sending it gives us no rights to it, only permission to listen and evaluate it.",
          "Sending a demo creates no contract and doesn't oblige us to sign, produce or reply within a set time.",
          "Any working agreement will be made separately and in writing.",
        ],
      },
      {
        id: "reservas",
        title: "Studio bookings",
        body: ["About studio services and bookings:"],
        list: [
          "Prices are in Colombian pesos (COP) and may change; the price in force when the booking is confirmed applies.",
          "Sending the form is a request: the booking is final once we confirm availability and payment is agreed.",
          "[Deposit, cancellation and rescheduling policy to be confirmed.]",
          "Full production includes an original instrumental and a recording session, as listed in the rates.",
          "Rights to recordings and productions are set out in each service's agreement.",
        ],
      },
      {
        id: "externos",
        title: "External links",
        body: [
          "The site links to Kick, Spotify, YouTube and other platforms. We don't control those sites and aren't responsible for their content or policies.",
        ],
      },
      {
        id: "eventos",
        title: "Agenda and events",
        body: ["Dates, venues and line-ups may change. Dates tagged “Example” are not confirmed events."],
      },
      {
        id: "responsabilidad",
        title: "Liability",
        body: [
          "We do our best to keep the site working and its information accurate, but we can't guarantee it's free of errors or interruptions.",
        ],
      },
      {
        id: "datos",
        title: "Personal data",
        body: ["The processing of your data is governed by our privacy policy."],
      },
      {
        id: "ley",
        title: "Governing law",
        body: [
          "These terms are governed by the laws of the Republic of Colombia. Any dispute will be settled before the courts of Medellín.",
        ],
      },
      {
        id: "cambios",
        title: "Changes and contact",
        body: [`We may update these terms; the version in force is the one posted here. Questions: ${m.email}.`],
      },
    ],
  },
};
