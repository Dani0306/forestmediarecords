import { site } from "./site";

/**
 * Mundial de Tiraderas 2026: LeoLugoLive's tiradera (diss track) tournament
 * with Forest Media Récords. Source: the team's announcement (2026-10-10).
 *
 * Round dates live in `data/events.ts` (one stream event per round, linked by
 * `eventId`), so the agenda, the hero strip and this section never disagree.
 *
 * The bracket fills in as the competition runs: leave a slot empty ("") until
 * the draw (16 Oct) or the result is known; the UI shows "Por sortear" /
 * "Por definir".
 */
export type Round = {
  eventId: string;
  name: { es: string; en: string };
  body: { es: string; en: string };
};

export type Judge = { name: string; url?: string };

export const tiraderas = {
  name: "Mundial de Tiraderas",
  year: "2026",
  host: "LeoLugoLive",
  intro: {
    es: "Ocho streamers se enfrentan en tiraderas: barras, indirectas y flow, con la canción creada en vivo frente al chat. Todas las fechas se transmiten por Kick en todos los canales.",
    en: "Eight streamers face off in tiraderas (diss tracks): bars, shots and flow, with each song made live in front of the chat. Every date streams on Kick, on all channels.",
  },
  players: 8,
  judges: [
    { name: "Jaycol" },
    { name: "Trianiss", url: "https://kick.com/trianiss" },
    { name: "LeoLugoLive", url: site.kick.url },
  ] as Judge[],
  /** Each tiradera is scored 1–3 on every criterion. */
  criteria: [
    { es: "Letra", en: "Lyrics" },
    { es: "Ritmo", en: "Rhythm" },
    { es: "Creatividad", en: "Creativity" },
  ],
  prize: {
    amount: 100_000,
    note: {
      es: "Lo aporta LeoLugoLive desde el fondo de inversión de Forest Media Récords. Y puede haber premios sorpresa.",
      en: "Put up by LeoLugoLive from the Forest Media Récords investment fund. Surprise prizes may also appear.",
    },
  },
  rounds: [
    {
      eventId: "tiraderas-sorteo",
      name: { es: "Sorteo", en: "The draw" },
      body: {
        es: "Una ruleta física define los enfrentamientos. Ese día se conocen los cruces, las fechas de cada ronda y los premios.",
        en: "A physical wheel sets the match-ups. That day we learn the pairings, the date of each round and the prizes.",
      },
    },
    {
      eventId: "tiraderas-face-off",
      name: { es: "Face off · Cara a cara", en: "Face off" },
      body: {
        es: "Cinco minutos frente a frente: indirectas, verdades, provocaciones y apuestas entre rivales para prender la rivalidad.",
        en: "Five minutes head to head: shots, truths, taunts and bets between rivals to light up the rivalry.",
      },
    },
    {
      eventId: "tiraderas-cuartos",
      name: { es: "Cuartos de final", en: "Quarter-finals" },
      body: {
        es: "Cuatro enfrentamientos. Una ruleta virtual decide el orden y empieza la puntuación.",
        en: "Four battles. A virtual wheel picks the order and the scoring begins.",
      },
    },
    {
      eventId: "tiraderas-semifinal",
      name: { es: "Semifinal", en: "Semi-final" },
      body: {
        es: "Los cuatro clasificados se enfrentan otra vez por un puesto en la gran final.",
        en: "The four who advanced meet again for a place in the grand final.",
      },
    },
    {
      eventId: "tiraderas-final",
      name: { es: "Gran final", en: "Grand final" },
      body: {
        es: "Se corona al campeón del Mundial de Tiraderas 2026 y se entrega el premio.",
        en: "The 2026 Mundial de Tiraderas champion is crowned and takes the prize.",
      },
    },
  ] as Round[],
  /** After every scored battle the winner gets this moment. */
  winnerMoment: {
    es: "Cada ganador tiene 3 minutos en Discord con la cámara prendida: hablarle al público, celebrar con el chat y decirle al rival «te gané».",
    en: "Every winner gets 3 minutes on Discord with the camera on: talk to the audience, celebrate with the chat and tell the rival “I beat you”.",
  },
  /** How a tiradera is made. */
  making: [
    { es: "Se producen en BandLab.", en: "Produced in BandLab." },
    {
      es: "Con un beat de YouTube o uno propio; crear el beat suma en creatividad.",
      en: "On a YouTube beat or an original one; making your own beat helps on creativity.",
    },
    { es: "Duran de 3 a 8 minutos.", en: "They run 3 to 8 minutes." },
    {
      es: "Se crean en directo, para que el chat vea cómo nace la canción. El videoclip es opcional.",
      en: "They're written live so the chat sees the song take shape. A music video is optional.",
    },
  ],
  /** Fill in as the competition runs; "" = not known yet. */
  bracket: {
    quarterfinals: [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ] as [string, string][],
    semifinals: [
      ["", ""],
      ["", ""],
    ] as [string, string][],
    final: ["", ""] as [string, string],
    champion: "",
  },
};
