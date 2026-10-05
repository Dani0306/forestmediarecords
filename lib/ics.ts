import { eventEnd, type ForgeEvent } from "@/data/events";
import type { Lang } from "./dictionary";

const stamp = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const esc = (s: string) => s.replace(/[\\,;]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");

/** A one-event iCalendar file as a data URL, for "Add to calendar". */
export function icsHref(e: ForgeEvent, lang: Lang) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Forest Media Records//Agenda//ES",
    "BEGIN:VEVENT",
    `UID:${e.id}@forestmediarecords`,
    `DTSTAMP:${stamp(new Date(e.start).getTime())}`,
    `DTSTART:${stamp(new Date(e.start).getTime())}`,
    `DTEND:${stamp(eventEnd(e))}`,
    `SUMMARY:${esc(e.title[lang])}`,
    `LOCATION:${esc(e.place[lang])}`,
    e.url ? `URL:${e.url}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}
