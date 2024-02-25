import { parseFormat } from "./date-utils";

export class DatePicker extends HTMLElement {
  static NAME = "bl-datepicker";

  static register() {
    customElements.define(DatePicker.NAME, this);
  }

  #input: HTMLInputElement;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bl-datepicker", "open");

    const format = this.getAttribute("format") ?? "%d.%m.%Y";
    const parts = parseFormat(format);

    this.#input = document.createElement("input");
    this.#input.type = "hidden";
    this.#input.name = this.getAttribute("name") ?? "";

    const today = new Date();
    this.#input.value = today.toISOString().split("T")[0];

    this.append(this.#input);

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
    const date = this.#getDateOfInput();

    const year = date.getFullYear();
    const currentMonth = date.getMonth();

    // Loop through all days of the month
    const firstDayOfMonth = new Date(year, currentMonth, 1);
    const lastDayOfMonth = new Date(year, currentMonth + 1, 0);
    const lastDayOfPreviousMonth = new Date(year, currentMonth, 0).getDate();
    const daysInMonth = lastDayOfMonth.getDate();
    const lastWeekday = lastDayOfMonth.getDay();
    const firstWeekday = firstDayOfMonth.getDay();

    const calendarHeader = document.createElement("div");
    calendarHeader.classList.add("bl-cal-header");
    const prevMonth = document.createElement("button");
    prevMonth.textContent = "<";
    prevMonth.addEventListener("click", () => {
      this.#input.value = this.#dateToString(
        new Date(year, currentMonth - 1, 1),
      );
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
      this.#input.value = this.#dateToString(
        new Date(year, currentMonth + 1, 1),
      );
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

    // Days
    let dayCounter = 1;
    for (let i = 1; i <= 42; i++) {
      const dayEl = document.createElement("div");
      dayEl.classList.add("bl-day");
      if (i < firstWeekday) {
        dayEl.textContent = (
          lastDayOfPreviousMonth -
          firstWeekday +
          i +
          1
        ).toString();
        dayEl.classList.add("bl-prev-month");
        dayEl.setAttribute("data-month", (currentMonth - 1).toString());
      } else if (i >= daysInMonth + firstWeekday) {
        dayEl.textContent = (dayCounter % daysInMonth).toString();
        dayCounter++;
        dayEl.classList.add("bl-next-month");
        dayEl.setAttribute("data-month", (currentMonth + 1).toString());
        if (dayCounter % daysInMonth > lastWeekday) {
          break;
        }
      } else {
        dayEl.textContent = dayCounter.toString();
        if (dayCounter === date.getDate()) {
          dayEl.classList.add("bl-selected");
        }
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
        const newDate = new Date(year, month, day + 1);
        this.#input.value = newDate.toISOString().split("T")[0];
        this.#renderCalendar();
      });

      container.append(dayEl);
    }
    calendar.append(container);

    this.append(calendar);
  }

  #getDateOfInput(): Date {
    const value = this.#input.value;
    return new Date(value);
  }

  #dateToString(date: Date): string {
    return `${date.getFullYear().toString().padStart(4, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  }

  #initializeInputOfType(type: string, index: number) {
    const input = document.createElement("input");
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
