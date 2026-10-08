import { dayOfWeek, parseDateInput, toDay } from "../../utils/date";

export interface CalendarEvent {
  title: string;
  /** `YYYY-MM-DD` (all-day), `YYYY-MM-DDTHH:mm` (timed) or a `Date`. */
  start: string | Date;
  /** Inclusive last day for all-day events, end date-time for timed events. */
  end?: string | Date;
  /** Defaults to true when `start` has no time part. */
  allDay?: boolean;
  /** Any CSS color. */
  color?: string;
  /** Renders the event as a link. */
  url?: string;
}

export interface NormalizedEvent {
  /** Position in the input, used as the last sorting criterion. */
  index: number;
  source: CalendarEvent;
  title: string;
  allDay: boolean;
  startMs: number;
  endMs: number;
  /** Day number of the first day the event is shown on. */
  firstDay: number;
  /** Day number of the last day the event is shown on (inclusive). */
  lastDay: number;
  /** Rendered as a bar: all-day or spanning several days. */
  bar: boolean;
  color?: string;
  url?: string;
}

export interface Segment {
  event: NormalizedEvent;
  /** First column (0–6) of the segment in its week. */
  start: number;
  /** Last column (0–6, inclusive) of the segment in its week. */
  end: number;
  /** The event started in a previous week. */
  clipStart: boolean;
  /** The event continues in the next week. */
  clipEnd: boolean;
  lane: number;
  /** The segment doesn't fit and is counted in a "+N more" button instead. */
  hidden: boolean;
}

export interface WeekLayout {
  segments: Segment[];
  /** Number of hidden events per column. */
  more: number[];
}

function warn(message: string, value: unknown) {
  console.warn(`[Calendar] ${message}`, value);
}

/**
 * Validate the events given to the calendar and compute the days they cover.
 * Invalid events are skipped with a warning.
 */
export function normalizeEvents(input: unknown): NormalizedEvent[] {
  if (!Array.isArray(input)) {
    warn("events must be an array, got", input);
    return [];
  }

  return input.flatMap((source: CalendarEvent, index): NormalizedEvent[] => {
    const start = parseDateInput(source?.start);
    if (typeof source?.title !== "string" || !start) {
      warn("Skipping event without a title or a valid start:", source);
      return [];
    }

    let end = source.end == null ? null : parseDateInput(source.end);
    if (source.end != null && !end) {
      warn("Ignoring invalid end of event:", source);
    }
    if (end && end.date < start.date) {
      warn("Ignoring end before start of event:", source);
      end = null;
    }

    const allDay = source.allDay ?? start.dateOnly;
    const firstDay = toDay(start.date);
    let lastDay: number;
    let startMs: number;
    let endMs: number;

    if (allDay) {
      lastDay = end ? Math.max(toDay(end.date), firstDay) : firstDay;
      startMs = start.date.getTime();
      endMs = end ? end.date.getTime() : startMs;
    } else {
      startMs = start.date.getTime();
      endMs = end ? end.date.getTime() : startMs;
      // An event ending exactly at midnight doesn't show on the next day
      lastDay = endMs > startMs ? toDay(new Date(endMs - 1)) : firstDay;
    }

    return [
      {
        index,
        source,
        title: source.title,
        allDay,
        startMs,
        endMs,
        firstDay,
        lastDay,
        bar: allDay || lastDay > firstDay,
        color: typeof source.color === "string" ? source.color : undefined,
        url: typeof source.url === "string" ? source.url : undefined,
      },
    ];
  });
}

/**
 * Order of the events within a day: bars first (longest first), then by start
 * time, then by title.
 */
export function compareEvents(a: NormalizedEvent, b: NormalizedEvent): number {
  return (
    +b.bar - +a.bar ||
    b.lastDay - b.firstDay - (a.lastDay - a.firstDay) ||
    a.startMs - b.startMs ||
    b.endMs - a.endMs ||
    a.title.localeCompare(b.title) ||
    a.index - b.index
  );
}

function compareSegments(a: Segment, b: Segment): number {
  return (
    a.start - b.start ||
    +b.event.bar - +a.event.bar ||
    b.end - b.start - (a.end - a.start) ||
    compareEvents(a.event, b.event)
  );
}

/**
 * Day number of the first day of the grid showing `month`.
 */
export function gridStart(month: Date, weekStart: number): number {
  const first = toDay(new Date(month.getFullYear(), month.getMonth(), 1));
  return first - ((dayOfWeek(first) - weekStart + 7) % 7);
}

/**
 * Events shown on a day, in display order.
 */
export function eventsOnDay(
  events: NormalizedEvent[],
  day: number,
): NormalizedEvent[] {
  return events
    .filter((event) => event.firstDay <= day && day <= event.lastDay)
    .sort(compareEvents);
}

/**
 * Place the events of the week starting on `weekStart` (a day number) in
 * lanes. Each day has room for `maxRows` rows; when a day has more events, its
 * last row is used by a "+N more" button and the events that don't fit are
 * hidden.
 */
export function layoutWeek(
  events: NormalizedEvent[],
  weekStart: number,
  maxRows: number,
): WeekLayout {
  const weekEnd = weekStart + 6;

  const segments = events
    .filter((event) => event.firstDay <= weekEnd && event.lastDay >= weekStart)
    .map(
      (event): Segment => ({
        event,
        start: Math.max(event.firstDay, weekStart) - weekStart,
        end: Math.min(event.lastDay, weekEnd) - weekStart,
        clipStart: event.firstDay < weekStart,
        clipEnd: event.lastDay > weekEnd,
        lane: 0,
        hidden: false,
      }),
    )
    .sort(compareSegments);

  // Put every segment in the lowest lane that is free on all of its days.
  // Lanes are bit masks of the occupied columns.
  const lanes: number[] = [];
  for (const segment of segments) {
    const mask =
      ((1 << (segment.end - segment.start + 1)) - 1) << segment.start;
    let lane = 0;
    while ((lanes[lane] ?? 0) & mask) {
      lane++;
    }
    lanes[lane] = (lanes[lane] ?? 0) | mask;
    segment.lane = lane;
  }

  // A day with a hidden segment needs its last row for the "+N more" button,
  // which can hide more segments: repeat until nothing changes. Every limit
  // drops at most once, so this ends quickly.
  const limits = Array<number>(7).fill(maxRows);
  let changed = true;
  while (changed) {
    changed = false;
    for (const segment of segments) {
      if (segment.hidden) {
        continue;
      }
      let limit = maxRows;
      for (let col = segment.start; col <= segment.end; col++) {
        limit = Math.min(limit, limits[col]);
      }
      if (segment.lane < limit) {
        continue;
      }
      segment.hidden = true;
      for (let col = segment.start; col <= segment.end; col++) {
        if (limits[col] === maxRows) {
          limits[col] = maxRows - 1;
          changed = true;
        }
      }
    }
  }

  const more = Array<number>(7).fill(0);
  for (const segment of segments) {
    if (segment.hidden) {
      for (let col = segment.start; col <= segment.end; col++) {
        more[col]++;
      }
    }
  }

  return { segments, more };
}
