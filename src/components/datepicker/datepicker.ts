import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";

const chevronLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="datepicker-chevron"><path d="m15 18-6-6 6-6"/></svg>`;
const chevronRight = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="datepicker-chevron"><path d="m9 18 6-6-6-6"/></svg>`;

export class Datepicker {
  readonly #input: HTMLInputElement;
  readonly #calendar: HTMLElement;
  readonly #cleanUp: VoidFunction;
  readonly #today = new Date();
  #currentYear = this.#today.getFullYear();
  #currentMonth = this.#today.getMonth();

  constructor(input: HTMLInputElement) {
    this.#input = input;
    this.#input.removeAttribute("data-datepicker");
    this.#input.classList.add("datepicker");
    const wrapper = document.createElement("div");
    wrapper.classList.add("datepicker-wrapper");
    this.#input.parentNode?.insertBefore(wrapper, this.#input);
    wrapper.append(this.#input);

    this.#calendar = document.createElement("div");
    this.#calendar.classList.add("datepicker-calendar");
    wrapper.append(this.#calendar);

    this.#cleanUp = autoUpdate(
      this.#input,
      this.#calendar,
      this.#updatePosition.bind(this),
    );

    this.#input.addEventListener("input", () => {
      console.log(this.#input.value);
    });

    this.#renderCalendar();
  }

  destroy() {
    this.#cleanUp();
  }

  #renderCalendar() {
    this.#calendar.innerHTML = "";

    // Render the navigation
    const navigationEl = document.createElement("div");
    navigationEl.classList.add("datepicker-nav");
    this.#calendar.append(navigationEl);

    const leftArrow = document.createElement("button");
    leftArrow.classList.add(
      "datepicker-nav-button",
      "btn",
      "btn-icon",
      "btn-ghost",
    );
    leftArrow.innerHTML = chevronLeft;
    navigationEl.append(leftArrow);

    const monthEl = document.createElement("select");
    monthEl.classList.add("datepicker-month", "input");
    for (let i = 0; i < 12; i++) {
      const month = new Date(2026, i, 1).toLocaleString("default", {
        month: "long",
      });
      const option = document.createElement("option");
      option.value = `${i}`;
      option.textContent = month;
      monthEl.append(option);
    }
    navigationEl.append(monthEl);

    const yearEl = document.createElement("select");
    yearEl.classList.add("datepicker-year", "input");
    for (
      let i = this.#today.getFullYear();
      i >= this.#today.getFullYear() - 100;
      i--
    ) {
      const option = document.createElement("option");
      option.value = `${i}`;
      option.textContent = `${i}`;
      yearEl.append(option);
    }
    navigationEl.append(yearEl);

    const rightArrow = document.createElement("button");
    rightArrow.classList.add(
      "datepicker-nav-button",
      "btn",
      "btn-icon",
      "btn-ghost",
    );
    rightArrow.innerHTML = chevronRight;
    navigationEl.append(rightArrow);

    const daysEl = document.createElement("div");
    daysEl.classList.add("datepicker-days");
    this.#calendar.append(daysEl);

    const numberOfDaysInMonth = new Date(
      this.#currentYear,
      this.#currentMonth + 1,
      0,
    ).getDate();

    // Render header
    const dayNames = this.#getDayNames();
    for (const dayName of dayNames) {
      const day = document.createElement("div");
      day.classList.add("datepicker-day");
      day.textContent = dayName;
      daysEl.append(day);
    }

    // Render the offset (days before the first day of the month)
    const firstDayOfMonth = new Date(this.#currentYear, this.#currentMonth, 1);
    const firstDayOfWeek = (firstDayOfMonth.getDay() - 1) % 7;
    for (
      let i = numberOfDaysInMonth - firstDayOfWeek;
      i < numberOfDaysInMonth;
      i++
    ) {
      const day = document.createElement("btn");
      day.classList.add("datepicker-day", "btn", "btn-ghost");
      day.classList.add("datepicker-day-placeholder");
      day.textContent = `${i + 1}`;
      daysEl.append(day);
    }

    // Render days
    for (let i = 0; i < numberOfDaysInMonth; i++) {
      const day = document.createElement("button");
      day.classList.add("datepicker-day", "btn", "btn-ghost");
      if (
        i + 1 === this.#today.getDate() &&
        this.#currentYear === this.#today.getFullYear()
      ) {
        day.classList.add("btn-primary");
        day.classList.remove("btn-ghost");
      }
      day.textContent = `${i + 1}`;
      daysEl.append(day);
    }

    const remainingDays = 7 - ((firstDayOfWeek + numberOfDaysInMonth) % 7);
    for (let i = 0; i < remainingDays; i++) {
      const day = document.createElement("btn");
      day.classList.add("datepicker-day", "btn", "btn-ghost");
      day.classList.add("datepicker-day-placeholder");
      day.textContent = `${i + 1}`;
      daysEl.append(day);
    }
  }

  #updatePosition() {
    computePosition(this.#input, this.#calendar, {
      placement: "bottom-start",
      middleware: [
        offset(6),
        flip({
          crossAxis: false,
        }),
        shift({ padding: 6 }),
      ],
    }).then(({ x, y }) => {
      Object.assign(this.#calendar.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  #getDayNames() {
    let lang = "fr-CH";
    if (navigator.language !== undefined) {
      lang = navigator.language;
    }

    const formatter = new Intl.DateTimeFormat(lang, { weekday: "short" });
    // January 5th, 2026 was a Monday
    return Array.from({ length: 7 }, (_, i) =>
      formatter.format(new Date(2026, 0, 5 + i)),
    );
  }
}

export function initDatePicker() {
  for (const input of document.querySelectorAll("input[data-datepicker]")) {
    new Datepicker(input as HTMLInputElement);
  }
}
