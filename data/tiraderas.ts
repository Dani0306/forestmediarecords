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

/** A confirmed competitor: Kick name, channel and photo (`public/participants/`). */
export type Participant = {
  name: string;
  url: string;
  photo: { src: string; width: number; height: number; focus?: string };
};

/** A confirmed judge: same shape as a participant (Kick name, channel, photo). */
export type Judge = Participant;

export const tiraderas = {
  name: "Mundial de Tiraderas",
  year: "2026",
  host: "LeoLugoLive",
  intro: {
    es: "Ocho streamers se enfrentan en tiraderas: barras, indirectas y flow, con la canción creada en vivo frente al chat. El sorteo es a las 8:00 p. m. y el resto de las fechas, a las 7:00 p. m. (hora de Colombia); todo se transmite por Kick en todos los canales.",
    en: "Eight streamers face off in tiraderas (diss tracks): bars, shots and flow, with each song made live in front of the chat. The draw is at 8:00 PM and every other date at 7:00 PM Colombia time (UTC−5); everything streams on Kick, on all channels.",
  },
  /** Eight since 2026-10-14; all eight confirmed on 2026-10-16 (the eighth was a surprise until then). */
  players: 8,
  /** True while a place is a surprise (revealed later) instead of "to be announced". Off since 2026-10-16: all eight are known. */
  surprise: false,
  /**
   * Confirmed competitors (from the team, 2026-10-12). Fewer than `players`
   * means the rest are still to be announced: the UI fills the gap with
   * "Por anunciar" slots. Bracket names match these `name`s to show the photo.
   */
  participants: [
    {
      // replaced valedanyy07 on 2026-10-16
      name: "Carlogato",
      url: "https://kick.com/carlogato",
      photo: { src: "/participants/carlogato.avif", width: 1034, height: 1379, focus: "50% 38%" },
    },
    {
      name: "ElFerpo2",
      url: "https://kick.com/elferpo2",
      photo: { src: "/participants/ElFerpo2.avif", width: 900, height: 1600, focus: "50% 40%" },
    },
    {
      name: "soyjosema",
      url: "https://kick.com/soyjosema",
      photo: { src: "/participants/soyjosema.avif", width: 1200, height: 1600, focus: "60% 50%" },
    },
    {
      name: "Emvy_29",
      url: "https://kick.com/emvy-29",
      photo: { src: "/participants/Emvy_29.avif", width: 1200, height: 1600, focus: "50% 30%" },
    },
    {
      name: "Cuartiz",
      url: "https://kick.com/cuartiz",
      photo: { src: "/participants/Cuartiz.avif", width: 540, height: 808, focus: "50% 60%" },
    },
    {
      name: "Edisson",
      url: "https://kick.com/edisson",
      photo: { src: "/participants/Edisson.avif", width: 1200, height: 1600, focus: "50% 45%" },
    },
    {
      // added 2026-10-14
      name: "Cang5",
      url: "https://kick.com/cang5",
      photo: { src: "/participants/Cang5.avif", width: 1011, height: 1167, focus: "52% 45%" },
    },
    {
      // the eighth, revealed 2026-10-16
      name: "Pablomeji4",
      url: "https://kick.com/pablomeji4",
      photo: { src: "/participants/Pablomeji4.avif", width: 1179, height: 1268, focus: "45% 35%" },
    },
  ] as Participant[],
  /** Seats on the panel; fewer `judges` than this shows "Por confirmar" for the rest. */
  judgeSeats: 3,
  /** From the team, 2026-10-13: Jaycol, Trianiss and LeoLugoLive (Trianiss and Leo reuse their streamer photos). */
  judges: [
    {
      name: "Jaycol",
      url: "https://kick.com/jaycol",
      photo: { src: "/juries/jaycol.avif", width: 447, height: 447, focus: "50% 55%" },
    },
    {
      name: "Trianiss",
      url: "https://kick.com/trianiss",
      // triana1: frames him well square, and no sponsor backdrop behind him
      photo: { src: "/triana/triana1.avif", width: 1600, height: 1066, focus: "45% 30%" },
    },
    {
      name: "LeoLugoLive",
      url: site.kick.url,
      photo: { src: "/leolugo/leolugo-portrait.avif", width: 738, height: 1095, focus: "50% 22%" },
    },
  ] as Judge[],
  /** Each tiradera is scored 1–3 on every criterion. */
  criteria: [
    { es: "Letra", en: "Lyrics" },
    { es: "Ritmo", en: "Rhythm" },
    { es: "Creatividad", en: "Creativity" },
  ],
  prize: {
    amount: 500_000,
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
        es: "El sorteo se hace con papeles, no con una ruleta física, y define los enfrentamientos. Ese día se conocen los cruces, las fechas de cada ronda y los premios.",
        en: "The draw is done with slips of paper, not a physical wheel, and sets the match-ups. That day we learn the pairings, the date of each round and the prizes.",
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
        es: "Cuatro batallas uno contra uno entre los ocho competidores. Una ruleta virtual decide el orden y empieza la puntuación. Las cuatro mejores tiraderas pasan a la semifinal.",
        en: "Four one-on-one battles between the eight competitors. A virtual wheel picks the order and the scoring begins. The four best tiraderas go through to the semi-final.",
      },
    },
    {
      eventId: "tiraderas-semifinal",
      name: { es: "Semifinal", en: "Semi-final" },
      body: {
        es: "Los cuatro clasificados, en dos batallas. Los dos ganadores pasan a la gran final.",
        en: "The four who went through, in two battles. The two winners go on to the grand final.",
      },
    },
    {
      eventId: "tiraderas-final",
      name: { es: "Gran final", en: "Grand final" },
      body: {
        es: "Los dos ganadores de la semifinal, cara a cara. Se corona al campeón del Mundial de Tiraderas 2026 y se entrega el premio.",
        en: "The two semi-final winners, head to head. The 2026 Mundial de Tiraderas champion is crowned and takes the prize.",
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
    {
      es: "Cada competidor hace su tiradera como quiera.",
      en: "Each competitor makes their tiradera however they like.",
    },
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
  /**
   * Format (2026-10-14): eight competitors → four quarter-final battles →
   * two semi-finals → the final. Fill in as the competition runs; "" = not known yet.
   */
  bracket: {
    // drawn with slips of paper on 2026-10-16
    quarterfinals: [
      ["Cang5", "Pablomeji4"],
      ["Edisson", "Carlogato"],
      ["Cuartiz", "ElFerpo2"],
      ["Emvy_29", "soyjosema"],
    ] as [string, string][],
    semifinals: [
      ["", ""],
      ["", ""],
    ] as [string, string][],
    final: ["", ""] as [string, string],
    champion: "",
  },
};

/** The participant behind a bracket name, if confirmed (case-insensitive). */
export const participantByName = (name: string) =>
  name ? tiraderas.participants.find((p) => p.name.toLowerCase() === name.toLowerCase()) : undefined;
