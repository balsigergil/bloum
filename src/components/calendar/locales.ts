export interface CalendarMessages {
  today: string;
  previousMonth: string;
  nextMonth: string;
  close: string;
  /** Visible label of the button revealing the hidden events of a day. */
  more: (count: number) => string;
  /** Accessible label of that button; `date` is the full date of the day. */
  moreLabel: (count: number, date: string) => string;
}

const en: CalendarMessages = {
  today: "Today",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  close: "Close",
  more: (count) => `+${count} more`,
  moreLabel: (count, date) =>
    `Show ${count} more ${count === 1 ? "event" : "events"}, ${date}`,
};

const fr: CalendarMessages = {
  today: "Aujourd'hui",
  previousMonth: "Mois précédent",
  nextMonth: "Mois suivant",
  close: "Fermer",
  more: (count) => `+${count} ${count === 1 ? "autre" : "autres"}`,
  moreLabel: (count, date) =>
    count === 1
      ? `Afficher 1 autre événement, ${date}`
      : `Afficher ${count} autres événements, ${date}`,
};

/**
 * Messages by language tag. Add an entry to support another language; tags
 * are matched exactly first (`fr-CH`), then by language (`fr`).
 */
export const calendarLocales: Record<string, CalendarMessages> = { en, fr };

export interface ResolvedLocale {
  /** Canonical tag used for date formatting. */
  locale: string;
  messages: CalendarMessages;
}

export function resolveLocale(tag: string | null | undefined): ResolvedLocale {
  let locale = "en";
  try {
    locale = Intl.getCanonicalLocales(tag || "en")[0] ?? "en";
  } catch {
    // Invalid tag (e.g. "en_US"): keep English
  }

  const language = locale.split("-")[0];
  const messages =
    calendarLocales[locale] ?? calendarLocales[language] ?? calendarLocales.en;

  return { locale, messages };
}
