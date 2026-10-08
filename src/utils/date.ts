/**
 * Date helpers working on local calendar days.
 *
 * Grid math is done on integer "day numbers" (days since 1970-01-01) rather
 * than by adding milliseconds to a Date, so that DST transitions can never
 * skip or duplicate a day.
 */

const MS_PER_DAY = 864e5;

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
const DATE_TIME = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/;
const MONTH = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/;

export interface ParsedDate {
  date: Date;
  /** True when the input had no time part (e.g. "2026-10-08"). */
  dateOnly: boolean;
}

/**
 * Day number of the local calendar day of `date`.
 */
export function toDay(date: Date): number {
  return (
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_PER_DAY
  );
}

/**
 * Local midnight (or the first instant of the day when midnight doesn't exist)
 * of a day number.
 */
export function fromDay(day: number): Date {
  const utc = new Date(day * MS_PER_DAY);
  return makeDate(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
}

/**
 * Day of the week of a day number, 0 (Sunday) to 6 (Saturday), like `Date#getDay`.
 */
export function dayOfWeek(day: number): number {
  // 1970-01-01 was a Thursday
  return (((day + 4) % 7) + 7) % 7;
}

/**
 * Format a date or a day number as `YYYY-MM-DD`.
 */
export function toISODate(value: Date | number): string {
  const date = typeof value === "number" ? fromDay(value) : value;
  const y = String(date.getFullYear()).padStart(4, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Local date from its parts. Unlike `new Date(y, m, d)`, years 0–99 are not
 * mapped to 1900–1999.
 */
function makeDate(year: number, month: number, day: number): Date {
  const date = new Date(year, month, day);
  date.setFullYear(year, month, day);
  return date;
}

/**
 * Build a local date, or return null when the parts don't form a real date
 * (e.g. February 30th).
 */
function localDate(year: number, month: number, day: number): Date | null {
  const date = makeDate(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

/**
 * Parse a `Date`, an ISO date (`2026-10-08`, read as a local day) or an ISO
 * date-time (`2026-10-08T09:00`, read as local time unless it has an offset).
 */
export function parseDateInput(value: unknown): ParsedDate | null {
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : { date: value, dateOnly: false };
  }

  if (typeof value !== "string") {
    return null;
  }

  const input = value.trim();

  // new Date("2026-10-08") is UTC midnight, which is the previous day in
  // negative offsets: build the local day ourselves.
  const dateOnly = DATE_ONLY.exec(input);
  if (dateOnly) {
    const date = localDate(+dateOnly[1], +dateOnly[2] - 1, +dateOnly[3]);
    return date ? { date, dateOnly: true } : null;
  }

  if (DATE_TIME.test(input)) {
    const date = new Date(input);
    return isNaN(date.getTime()) ? null : { date, dateOnly: false };
  }

  return null;
}

/**
 * Parse `YYYY-MM` or `YYYY-MM-DD` and return the first day of that month.
 */
export function parseMonth(value: string | null): Date | null {
  const match = value ? MONTH.exec(value.trim()) : null;
  if (!match) {
    return null;
  }
  const [year, month] = [+match[1], +match[2] - 1];
  return localDate(year, month, match[3] ? +match[3] : 1)
    ? makeDate(year, month, 1)
    : null;
}
