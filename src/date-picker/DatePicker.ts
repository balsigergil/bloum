import { parseFormat } from "./date-utils";

export class DatePicker extends HTMLElement {
  static NAME = "bl-datepicker";

  static register() {
    customElements.define(DatePicker.NAME, this);
  }

  #inputDate!: HTMLInputElement;
  #viewDate!: Date;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bl-datepicker", "open");

    const format = this.getAttribute("format") ?? "%d.%m.%Y";
    const parts = parseFormat(format);

    this.#inputDate = document.createElement("input");
    this.#inputDate.type = "hidden";
    this.#inputDate.name = this.getAttribute("name") ?? "";

    const today = new Date();
    this.#inputDate.value = this.#dateToString(today);
    this.#viewDate = today;

    this.append(this.#inputDate);

    if (!parts) {
      return;
    }
    for (let i = 0; i < parts.length; i++) {
      this.append(this.#initializeInputOfType(parts[i], i));
    }

    this.#renderCalendar();
  }

  #renderCalendar() {
    this.querySelector(".bl-calendar")?.remove();
    const calendar = document.createElement("div");
    calendar.classList.add("bl-calendar");

    const date = this.#viewDate;
    const selectedDate = this.#getDateOfInput();

    const year = date.getFullYear();
    const currentMonth = date.getMonth();

    // Loop through all days of the month
    const firstDayOfMonth = new Date(year, currentMonth, 1);
    const lastDayOfMonth = new Date(year, currentMonth + 1, 0);
    const lastDayOfPreviousMonth = new Date(year, currentMonth, 0).getDate();
    const daysInMonth = lastDayOfMonth.getDate();
    const firstWeekday = firstDayOfMonth.getDay();

    const calendarHeader = document.createElement("div");
    calendarHeader.classList.add("bl-cal-header");
    const prevMonth = document.createElement("button");
    prevMonth.textContent = "<";
    prevMonth.addEventListener("click", () => {
      this.#viewDate = new Date(year, currentMonth - 1, 1);
      this.#renderCalendar();
    });
    calendarHeader.append(prevMonth);

    const monthYear = document.createElement("div");
    monthYear.textContent = `${date.toLocaleString("default", {
      month: "long",
    })} ${year}`;
    calendarHeader.append(monthYear);

    const nextMonth = document.createElement("button");
    nextMonth.textContent = ">";
    nextMonth.addEventListener("click", () => {
      this.#viewDate = new Date(year, currentMonth + 1, 1);
      this.#renderCalendar();
    });
    calendarHeader.append(nextMonth);

    calendar.append(calendarHeader);

    const container = document.createElement("div");
    container.classList.add("bl-cal-wrapper");

    // Weekdays
    const weekdays = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
    weekdays.forEach((weekday) => {
      const weekdayEl = document.createElement("div");
      weekdayEl.textContent = weekday;
      weekdayEl.classList.add("bl-weekday");
      container.append(weekdayEl);
    });

    const FIRST_WEEKDAY = 1;

    // Days
    let dayCounter = 1;
    for (let i = FIRST_WEEKDAY; i <= 42; i++) {
      const dayEl = document.createElement("div");
      dayEl.classList.add("bl-day");

      if (i < firstWeekday) {
        const day = lastDayOfPreviousMonth - firstWeekday + i + 1;
        dayEl.textContent = day.toString();
        dayEl.classList.add("bl-prev-month");
        if (
          day === selectedDate.getDate() &&
          currentMonth - 1 === selectedDate.getMonth() &&
          year === selectedDate.getFullYear()
        ) {
          dayEl.classList.add("bl-selected");
          dayEl.tabIndex = 1;
        }
      } else if (i >= daysInMonth + firstWeekday) {
        const day = dayCounter % daysInMonth;
        dayEl.textContent = day.toString();
        dayCounter++;
        dayEl.classList.add("bl-next-month");

        if (
          day === selectedDate.getDate() &&
          currentMonth + 1 === selectedDate.getMonth() &&
          year === selectedDate.getFullYear()
        ) {
          dayEl.classList.add("bl-selected");
          dayEl.tabIndex = 1;
        }
        if (i % 7 === FIRST_WEEKDAY) {
          break;
        }
      } else {
        if (
          dayCounter === selectedDate.getDate() &&
          currentMonth === selectedDate.getMonth() &&
          year === selectedDate.getFullYear()
        ) {
          dayEl.classList.add("bl-selected");
          dayEl.tabIndex = 1;
        }
        dayEl.textContent = dayCounter.toString();
        dayCounter++;
      }

      dayEl.addEventListener("click", (e) => {
        const el = e.target as HTMLDivElement;
        const day = parseInt(el.textContent ?? "");
        let month = currentMonth;
        if (el.classList.contains("bl-prev-month")) {
          month -= 1;
        } else if (el.classList.contains("bl-next-month")) {
          month += 1;
        }
        const newDate = new Date(year, month, day);
        this.#setDate(newDate);
      });

      container.append(dayEl);
    }
    calendar.append(container);

    this.append(calendar);
  }

  #setDate(date: Date) {
    this.#inputDate.value = this.#dateToString(date);
    this.#viewDate = date;
    this.#renderCalendar();

    for (const input of this.querySelectorAll<HTMLInputElement>(
      ".bl-date-input",
    )) {
      const type = input.getAttribute("data-type");
      switch (type) {
        case "%d":
          input.value = date.getDate().toString().padStart(2, "0");
          break;
        case "%m":
          input.value = (date.getMonth() + 1).toString().padStart(2, "0");
          break;
        case "%Y":
          input.value = date.getFullYear().toString().padStart(4, "0");
          break;
      }
    }
  }

  #getDateOfInput(): Date {
    const value = this.#inputDate.value;
    return new Date(value);
  }

  #setDateFromInput() {
    let day = -1;
    let month = -1;
    let year = -1;
    for (const input of this.querySelectorAll<HTMLInputElement>(
      ".bl-date-input",
    )) {
      const type = input.getAttribute("data-type");
      const value = parseInt(input.value);
      if (isNaN(value)) {
        break;
      }
      switch (type) {
        case "%d":
          day = value;
          break;
        case "%m":
          month = value - 1;
          break;
        case "%Y":
          year = value;
          break;
      }
    }

    if (day === -1 || month === -1 || year === -1) {
      return;
    }
    const date = new Date(year, month, day);
    this.#setDate(date);
  }

  #dateToString(date: Date): string {
    return `${date.getFullYear().toString().padStart(4, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  }

  #initializeInputOfType(type: string, index: number) {
    const input = document.createElement("input");
    input.classList.add("bl-date-input");
    input.setAttribute("data-type", type);

    const onFocus = (e: FocusEvent) => {
      e.preventDefault();
      const el = e.target as HTMLInputElement;
      el.setSelectionRange(0, el.value.length);
    };

    const onBlur = (e: FocusEvent) => {
      const el = e.target as HTMLInputElement;
      const value = parseInt(el.value);
      if (el.value === "" || isNaN(value)) {
        el.value = el.getAttribute("placeholder") ?? "";
      }
      this.#setDateFromInput();
    };

    const incrementValue = (el: HTMLInputElement) => {
      const value = parseInt(el.value);
      const today = new Date();
      switch (type) {
        case "%d":
          if (isNaN(value)) {
            el.value = today.getDate().toString().padStart(2, "0");
          } else {
            if (value === 31) {
              el.value = "01";
            } else {
              el.value = (value + 1).toString().padStart(2, "0");
            }
          }
          break;
        case "%m":
          if (isNaN(value)) {
            el.value = today.getMonth().toString().padStart(2, "0");
          } else {
            if (value === 12) {
              el.value = "01";
            } else {
              el.value = (value + 1).toString().padStart(2, "0");
            }
          }
          break;
        case "%Y":
          if (isNaN(value)) {
            el.value = today.getFullYear().toString().padStart(4, "0");
          } else {
            if (value === 9999) {
              el.value = "0001";
            } else {
              el.value = (value + 1).toString().padStart(4, "0");
            }
          }
          break;
      }
    };

    const decrementValue = (el: HTMLInputElement) => {
      const value = parseInt(el.value);
      const today = new Date();
      switch (type) {
        case "%d":
          if (isNaN(value)) {
            el.value = today.getDate().toString().padStart(2, "0");
          } else {
            if (value === 1) {
              el.value = "31";
            } else {
              el.value = (value - 1).toString().padStart(2, "0");
            }
          }
          break;
        case "%m":
          if (isNaN(value)) {
            el.value = today.getMonth().toString().padStart(2, "0");
          } else {
            if (value === 1) {
              el.value = "12";
            } else {
              el.value = (value - 1).toString().padStart(2, "0");
            }
          }
          break;
        case "%Y":
          if (isNaN(value)) {
            el.value = today.getFullYear().toString().padStart(4, "0");
          } else {
            if (value === 1) {
              el.value = "9999";
            } else {
              el.value = (value - 1).toString().padStart(4, "0");
            }
          }
          break;
      }
    };

    const focusNext = (el: HTMLInputElement) => {
      const next = el.nextElementSibling as HTMLInputElement | null;
      if (next) {
        next.focus();
      }
    };

    const focusPrevious = (el: HTMLInputElement) => {
      const previous = el.previousElementSibling as HTMLInputElement | null;
      if (previous) {
        previous.focus();
      }
    };

    const onKeydown = (e: KeyboardEvent) => {
      const el = e.target as HTMLInputElement;

      if (e.key === "Backspace") {
        e.preventDefault();
        el.value = el.getAttribute("placeholder") ?? "";
        el.setSelectionRange(0, el.value.length);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusPrevious(el);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        focusNext(el);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        incrementValue(el);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        decrementValue(el);
      }
      if (e.key === "Tab") {
        return;
      }
      if (e.key === "Enter") {
        this.#setDateFromInput();
      }

      // Allow only numbers
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    };

    const checkAndMoveToNext = (el: HTMLInputElement) => {
      const value = parseInt(el.value);
      if (isNaN(value)) {
        return;
      }
      switch (type) {
        case "%d":
          if (value > 3 && index < 2) {
            if (value > 31) {
              el.value = "31";
            }
            focusNext(el);
          }
          break;
        case "%m":
          if (value > 1 && index < 2) {
            if (value > 12) {
              el.value = "12";
            }
            focusNext(el);
          }
          break;
        case "%Y":
          if (el.value.length === 4 && index < 2) {
            if (value > 9999) {
              el.value = "9999";
            }
            focusNext(el);
          }
          break;
      }
    };

    input.addEventListener("focus", onFocus);
    input.addEventListener("blur", onBlur);
    input.addEventListener("keydown", onKeydown);
    input.addEventListener("input", (e) => {
      const el = e.target as HTMLInputElement;
      checkAndMoveToNext(el);
    });

    switch (type) {
      case "%d":
        input.setAttribute("placeholder", "jj");
        input.value = "jj";
        break;
      case "%m":
        input.setAttribute("placeholder", "mm");
        input.value = "mm";
        break;
      case "%Y":
        input.setAttribute("placeholder", "aaaa");
        input.value = "aaaa";
        break;
    }
    return input;
  }
}
