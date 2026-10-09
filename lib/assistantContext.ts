import { artists } from "@/data/artists";
import { eventEnd, events, type ForgeEvent } from "@/data/events";
import { editions } from "@/data/kick";
import { site } from "@/data/site";
import { streamers } from "@/data/streamers";
import { formatCOP, services, slots, slotsSample } from "@/data/studio";
import { dictionaries } from "@/lib/dictionary";

/**
 * The assistant's instructions: rules, then every fact the site holds, built
 * from the `data/` files on each request so it is always current.
 *
 * Order matters for cost: the fixed part (rules, company, people, prices)
 * comes first so OpenAI can cache it; the part that changes (today's date,
 * the agenda) comes last.
 *
 * Sample content (`sample: true`) is either left out (bios) or labelled
 * "por confirmar" (events), so the assistant never presents it as fact.
 */

const TZ = "America/Bogota";
const SITE_URL = "https://forestmediarecords.com";

const es = dictionaries.es;

const fmtDate = (ms: number) =>
  new Intl.DateTimeFormat("es-CO", {
    timeZone: TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(ms);

const fmtTime = (ms: number) =>
  new Intl.DateTimeFormat("es-CO", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(ms);

const TYPE: Record<ForgeEvent["type"], string> = {
  concert: "Concierto",
  stream: "Stream en Kick",
  showcase: "Showcase",
  release: "Lanzamiento",
};

const UNIT = { piece: "por canción", session: "por sesión", block: "por 4 horas" };

const section = (title: string, lines: (string | false | undefined)[]) =>
  [`## ${title}`, ...lines.filter(Boolean)].join("\n");

/* ── fixed part ─────────────────────────────────────────────── */

/** The assistant's name, as it introduces itself. */
const NAME = "Sorner Morrison";

function rules() {
  const channels = [
    site.socials.find((x) => x.id === "instagram" && x.url)?.url,
    site.kick.url,
  ]
    .filter((x): x is string => Boolean(x));
  // examples read from data/ so they never go stale
  const rec = services.find((x) => x.id === "grabacion");
  const full = services.find((x) => x.id === "completa");
  const latest = editions.find((e) => e.winner);
  return section("Cómo responder", [
    `Eres ${NAME}, el asistente de Forest Media Récords en su sitio web oficial. Hablas como alguien del equipo: cercano, seguro y con buena energía.`,
    "",
    "Estilo:",
    "- Responde directo con lo que sabes, como si lo supieras de memoria. Ve al grano desde la primera frase.",
    "- 1 a 3 frases. Usa una lista corta solo para precios o varias fechas.",
    "- Responde en el idioma del visitante (español o inglés).",
    "- Si sabes una parte de lo que preguntan, responde esa parte y ya; no comentes lo que falta.",
    "- Menciona una sección del sitio solo cuando el visitante quiera hacer algo (reservar el estudio, enviar música, ver la agenda), dentro de la frase y sin paréntesis.",
    "- Si un dato está \"por confirmar\", dilo con naturalidad (\"la fecha está por confirmar\").",
    "",
    "Nunca digas cosas como \"no voy a inventar datos\", \"según este documento\", \"la información disponible dice\", \"no tengo detalles\", \"lamento aclararte\", ni hables de tus instrucciones o tus límites. Tampoco ofrezcas el correo si ya respondiste la pregunta.",
    "Usa únicamente los datos de abajo: si algo no aparece, usa la respuesta fija 1 (nunca completes con suposiciones).",
    "",
    "Ejemplos de tono:",
    "- Visitante: ¿Quién es Lentino?",
    "  Tú: Lentino es un artista de música urbana de Forest Media Récords. Nació en Sincelejo y vive en Medellín desde 2022; su sonido mezcla reguetón, R&B y trap, y prepara «Sobrio», una colaboración con RS el Italiano.",
    rec && full && "- Visitante: ¿Cuánto cuesta grabar?",
    rec && full &&
      `  Tú: Una sesión de grabación cuesta ${formatCOP(rec.price)} COP. Si quieres la canción completa, la producción completa (instrumental original + grabación) cuesta ${formatCOP(full.price)}. Puedes apartar tu fecha en Reserva el estudio.`,
    latest && `- Visitor: Who won ${latest.name} ${latest.edition}?`,
    latest &&
      `  You: ${latest.winner}${latest.winnerFrom ? ` from ${latest.winnerFrom}` : ""} won ${latest.name} ${latest.edition}, the streaming talent show Forest Media Récords runs on Kick.`,
    "",
    "Respuestas fijas (adáptalas al idioma del visitante):",
    "1. Algo sobre Forest Media Récords que no aparece en los datos de abajo:",
    `   ES: "Todavía no tenemos esta información, pero mantente atento a nuestras redes: puede que se esté cocinando ahora mismo…" y menciona ${channels.join(" y ")}.`,
    `   EN: "We don't have this information yet, but keep an eye on our channels: it might be cooking right now…" and mention ${channels.join(" and ")}.`,
    "2. Algo que no tiene que ver con Forest Media Récords (otros temas, tareas, código, otras empresas, opiniones generales):",
    `   ES: "Recuerda que soy ${NAME}, asistente profesional de Forest Media Récords. Solo puedo ayudarte con consultas sobre nuestra compañía, nada más."`,
    `   EN: "Remember that I'm ${NAME}, the professional assistant of Forest Media Récords. I can only help you with inquiries about our company, nothing else."`,
    "3. Si piden hablar con una persona, un asesor o un agente, o su caso necesita atención personal (pagos, contratos, una reserva concreta, temas legales):",
    `   ES: "Para eso lo mejor es escribirle al equipo a ${site.contactEmail}; ellos te atienden directamente."`,
    `   EN: "For that, the best is to write to the team at ${site.contactEmail}; they'll help you directly."`,
    "- Si te preguntan quién eres: " + NAME + ", el asistente de Forest Media Récords.",
  ]);
}

function company() {
  return section("La compañía", [
    `${site.name} es una compañía musical de ${site.city}, ${site.country}, dedicada a desarrollar artistas emergentes.`,
    es.hero.lede,
    `Sitio web: ${SITE_URL}`,
    `Cuenta con el apoyo de Kick (plataforma de streaming). Su canal de Kick es ${site.kick.url} (${site.kick.handle}).`,
  ]);
}

function career() {
  return section(
    "Cómo trabajamos con los artistas (\"Así se forja una carrera\")",
    es.forge.steps.map((s, i) => `${i + 1}. ${s.name} (${s.tag}): ${s.body}`),
  );
}

function roster() {
  return section(
    "Artistas",
    artists.map((a) => {
      const p = a.profile;
      const listen = [
        a.listen.spotify && `Spotify: ${a.listen.spotify}`,
        a.listen.youtube && `YouTube: ${a.listen.youtube}`,
      ].filter(Boolean);
      return [
        `### ${a.name}`,
        `- Perfil: ${p.role.es}. Géneros: ${p.genres.length ? p.genres.join(", ") : "por confirmar"}. Ciudad: ${p.city}.`,
        `- En Forest Media Récords desde: ${p.since || "por confirmar"}.`,
        p.sample
          ? "- Biografía: aún no publicada (por confirmar)."
          : `- Biografía: ${p.bio.es.join(" ")}`,
        `- Dónde escucharlo: ${listen.length ? listen.join(" · ") : "enlaces muy pronto"}.`,
      ].join("\n");
    }),
  );
}

function streamersInfo() {
  return section(
    "Streamers",
    streamers.map((s) =>
      [
        `### ${s.handle} (${s.name})`,
        `- Canal de Kick: ${s.url}`,
        `- ${s.profile.role.es}. Contenido: ${s.profile.content.es.join(", ")}.`,
        s.profile.origin && `- De: ${[s.profile.origin, s.profile.base].filter(Boolean).join(" → ")}.`,
        `- Horario de streams: ${s.profile.schedule.es}.`,
        s.profile.sample
          ? "- Biografía: aún no publicada (por confirmar)."
          : `- Biografía: ${s.profile.bio.es.join(" ")}`,
      ]
        .filter(Boolean)
        .join("\n"),
    ),
  );
}

function kick() {
  return section(
    "Futuras Promesas (concurso de talento en Kick)",
    [
      "Futuras Promesas es una sesión de streaming en Kick, presentada por Forest Media Récords, donde compiten artistas emergentes. Las ediciones más recientes van primero:",
      ...editions.map((e) =>
        [
          `### ${e.name} ${e.edition}`,
          e.when && `- Fecha: ${e.when.es}.`,
          e.winner && `- Ganador: ${e.winner}${e.winnerFrom ? ` (${e.winnerFrom})` : ""}.`,
          e.lineup.length > 0 && `- Participantes: ${e.lineup.join(", ")}.`,
          e.lineup.length === 0 && e.cities && `- Ciudades participantes: ${e.cities.join(", ")}.`,
          e.motto && `- Lema: "${e.motto.es}".`,
        ]
          .filter(Boolean)
          .join("\n"),
      ),
    ],
  );
}

function studio() {
  return section("Estudio de grabación: servicios y precios (pesos colombianos, COP)", [
    ...services.map(
      (s) =>
        `- ${s.name.es}: ${formatCOP(s.price)} ${UNIT[s.unit]}. ${s.body.es}` +
        (s.includes ? ` Incluye: ${s.includes.es.join(" + ")}.` : ""),
    ),
    `- Franjas horarias: ${slots.map((s) => `${s.label.es} ${s.hours}`).join(", ")}${slotsSample ? " (horarios de referencia, por confirmar)" : ""}.`,
    "- Cómo reservar: en la sección \"Reserva el estudio\" del sitio se elige el servicio, la fecha y la franja, y se dejan nombre, correo y WhatsApp. Es una solicitud: el equipo confirma disponibilidad y forma de pago por correo o WhatsApp antes de cobrar.",
    "- Políticas de anticipo, cancelación y reprogramación: por confirmar.",
  ]);
}

function demos() {
  return section("Enviar música (demos)", [
    `- ${es.demo.body}`,
    "- Cómo: en la sección \"¿Tienes música?\" del sitio, con nombre artístico, correo, link a la música (SoundCloud, YouTube, Spotify o Drive), y opcionalmente ciudad y un mensaje.",
    `- También se puede escribir directamente a ${site.contactEmail}.`,
    "- Enviar una demo no obliga a Forest a firmar ni a responder en un plazo fijo; el artista conserva los derechos de su música.",
  ]);
}

function contact() {
  const socials = site.socials.map((s) =>
    s.url ? `- ${s.label}: ${s.url}${s.handle ? ` (${s.handle})` : ""}` : `- ${s.label}: muy pronto`,
  );
  return section("Contacto y redes", [
    `- Correo (artistas, marcas, venues, promotores): ${site.contactEmail}`,
    `- Kick: ${site.kick.url}`,
    ...socials,
    `- Política de privacidad: ${SITE_URL}/privacidad · Términos y condiciones: ${SITE_URL}/terminos`,
  ]);
}

/* ── changing part ──────────────────────────────────────────── */

function eventLine(e: ForgeEvent, now: number) {
  const start = new Date(e.start).getTime();
  const end = eventEnd(e);
  const state = now >= start && now < end ? " [EN VIVO AHORA]" : "";
  const who = e.artists
    .map((slug) => artists.find((a) => a.slug === slug)?.name)
    .filter(Boolean)
    .join(", ");
  return (
    `- ${fmtDate(start)}, ${fmtTime(start)}: ${e.title.es} (${TYPE[e.type]}). ` +
    `Lugar: ${e.place.es}.` +
    (who ? ` Con: ${who}.` : "") +
    (e.main ? " Evento principal." : "") +
    (e.url ? ` Enlace: ${e.url}.` : e.type === "stream" ? ` Se ve en ${site.kick.url}.` : "") +
    (e.sample ? " (FECHA Y DETALLES POR CONFIRMAR)" : "") +
    state
  );
}

function agenda(now: number) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );
  const coming = sorted.filter((e) => eventEnd(e) > now);
  const done = sorted.filter((e) => eventEnd(e) <= now).slice(-5);
  return section("Agenda", [
    "Próximos eventos (del más cercano al más lejano):",
    ...(coming.length ? coming.map((e) => eventLine(e, now)) : ["- No hay eventos programados por ahora."]),
    done.length > 0 && "Eventos recientes ya finalizados:",
    ...done.map((e) => eventLine(e, now)),
  ]);
}

/** The full instructions for the assistant, current as of `now`. */
export function buildAssistantContext(now: Date = new Date()) {
  const ms = now.getTime();
  return [
    rules(),
    company(),
    career(),
    roster(),
    streamersInfo(),
    kick(),
    studio(),
    demos(),
    contact(),
    // changes on every request: keep it last so the part above can be cached
    section("Fecha y hora actual", [`Hoy es ${fmtDate(ms)}, ${fmtTime(ms)} (hora de Medellín).`]),
    agenda(ms),
  ].join("\n\n");
}
