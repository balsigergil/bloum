import type { Meta, StoryObj } from "@storybook/html-vite";
import { toISODate } from "../../utils/date";
import { Calendar } from "./calendar";
import type { CalendarEvent } from "./layout";

type CalendarArgs = {
  locale: "en" | "fr";
  weekStart: number;
  maxEvents: number;
};

/**
 * Events spread over the current month, so that the calendar is never empty.
 */
function sampleEvents(): CalendarEvent[] {
  const today = new Date();
  const day = (date: number, time?: string) => {
    const iso = toISODate(
      new Date(today.getFullYear(), today.getMonth(), date),
    );
    return time ? `${iso}T${time}` : iso;
  };

  return [
    { title: "Team offsite", start: day(3), end: day(4), color: "#16a34a" },
    {
      title: "Sprint planning",
      start: day(6, "09:30"),
      end: day(6, "11:00"),
      color: "#2563eb",
    },
    { title: "Lunch", start: day(6, "12:30"), end: day(6, "13:30") },
    {
      title: "Release 2.0",
      start: day(9),
      color: "#dc2626",
      url: "https://www.bloum.dev",
    },
    { title: "Design review", start: day(14, "09:00"), color: "#7c3aed" },
    { title: "1:1 with Sam", start: day(14, "11:00") },
    { title: "Customer call", start: day(14, "14:00"), color: "#0891b2" },
    { title: "Code freeze", start: day(14), color: "#ea580c" },
    { title: "Team drinks", start: day(14, "18:00"), color: "#db2777" },
    {
      title: "Conference trip",
      start: day(17),
      end: day(24),
      color: "#0891b2",
    },
    { title: "Dentist", start: day(21, "16:15"), end: day(21, "17:00") },
    {
      title: "Server migration",
      start: day(26, "22:00"),
      end: day(27, "04:00"),
      color: "#ea580c",
    },
    { title: "Hackathon", start: day(28), end: day(30), color: "#7c3aed" },
    { title: "Retrospective", start: day(28, "15:00"), color: "#2563eb" },
  ];
}

function calendar(attributes: string, events: CalendarEvent[]): string {
  Calendar.register();
  return `
<bl-calendar ${attributes}>
  <script type="application/json">${JSON.stringify(events)}</script>
</bl-calendar>`;
}

function attributes(args: CalendarArgs): string {
  return `locale="${args.locale}" week-start="${args.weekStart}" max-events="${args.maxEvents}"`;
}

const meta: Meta<CalendarArgs> = {
  title: "Components/Data/Calendar",
  parameters: {
    docs: {
      description: {
        component: `
A month view calendar that displays events. Multi-day events are shown as bars
spanning their days, timed events with their start time. When a day has more
events than fit, its last row becomes a "+N more" button that opens a popover
listing every event of that day. The calendar is read-only.

## Usage

Provide the events as JSON inside the element, which suits server-rendered
pages and htmx responses:

\`\`\`html
<bl-calendar week-start="1">
  <script type="application/json">
    [
      { "title": "Team offsite", "start": "2026-10-12", "end": "2026-10-14", "color": "#16a34a" },
      { "title": "Standup", "start": "2026-10-08T09:00", "end": "2026-10-08T09:15", "url": "/events/42" }
    ]
  </script>
</bl-calendar>
\`\`\`

or set them from JavaScript:

\`\`\`js
document.querySelector("bl-calendar").events = [
  { title: "Standup", start: "2026-10-08T09:00" },
];
\`\`\`

The element is registered by \`Bloum.init()\`, or manually with
\`Bloum.Calendar.register()\`.

## Attributes

- \`locale\`: language of the calendar, e.g. \`en\` or \`fr-CH\`. Defaults to
  the \`lang\` of the closest ancestor, then \`en\`.
- \`week-start\`: first day of the week, \`0\` (Sunday) to \`6\` (Saturday).
  Defaults to \`1\` (Monday).
- \`date\`: month displayed first, \`YYYY-MM\` or \`YYYY-MM-DD\`. Defaults to
  the current month.
- \`max-events\`: rows of events per day, including the "+N more" row.
  Defaults to \`3\`.

## Events

| Property | Description |
| --- | --- |
| \`title\` | Required. |
| \`start\` | Required. \`YYYY-MM-DD\` for an all-day event, \`YYYY-MM-DDTHH:mm\` for a timed event, or a \`Date\`. |
| \`end\` | Optional. For all-day events, the **last day, inclusive**: \`2026-10-12\` → \`2026-10-14\` covers three days (iCal and most calendar APIs use an exclusive end date). For timed events, the end date-time. |
| \`allDay\` | Optional. Defaults to \`true\` when \`start\` has no time. |
| \`color\` | Optional. Any CSS color, e.g. \`#16a34a\` or \`var(--brand)\`. |
| \`url\` | Optional. Renders the event as a link (\`http(s):\`, \`mailto:\`, \`tel:\` or relative URLs). |

Date-times without an offset are read in local time; with \`Z\` or an offset
they are shown in the browser's time zone. An event is shown on every day it
overlaps; an end at exactly midnight doesn't count the next day. Invalid
events are skipped with a warning in the console.

## JavaScript API

- \`events\`: get or set the events (assign a new array to update them)
- \`month\`: first day of the displayed month
- \`prev()\`, \`next()\`, \`today()\`: navigate between months
- \`gotoDate(date)\`: show the month of a \`Date\` or an ISO string

The \`bl-calendar-navigate\` event bubbles after the first render and every
time the visible range changes, e.g. to load the events of the new month.
\`event.detail\` holds \`month\`, \`start\` (first visible day), \`end\` (day after
the last visible day) and \`startStr\` / \`endStr\` as \`YYYY-MM-DD\`.

## Localization

Month and day names come from \`Intl\`, so they follow any locale. The few
labels of the calendar are translated in English and French; register other
languages on \`Bloum.Calendar.locales\` (without one, labels fall back to
English):

\`\`\`js
Bloum.Calendar.locales.de = {
  today: "Heute",
  previousMonth: "Vorheriger Monat",
  nextMonth: "Nächster Monat",
  close: "Schließen",
  more: (count) => \`+\${count} weitere\`,
  moreLabel: (count, date) => \`\${count} weitere Termine anzeigen, \${date}\`,
};
\`\`\`

## CSS classes

- \`.calendar-header\`, \`.calendar-nav\`, \`.calendar-title\`: the header
- \`.calendar-grid\`, \`.calendar-weekdays\`, \`.calendar-week\`: the grid
- \`.calendar-day\`, \`.calendar-day-today\`, \`.calendar-day-outside\` (other
  month), \`.calendar-day-number\`
- \`.calendar-event\`, \`.calendar-event-bar\` (all-day and multi-day),
  \`.calendar-event-clip-start\` / \`-clip-end\` (continues from / into another
  week), \`.calendar-event-time\`, \`.calendar-event-title\`
- \`.calendar-more\`, \`.calendar-popover\`

## CSS variables

Set on \`bl-calendar\`: \`--bl-calendar-bg\`, \`--bl-calendar-border-color\`,
\`--bl-calendar-border-radius\`, \`--bl-calendar-title-fs\`,
\`--bl-calendar-title-fw\`, \`--bl-calendar-weekday-color\`,
\`--bl-calendar-day-color\`, \`--bl-calendar-outside-color\`,
\`--bl-calendar-today-bg\`, \`--bl-calendar-today-color\`,
\`--bl-calendar-hover-bg\`, \`--bl-calendar-day-header-height\`,
\`--bl-calendar-event-color\` (default color of the events),
\`--bl-calendar-event-height\`, \`--bl-calendar-event-gap\`,
\`--bl-calendar-popover-shadow\`.

Give the calendar a height to make its weeks fill it.
        `,
      },
    },
  },
  argTypes: {
    locale: {
      control: "inline-radio",
      options: ["en", "fr"],
    },
    weekStart: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6],
      labels: {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
      },
    },
    maxEvents: {
      control: { type: "number", min: 1, max: 8 },
    },
  },
  args: {
    locale: "en",
    weekStart: 1,
    maxEvents: 3,
  },
  render: (args) => calendar(attributes(args), sampleEvents()),
};

export default meta;
type Story = StoryObj<CalendarArgs>;

export const Default: Story = {};

export const French: Story = {
  args: {
    locale: "fr",
  },
};

export const WeekStartsOnSunday: Story = {
  args: {
    weekStart: 0,
  },
};

export const InitialMonth: Story = {
  render: (args) =>
    calendar(`${attributes(args)} date="2026-02"`, [
      { title: "Winter break", start: "2026-02-09", end: "2026-02-13" },
      { title: "Board meeting", start: "2026-02-17T10:00", color: "#2563eb" },
    ]),
};

export const FixedHeight: Story = {
  render: (args) =>
    calendar(`${attributes(args)} style="height: 48rem"`, sampleEvents()),
};

export const EventsFromJavaScript: Story = {
  render: (args) => {
    Calendar.register();

    const container = document.createElement("div");
    const output = document.createElement("p");
    output.className = "mb-4";

    const element = document.createElement("bl-calendar") as Calendar;
    element.setAttribute("locale", args.locale);
    element.setAttribute("week-start", String(args.weekStart));
    element.setAttribute("max-events", String(args.maxEvents));
    element.addEventListener("bl-calendar-navigate", (event) => {
      const { startStr, endStr } = (event as CustomEvent).detail;
      output.textContent = `bl-calendar-navigate: ${startStr} → ${endStr}`;
    });
    element.events = sampleEvents();

    container.append(output, element);
    return container;
  },
};
