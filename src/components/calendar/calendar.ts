import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  size,
} from "@floating-ui/dom";
import chevronIcon from "../../icons/chevron-right.svg?raw";
import closeIcon from "../../icons/close.svg?raw";
import {
  fromDay,
  parseDateInput,
  parseMonth,
  toDay,
  toISODate,
} from "../../utils/date";
import { randomId } from "../../utils/random";
import {
  CalendarEvent,
  eventsOnDay,
  gridStart,
  layoutWeek,
  NormalizedEvent,
  normalizeEvents,
} from "./layout";
import { calendarLocales, CalendarMessages, resolveLocale } from "./locales";

/** Weeks shown by the grid, so its height doesn't change between months. */
const WEEKS = 6;
const DEFAULT_WEEK_START = 1;
const DEFAULT_MAX_EVENTS = 3;
const SAFE_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

export interface CalendarNavigateDetail {
  /** First day of the displayed month. */
  month: Date;
  /** First visible day. */
  start: Date;
  /** Day after the last visible day. */
  end: Date;
  /** `start` as `YYYY-MM-DD`. */
  startStr: string;
  /** `end` as `YYYY-MM-DD`. */
  endStr: string;
}

interface Formats {
  title: Intl.DateTimeFormat;
  weekday: Intl.DateTimeFormat;
  day: Intl.DateTimeFormat;
  time: Intl.DateTimeFormat;
}

/**
 * Only keep URLs that can't run script (no `javascript:` links from event data).
 */
function safeUrl(url: string | undefined): string | undefined {
  if (url === undefined) {
    return undefined;
  }
  try {
    if (SAFE_PROTOCOLS.includes(new URL(url, document.baseURI).protocol)) {
      return url;
    }
  } catch {
    // Invalid URL
  }
  console.warn("[Calendar] Ignoring unsafe or invalid event url:", url);
  return undefined;
}

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  el.className = className;
  return el;
}

/**
 * Month view calendar displaying events.
 *
 * ```html
 * <bl-calendar locale="fr" week-start="1">
 *   <script type="application/json">
 *     [{ "title": "Offsite", "start": "2026-10-12", "end": "2026-10-14" }]
 *   </script>
 * </bl-calendar>
 * ```
 */
export class Calendar extends HTMLElement {
  static NAME = "bl-calendar";

  /**
   * Messages by language tag. Add an entry to support another language.
   */
  static locales: Record<string, CalendarMessages> = calendarLocales;

  static observedAttributes = ["locale", "week-start", "date", "max-events"];

  static register() {
    if (customElements.get(this.NAME)) {
      return;
    }
    customElements.define(this.NAME, this);
  }

  #ready = false;
  #eventsSet = false;
  #source: CalendarEvent[] = [];
  #events: NormalizedEvent[] = [];
  #month: Date | null = null;
  /** First day of the grid of the last navigate event. */
  #rangeStart: number | null = null;

  #locale = "";
  #messages: CalendarMessages = calendarLocales.en;
  #formats: Formats | null = null;

  #header!: HTMLElement;
  #title!: HTMLElement;
  #todayButton!: HTMLButtonElement;
  #prevButton!: HTMLButtonElement;
  #nextButton!: HTMLButtonElement;
  #grid!: HTMLElement;
  #popover!: HTMLElement;
  #popoverTitle!: HTMLElement;
  #popoverClose!: HTMLButtonElement;
  #popoverEvents!: HTMLElement;
  #popoverTrigger: HTMLButtonElement | null = null;
  /** The pointer went down on the trigger of the open popover. */
  #triggerPressed = false;
  #cleanupPopover: VoidFunction | null = null;

  constructor() {
    super();
  }

  /**
   * Events of the calendar. Assign a new array to update them.
   */
  get events(): CalendarEvent[] {
    return this.#source;
  }

  set events(value: CalendarEvent[]) {
    this.#eventsSet = true;
    this.#source = value;
    this.#events = normalizeEvents(value).map((event) => {
      if (event.color !== undefined && !CSS.supports("color", event.color)) {
        console.warn("[Calendar] Ignoring invalid event color:", event.color);
        event.color = undefined;
      }
      event.url = safeUrl(event.url);
      return event;
    });
    if (this.#ready) {
      this.#render();
    }
  }

  /**
   * First day of the displayed month.
   */
  get month(): Date {
    return new Date(this.#currentMonth());
  }

  prev() {
    this.#shiftMonth(-1);
  }

  next() {
    this.#shiftMonth(1);
  }

  today() {
    this.gotoDate(new Date());
  }

  /**
   * Show the month of a date: a `Date`, `YYYY-MM`, `YYYY-MM-DD` or an ISO
   * date-time.
   */
  gotoDate(date: Date | string) {
    const parsed =
      (typeof date === "string" && parseMonth(date)) ||
      parseDateInput(date)?.date;
    if (!parsed) {
      console.warn("[Calendar] Invalid date:", date);
      return;
    }
    this.#month = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
    if (this.#ready) {
      this.#render();
    }
  }

  connectedCallback() {
    // A value assigned before the element was upgraded shadows the accessor
    if (Object.hasOwn(this, "events")) {
      const value = (this as any).events;
      delete (this as any).events;
      this.events = value;
    }

    if (this.#ready) {
      return;
    }

    // When the element is defined before the parser reaches it, its children
    // (the JSON script) don't exist yet.
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.#setup(), {
        once: true,
      });
    } else {
      this.#setup();
    }
  }

  disconnectedCallback() {
    if (this.#ready) {
      this.#closePopover(false);
    }
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (!this.#ready || oldValue === newValue) {
      return;
    }
    if (name === "date") {
      this.#month = this.#initialMonth();
    }
    this.#render();
  }

  #setup() {
    if (this.#ready || !this.isConnected) {
      return;
    }

    const script = this.querySelector(
      ':scope > script[type="application/json"]',
    );
    if (script && !this.#eventsSet) {
      try {
        this.events = JSON.parse(script.textContent || "[]");
      } catch (error) {
        console.warn("[Calendar] Invalid JSON events:", error);
      }
    }

    this.#month ??= this.#initialMonth();
    this.#buildHeader();
    this.#grid = element("div", "calendar-grid");
    this.#grid.tabIndex = -1;
    this.#buildPopover();
    this.replaceChildren(this.#header, this.#grid, this.#popover);

    this.addEventListener("click", this.#onClick);
    this.addEventListener("keydown", this.#onKeydown);
    this.addEventListener("focusout", this.#onFocusOut);

    this.#ready = true;
    this.#render();
  }

  #buildHeader() {
    this.#header = element("div", "calendar-header");
    const nav = element("div", "calendar-nav");

    this.#todayButton = element("button", "btn btn-outline btn-sm");
    this.#todayButton.dataset.calendarAction = "today";

    this.#prevButton = element(
      "button",
      "btn btn-ghost btn-sm btn-icon calendar-prev",
    );
    this.#prevButton.dataset.calendarAction = "prev";
    this.#prevButton.innerHTML = chevronIcon;

    this.#nextButton = element(
      "button",
      "btn btn-ghost btn-sm btn-icon calendar-next",
    );
    this.#nextButton.dataset.calendarAction = "next";
    this.#nextButton.innerHTML = chevronIcon;

    for (const button of [
      this.#todayButton,
      this.#prevButton,
      this.#nextButton,
    ]) {
      button.type = "button";
    }

    this.#title = element("div", "calendar-title");
    this.#title.setAttribute("aria-live", "polite");

    nav.append(this.#todayButton, this.#prevButton, this.#nextButton);
    this.#header.append(nav, this.#title);
  }

  #buildPopover() {
    this.#popover = element("div", "calendar-popover");
    this.#popover.setAttribute("role", "dialog");
    this.#popover.hidden = true;

    const header = element("div", "calendar-popover-header");
    this.#popoverTitle = element("div", "calendar-popover-title");
    this.#popoverTitle.id = `calendar-popover-${randomId()}`;
    this.#popover.setAttribute("aria-labelledby", this.#popoverTitle.id);

    this.#popoverClose = element("button", "btn btn-ghost btn-icon btn-xs");
    this.#popoverClose.type = "button";
    this.#popoverClose.dataset.calendarAction = "close";
    this.#popoverClose.innerHTML = closeIcon;

    this.#popoverEvents = element("div", "calendar-popover-events");

    header.append(this.#popoverTitle, this.#popoverClose);
    this.#popover.append(header, this.#popoverEvents);
  }

  #currentMonth(): Date {
    return (this.#month ??= this.#initialMonth());
  }

  #initialMonth(): Date {
    const month = parseMonth(this.getAttribute("date"));
    if (month) {
      return month;
    }
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }

  #shiftMonth(offset: number) {
    const month = this.#currentMonth();
    this.#month = new Date(month.getFullYear(), month.getMonth() + offset, 1);
    if (this.#ready) {
      this.#render();
    }
  }

  #weekStart(): number {
    const value = parseInt(this.getAttribute("week-start") ?? "", 10);
    return value >= 0 && value <= 7 ? value % 7 : DEFAULT_WEEK_START;
  }

  #maxEvents(): number {
    const value = parseInt(this.getAttribute("max-events") ?? "", 10);
    return isNaN(value) ? DEFAULT_MAX_EVENTS : Math.max(1, value);
  }

  /**
   * Resolve the locale from the `locale` attribute or the closest `lang`, and
   * update the translated labels when it changed.
   */
  #updateLocale() {
    const tag =
      this.getAttribute("locale") ||
      this.closest('[lang]:not([lang=""])')?.getAttribute("lang");
    const { locale, messages } = resolveLocale(tag);

    if (locale === this.#locale && messages === this.#messages) {
      return;
    }

    this.#locale = locale;
    this.#messages = messages;
    this.#formats = {
      title: new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }),
      weekday: new Intl.DateTimeFormat(locale, { weekday: "short" }),
      day: new Intl.DateTimeFormat(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
      time: new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    for (const el of [this.#header, this.#grid, this.#popover]) {
      el.lang = locale;
    }
    this.#todayButton.textContent = messages.today;
    this.#prevButton.setAttribute("aria-label", messages.previousMonth);
    this.#nextButton.setAttribute("aria-label", messages.nextMonth);
    this.#popoverClose.setAttribute("aria-label", messages.close);
  }

  #render() {
    const active = document.activeElement;
    const hadFocus =
      this.#grid.contains(active) || this.#popover.contains(active);
    this.#closePopover(false);
    this.#updateLocale();

    const formats = this.#formats!;
    const month = this.#currentMonth();
    const weekStart = this.#weekStart();
    const maxEvents = this.#maxEvents();
    const start = gridStart(month, weekStart);
    const end = start + WEEKS * 7;
    const today = toDay(new Date());
    const events = this.#events.filter(
      (event) => event.firstDay < end && event.lastDay >= start,
    );

    this.#title.textContent = formats.title.format(month);

    const weekdays = element("div", "calendar-weekdays");
    weekdays.setAttribute("aria-hidden", "true");
    for (let col = 0; col < 7; col++) {
      const weekday = element("div", "calendar-weekday");
      weekday.textContent = formats.weekday.format(fromDay(start + col));
      weekdays.append(weekday);
    }

    const weeks: HTMLElement[] = [];
    for (let week = 0; week < WEEKS; week++) {
      const weekStartDay = start + week * 7;
      const { segments, more } = layoutWeek(events, weekStartDay, maxEvents);
      const row = element("div", "calendar-week");

      // Each day is followed by the events starting on it, so that screen
      // readers read them together. The grid placement is explicit.
      for (let col = 0; col < 7; col++) {
        const day = weekStartDay + col;
        row.append(this.#renderDay(day, col, month, today));

        for (const segment of segments) {
          if (segment.hidden || segment.start !== col) {
            continue;
          }
          const el = this.#renderEvent(segment.event, !segment.clipStart);
          el.style.gridColumn = `${col + 1} / span ${segment.end - col + 1}`;
          el.style.gridRow = String(segment.lane + 2);
          el.classList.toggle("calendar-event-clip-start", segment.clipStart);
          el.classList.toggle("calendar-event-clip-end", segment.clipEnd);
          row.append(el);
        }

        if (more[col] > 0) {
          row.append(this.#renderMore(day, col, more[col], maxEvents));
        }
      }
      weeks.push(row);
    }

    this.#grid.style.setProperty("--bl-calendar-max-events", String(maxEvents));
    this.#grid.replaceChildren(weekdays, ...weeks);

    if (hadFocus) {
      this.#grid.focus({ preventScroll: true });
    }

    if (start !== this.#rangeStart) {
      this.#rangeStart = start;
      this.dispatchEvent(
        new CustomEvent<CalendarNavigateDetail>("bl-calendar-navigate", {
          bubbles: true,
          detail: {
            month: new Date(month),
            start: fromDay(start),
            end: fromDay(end),
            startStr: toISODate(start),
            endStr: toISODate(end),
          },
        }),
      );
    }
  }

  #renderDay(day: number, col: number, month: Date, today: number) {
    const date = fromDay(day);
    const cell = element("div", "calendar-day");
    cell.style.gridColumn = String(col + 1);
    cell.classList.toggle(
      "calendar-day-outside",
      date.getMonth() !== month.getMonth(),
    );
    cell.classList.toggle("calendar-day-today", day === today);

    const time = element("time", "calendar-day-number");
    time.dateTime = toISODate(day);
    if (day === today) {
      time.setAttribute("aria-current", "date");
    }

    const number = document.createElement("span");
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(date.getDate());

    const label = element("span", "calendar-sr-only");
    label.textContent = this.#formats!.day.format(date);

    time.append(number, label);
    cell.append(time);
    return cell;
  }

  /**
   * @param showTime show the start time of timed events (false on the
   * segments of an event that started on a previous day)
   */
  #renderEvent(event: NormalizedEvent, showTime: boolean): HTMLElement {
    let el: HTMLElement;
    if (event.url) {
      const link = element("a", "calendar-event");
      link.href = event.url;
      el = link;
    } else {
      el = element("div", "calendar-event");
    }
    el.classList.toggle("calendar-event-bar", event.bar);
    if (event.color) {
      el.style.setProperty("--bl-calendar-event-color", event.color);
    }

    let label = event.title;
    if (!event.allDay && showTime) {
      const time = element("span", "calendar-event-time");
      time.textContent = this.#formats!.time.format(event.startMs);
      el.append(time);
      label = `${time.textContent} ${label}`;
    }

    const title = element("span", "calendar-event-title");
    title.textContent = event.title;
    el.append(title);
    el.title = label;
    return el;
  }

  #renderMore(day: number, col: number, count: number, maxEvents: number) {
    const button = element("button", "calendar-more");
    button.type = "button";
    button.dataset.day = String(day);
    button.style.gridColumn = String(col + 1);
    button.style.gridRow = String(maxEvents + 1);
    button.textContent = this.#messages.more(count);
    button.setAttribute(
      "aria-label",
      this.#messages.moreLabel(count, this.#formats!.day.format(fromDay(day))),
    );
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-expanded", "false");
    return button;
  }

  #openPopover(trigger: HTMLButtonElement) {
    this.#closePopover(false);

    const day = Number(trigger.dataset.day);
    this.#popoverTitle.textContent = this.#formats!.day.format(fromDay(day));
    this.#popoverEvents.replaceChildren(
      ...eventsOnDay(this.#events, day).map((event) =>
        this.#renderEvent(event, event.firstDay === day),
      ),
    );

    this.#popover.hidden = false;
    this.#popoverTrigger = trigger;
    trigger.setAttribute("aria-expanded", "true");
    this.#cleanupPopover = autoUpdate(trigger, this.#popover, () =>
      this.#positionPopover(trigger),
    );
    document.addEventListener("pointerdown", this.#onDocumentPointerDown);
    this.#popoverClose.focus({ preventScroll: true });
  }

  #closePopover(restoreFocus: boolean) {
    if (this.#popover.hidden) {
      return;
    }
    this.#popover.hidden = true;
    this.#cleanupPopover?.();
    this.#cleanupPopover = null;
    document.removeEventListener("pointerdown", this.#onDocumentPointerDown);

    const trigger = this.#popoverTrigger;
    this.#popoverTrigger = null;
    this.#triggerPressed = false;
    trigger?.setAttribute("aria-expanded", "false");
    if (restoreFocus && trigger?.isConnected) {
      trigger.focus();
    }
  }

  #positionPopover(trigger: HTMLElement) {
    const popover = this.#popover;
    computePosition(trigger, popover, {
      strategy: "fixed",
      placement: "bottom-start",
      middleware: [
        offset(4),
        flip(),
        shift({ padding: 8 }),
        size({
          padding: 8,
          apply({ availableHeight }) {
            popover.style.maxHeight = `${Math.max(0, availableHeight)}px`;
          },
        }),
      ],
    }).then(({ x, y }) => {
      Object.assign(popover.style, { left: `${x}px`, top: `${y}px` });
    });
  }

  readonly #onClick = (event: MouseEvent) => {
    const target = event.target as Element;

    const action = target.closest<HTMLElement>("[data-calendar-action]")
      ?.dataset.calendarAction;
    switch (action) {
      case "prev":
        return this.prev();
      case "next":
        return this.next();
      case "today":
        return this.today();
      case "close":
        return this.#closePopover(true);
    }

    const more = target.closest<HTMLButtonElement>(".calendar-more");
    if (more && this.#grid.contains(more)) {
      if (this.#popoverTrigger === more) {
        this.#closePopover(true);
      } else {
        this.#openPopover(more);
      }
    }
  };

  readonly #onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && !this.#popover.hidden) {
      // Don't close an enclosing modal or drawer as well
      event.stopPropagation();
      this.#closePopover(true);
    }
  };

  readonly #onFocusOut = (event: FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    // Without a related target, focus left the window or went to a
    // non-focusable element: pointerdown handles the latter. Pressing the
    // trigger focuses it, but its click toggles the popover.
    if (
      !this.#popover.hidden &&
      next &&
      !(this.#triggerPressed && next === this.#popoverTrigger) &&
      !this.#popover.contains(next) &&
      this.#popover.contains(event.target as Node)
    ) {
      this.#closePopover(false);
    }
  };

  readonly #onDocumentPointerDown = (event: PointerEvent) => {
    const target = event.target as Node;
    if (this.#popoverTrigger?.contains(target)) {
      this.#triggerPressed = true;
      return;
    }
    if (!this.#popover.contains(target)) {
      this.#closePopover(false);
    }
  };
}
