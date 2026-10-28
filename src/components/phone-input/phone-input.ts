import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  size,
} from "@floating-ui/dom";
import {
  COUNTRIES,
  countryFlag,
  countryFormats,
  digitCount,
  formatNational,
  type PhoneCountry,
} from "./countries";

export interface PhoneInputConfig {
  /**
   * ISO code of the country selected when the input has no international
   * value. Defaults to the region of the browser language, then to the first
   * available country.
   */
  country?: string;

  /**
   * ISO codes of the countries offered in the menu. Defaults to all of
   * `PhoneInput.countries`.
   */
  countries?: string[];

  /**
   * Placeholder of the country search field.
   */
  searchPlaceholder?: string;

  /**
   * Text shown when no country matches the search.
   */
  noResultsText?: string;

  /**
   * Validation message of an incomplete or too long number.
   */
  invalidMessage?: string;
}

export interface PhoneInputCountryChangeDetail {
  country: string;
  dialCode: string;
}

export interface BloumPhoneInputElement extends HTMLInputElement {
  blPhoneInput?: PhoneInput;
}

const DEFAULT_CONFIG: Required<
  Omit<PhoneInputConfig, "country" | "countries">
> = {
  searchPlaceholder: "Search...",
  noResultsText: "No results found",
  invalidMessage: "Please enter a valid phone number.",
};

// Used to generate unique ids for the menu options
let instanceCount = 0;

/**
 * A phone number input with a country selector inside the same field. The
 * number is formatted as it is typed with the pattern of the selected
 * country, and a hidden input carries the E.164 value (`+41791234567`) under
 * the original `name`.
 */
export class PhoneInput {
  /**
   * Countries known by every phone input. Push to it or replace it before
   * initializing to support more countries or other formats.
   */
  static countries: PhoneCountry[] = COUNTRIES;

  // The text input the user types in
  readonly #field: BloumPhoneInputElement;

  readonly #config: PhoneInputConfig & typeof DEFAULT_CONFIG;
  readonly #countries: PhoneCountry[];
  readonly #id = `bl-phone-input-${++instanceCount}`;

  #wrapper!: HTMLDivElement;
  #countryButton!: HTMLButtonElement;
  #flag!: HTMLSpanElement;
  #dialCode!: HTMLSpanElement;
  #menu!: HTMLDivElement;
  #searchInput!: HTMLInputElement;
  #optionsContainer!: HTMLDivElement;
  #options: HTMLDivElement[] = [];
  #noResults!: HTMLDivElement;

  // Carries the E.164 value under the original name
  #hidden: HTMLInputElement | null = null;

  #country!: PhoneCountry;
  #digits = "";
  #highlighted = -1;

  // Original attributes, restored on destroy
  readonly #name: string | null;
  readonly #placeholder: string | null;
  readonly #inputMode: string | null;
  readonly #autocomplete: string | null;

  #form: HTMLFormElement | null = null;
  #cleanupFloating: VoidFunction | null = null;
  readonly #removalObserver: MutationObserver;

  constructor(
    element: string | BloumPhoneInputElement,
    config?: PhoneInputConfig,
  ) {
    if (typeof element === "string") {
      const domElement =
        document.querySelector<BloumPhoneInputElement>(element);
      if (domElement === null) {
        throw new Error(
          `Element ${element} not found to initialize BlPhoneInput`,
        );
      }
      element = domElement;
    }

    if (!(element instanceof HTMLInputElement)) {
      throw new Error(
        "A phone input must be initialized on an <input> element",
      );
    }

    if (element.blPhoneInput !== undefined) {
      element.blPhoneInput.destroy();
    }

    // Unwrap a stale rendering (needed for HTMX compatibility with hx-boost)
    const stale = element.closest(".phone-input");
    if (stale !== null) {
      const staleHidden =
        stale.querySelector<HTMLInputElement>("input[type=hidden]");
      if (staleHidden && !element.hasAttribute("name")) {
        element.name = staleHidden.name;
      }
      element.classList.remove("phone-input-field");
      stale.replaceWith(element);
    }

    this.#field = element;
    this.#field.blPhoneInput = this;
    this.#config = parseConfig(this.#field, config);
    this.#countries = this.#availableCountries();

    this.#name = this.#field.getAttribute("name");
    this.#placeholder = this.#field.getAttribute("placeholder");
    this.#inputMode = this.#field.getAttribute("inputmode");
    this.#autocomplete = this.#field.getAttribute("autocomplete");

    // Watch for element removal from DOM (e.g., HTMX swaps)
    this.#removalObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const removed of mutation.removedNodes) {
          if (removed instanceof Element && removed.contains(this.#field)) {
            this.destroy();
            return;
          }
        }
      }
    });

    this.#country = this.#defaultCountry();
    this.#render();
    this.#initializeEvents();
    this.#setValue(this.#field.value);
  }

  /**
   * The number in E.164 format (`+41791234567`), or an empty string when
   * nothing is typed.
   */
  get value(): string {
    if (this.#digits === "") return "";
    return `+${this.#country.dialCode}${this.#digits}`;
  }

  /**
   * Set the number. An international value (`+41…` or `0041…`) also selects
   * its country; any other value is read as a national number of the
   * selected country.
   */
  set value(value: string) {
    this.#setValue(value);
  }

  /**
   * ISO code of the selected country.
   */
  get country(): string {
    return this.#country.code;
  }

  set country(code: string) {
    this.setCountry(code);
  }

  /**
   * Whether the number has a valid length for the selected country. An empty
   * input is valid, use the `required` attribute to reject it.
   */
  get isValid(): boolean {
    return this.#validationMessage() === "";
  }

  /**
   * Select a country and reformat the typed number with its pattern.
   * @param code ISO code of the country
   * @param emitChange Dispatch `change` on the input and
   *   `bl-phone-input-country-change`. Defaults to false.
   */
  setCountry(code: string, emitChange = false) {
    const country = this.#findCountry(code);
    if (country === undefined || country === this.#country) return;

    const previousValue = this.value;
    this.#country = country;
    this.#digits = this.#digits.slice(0, this.#maxDigits);
    this.#field.value = formatNational(country, this.#digits);
    this.#update();

    if (emitChange) {
      this.#dispatchCountryChange();
      if (previousValue !== this.value) {
        this.#field.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  }

  /**
   * Open the country menu and focus its search field.
   */
  open() {
    if (this.isOpen || this.#isDisabled) return;
    this.#wrapper.classList.add("open");
    this.#countryButton.setAttribute("aria-expanded", "true");

    this.#cleanupFloating = autoUpdate(
      this.#wrapper,
      this.#menu,
      this.#updatePosition.bind(this),
    );

    this.#searchInput.value = "";
    this.#filterOptions();
    this.#highlight(
      this.#options.findIndex((o) => o.dataset.country === this.#country.code),
    );

    // Skipped on touch devices so the virtual keyboard doesn't pop up when
    // just browsing the countries
    if (!matchMedia("(pointer: coarse)").matches) {
      this.#searchInput.focus();
    } else {
      this.#optionsContainer.focus();
    }
  }

  /**
   * Close the country menu.
   * @param focusInput Focus the number field after closing
   */
  close(focusInput = true) {
    if (!this.isOpen) return;
    this.#wrapper.classList.remove("open");
    this.#countryButton.setAttribute("aria-expanded", "false");

    if (this.#cleanupFloating) {
      this.#cleanupFloating();
      this.#cleanupFloating = null;
    }

    if (focusInput) this.#field.focus();
  }

  /**
   * Toggle the country menu.
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Check if the country menu is open.
   */
  get isOpen() {
    return this.#wrapper.classList.contains("open");
  }

  /**
   * Focus the number field.
   */
  focus() {
    this.#field.focus();
  }

  /**
   * Destroy the component, restore the input and remove all event listeners.
   */
  destroy() {
    this.#cleanupFloating?.();
    this.#removalObserver.disconnect();
    document.removeEventListener("click", this.#documentClickHandler);
    this.#field.removeEventListener("input", this.#inputHandler);
    this.#field.removeEventListener("invalid", this.#invalidHandler);
    this.#form?.removeEventListener("reset", this.#formResetHandler);

    this.#field.classList.remove("phone-input-field");
    this.#restoreAttribute("name", this.#name);
    this.#restoreAttribute("placeholder", this.#placeholder);
    this.#restoreAttribute("inputmode", this.#inputMode);
    this.#restoreAttribute("autocomplete", this.#autocomplete);
    this.#field.setCustomValidity("");
    if (this.value !== "") this.#field.value = this.value;

    // Put the input back where it was
    if (this.#wrapper.isConnected) {
      this.#wrapper.replaceWith(this.#field);
    }
    delete this.#field.blPhoneInput;
  }

  /**
   * Render the component. Should be called only once when the component is
   * initialized.
   * @private
   */
  #render() {
    this.#wrapper = document.createElement("div");
    this.#wrapper.classList.add("phone-input");

    this.#countryButton = document.createElement("button");
    this.#countryButton.type = "button";
    this.#countryButton.classList.add("phone-input-country");
    this.#countryButton.setAttribute("aria-haspopup", "listbox");
    this.#countryButton.setAttribute("aria-expanded", "false");
    this.#countryButton.setAttribute("aria-controls", `${this.#id}-options`);

    this.#flag = document.createElement("span");
    this.#flag.classList.add("phone-input-flag");
    this.#flag.setAttribute("aria-hidden", "true");

    const arrow = document.createElement("span");
    arrow.classList.add("phone-input-arrow");
    arrow.setAttribute("aria-hidden", "true");
    this.#countryButton.append(this.#flag, arrow);

    this.#dialCode = document.createElement("span");
    this.#dialCode.classList.add("phone-input-dial-code");

    this.#menu = document.createElement("div");
    this.#menu.classList.add("phone-input-menu");

    this.#searchInput = document.createElement("input");
    this.#searchInput.type = "text";
    this.#searchInput.classList.add("phone-input-search");
    this.#searchInput.placeholder = this.#config.searchPlaceholder;
    this.#searchInput.setAttribute(
      "aria-label",
      this.#config.searchPlaceholder,
    );
    this.#searchInput.setAttribute("aria-controls", `${this.#id}-options`);
    this.#searchInput.autocomplete = "off";
    this.#searchInput.setAttribute("role", "combobox");
    this.#searchInput.setAttribute("aria-expanded", "true");

    this.#optionsContainer = document.createElement("div");
    this.#optionsContainer.classList.add("phone-input-options");
    this.#optionsContainer.id = `${this.#id}-options`;
    this.#optionsContainer.setAttribute("role", "listbox");
    this.#optionsContainer.tabIndex = -1;
    this.#populateOptions();

    this.#noResults = document.createElement("div");
    this.#noResults.classList.add("phone-input-no-results");
    this.#noResults.innerText = this.#config.noResultsText;
    this.#noResults.hidden = true;
    this.#optionsContainer.append(this.#noResults);

    this.#menu.append(this.#searchInput, this.#optionsContainer);

    // Move the input inside the wrapper, next to the country selector
    this.#field.insertAdjacentElement("beforebegin", this.#wrapper);
    this.#field.classList.add("phone-input-field");
    this.#wrapper.append(
      this.#countryButton,
      this.#dialCode,
      this.#field,
      this.#menu,
    );

    if (this.#inputMode === null) this.#field.inputMode = "tel";
    if (this.#autocomplete === null) {
      this.#field.setAttribute("autocomplete", "tel-national");
    }

    // The hidden input submits the E.164 value in place of the formatted one
    if (this.#name !== null) {
      this.#hidden = document.createElement("input");
      this.#hidden.type = "hidden";
      this.#hidden.name = this.#name;
      const form = this.#field.getAttribute("form");
      if (form !== null) this.#hidden.setAttribute("form", form);
      this.#field.removeAttribute("name");
      this.#wrapper.append(this.#hidden);
    }
  }

  #populateOptions() {
    const displayNames = this.#displayNames();
    const entries = this.#countries.map((country) => ({
      country,
      name: displayNames?.of(country.code) ?? country.code,
    }));
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const { country, name } of entries) {
      const option = document.createElement("div");
      option.classList.add("phone-input-option");
      option.id = `${this.#id}-${country.code}`;
      option.setAttribute("role", "option");
      option.dataset.country = country.code;
      option.dataset.search =
        `${name} ${country.code} +${country.dialCode}`.toLowerCase();

      const flag = document.createElement("span");
      flag.classList.add("phone-input-flag");
      flag.setAttribute("aria-hidden", "true");
      flag.innerText = countryFlag(country.code);

      const label = document.createElement("span");
      label.classList.add("phone-input-option-name");
      label.innerText = name;

      const dialCode = document.createElement("span");
      dialCode.classList.add("phone-input-option-dial-code");
      dialCode.innerText = `+${country.dialCode}`;

      option.append(flag, label, dialCode);
      this.#options.push(option);
      this.#optionsContainer.append(option);
    }
  }

  #initializeEvents() {
    this.#countryButton.addEventListener("click", () => this.toggle());

    this.#countryButton.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        this.open();
      }
    });

    // Clicks on the dial code or the padding focus the number field
    this.#wrapper.addEventListener("mousedown", (e: MouseEvent) => {
      if (e.target === this.#wrapper || e.target === this.#dialCode) {
        e.preventDefault();
        this.#field.focus();
      }
    });

    this.#menu.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        this.close(false);
        this.#countryButton.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        this.#highlightNext(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.#highlightNext(-1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const option = this.#options[this.#highlighted];
        if (option !== undefined && !option.hidden) {
          this.#selectOption(option);
        }
      } else if (e.key === "Tab") {
        this.close(false);
      }
    });

    this.#searchInput.addEventListener("input", () => {
      this.#filterOptions();
      this.#highlight(this.#options.findIndex((option) => !option.hidden));
    });

    this.#optionsContainer.addEventListener("click", (e: MouseEvent) => {
      const option = (e.target as HTMLElement | null)?.closest<HTMLDivElement>(
        ".phone-input-option",
      );
      if (option) this.#selectOption(option);
    });

    this.#optionsContainer.addEventListener("mousemove", (e: MouseEvent) => {
      const option = (e.target as HTMLElement | null)?.closest<HTMLDivElement>(
        ".phone-input-option",
      );
      if (option) this.#highlight(this.#options.indexOf(option), false);
    });

    document.addEventListener("click", this.#documentClickHandler);
    this.#field.addEventListener("input", this.#inputHandler);
    this.#field.addEventListener("invalid", this.#invalidHandler);

    this.#form = this.#field.form;
    this.#form?.addEventListener("reset", this.#formResetHandler);

    this.#removalObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  readonly #documentClickHandler = (e: MouseEvent) => {
    if (this.isOpen && !this.#wrapper.contains(e.target as Node)) {
      this.close(false);
    }
  };

  readonly #inputHandler = (e: Event) => {
    this.#handleInput((e as InputEvent).inputType);
  };

  readonly #invalidHandler = () => {
    // Refresh the message, the browser shows it right after this event
    this.#field.setCustomValidity(this.#validationMessage());
  };

  readonly #formResetHandler = () => {
    // The form restores the input value after the reset event
    setTimeout(() => this.#setValue(this.#field.value));
  };

  /**
   * Reformat the field after the user typed, pasted or deleted something,
   * keeping the caret after the same digit.
   * @private
   */
  #handleInput(inputType?: string) {
    const raw = this.#field.value;

    // International number typed or pasted: pick its country
    const international = raw.trimStart().match(/^(\+|00)(.*)$/);
    if (international) {
      const digits = international[2].replace(/\D/g, "");
      const country = this.#countryFromDialCode(digits);
      if (country === undefined) {
        // Wait for the rest of the calling code
        this.#digits = "";
        this.#field.value = `+${digits.slice(0, 3)}`;
        this.#update(true);
        return;
      }
      const previous = this.#country;
      this.#country = country;
      this.#digits = this.#normalize(digits.slice(country.dialCode.length));
      this.#field.value = formatNational(country, this.#digits);
      this.#update();
      if (previous !== country) this.#dispatchCountryChange();
      return;
    }

    const caret = this.#field.selectionStart ?? raw.length;
    let digits = raw.replace(/\D/g, "");
    let digitsBeforeCaret = raw.slice(0, caret).replace(/\D/g, "").length;

    // Deleting a separator removes the digit next to it instead, otherwise
    // the formatting would put the separator right back
    if (digits === this.#digits) {
      if (inputType === "deleteContentBackward" && digitsBeforeCaret > 0) {
        digits =
          digits.slice(0, digitsBeforeCaret - 1) +
          digits.slice(digitsBeforeCaret);
        digitsBeforeCaret--;
      } else if (inputType === "deleteContentForward") {
        digits =
          digits.slice(0, digitsBeforeCaret) +
          digits.slice(digitsBeforeCaret + 1);
      }
    }

    const trunk = this.#country.trunkPrefix;
    if (trunk && digits.startsWith(trunk)) {
      digits = digits.slice(trunk.length);
      digitsBeforeCaret = Math.max(0, digitsBeforeCaret - trunk.length);
    }

    this.#digits = digits.slice(0, this.#maxDigits);
    digitsBeforeCaret = Math.min(digitsBeforeCaret, this.#digits.length);

    const formatted = formatNational(this.#country, this.#digits);
    this.#field.value = formatted;

    if (document.activeElement === this.#field) {
      const position = caretPosition(formatted, digitsBeforeCaret);
      this.#field.setSelectionRange(position, position);
    }

    this.#update();
  }

  /**
   * Set the number from a raw value, without dispatching any event.
   * @private
   */
  #setValue(value: string) {
    const international = value.trim().match(/^(\+|00)(.*)$/);
    if (international) {
      const digits = international[2].replace(/\D/g, "");
      const country = this.#countryFromDialCode(digits);
      if (country !== undefined) {
        this.#country = country;
        this.#digits = this.#normalize(digits.slice(country.dialCode.length));
      } else {
        this.#digits = "";
      }
    } else {
      this.#digits = this.#normalize(value.replace(/\D/g, ""));
    }
    this.#field.value = formatNational(this.#country, this.#digits);
    this.#update();
  }

  /**
   * Strip the trunk prefix and the digits beyond the longest pattern.
   * @private
   */
  #normalize(digits: string) {
    const trunk = this.#country.trunkPrefix;
    if (trunk && digits.startsWith(trunk)) {
      digits = digits.slice(trunk.length);
    }
    return digits.slice(0, this.#maxDigits);
  }

  /**
   * Refresh everything that depends on the country and the number.
   * @param pending An international calling code is still being typed
   * @private
   */
  #update(pending = false) {
    const country = this.#country;
    const name = this.#displayNames()?.of(country.code) ?? country.code;

    this.#flag.innerText = countryFlag(country.code);
    this.#dialCode.innerText = `+${country.dialCode}`;
    this.#dialCode.hidden = pending;
    this.#countryButton.setAttribute(
      "aria-label",
      `${name} (+${country.dialCode})`,
    );
    this.#countryButton.disabled = this.#isDisabled;
    this.#wrapper.toggleAttribute("data-disabled", this.#field.disabled);

    for (const option of this.#options) {
      const selected = option.dataset.country === country.code;
      option.classList.toggle("phone-input-option-selected", selected);
      option.setAttribute("aria-selected", String(selected));
    }

    if (this.#placeholder === null) {
      this.#field.placeholder = examplePlaceholder(country);
    }

    if (this.#hidden) this.#hidden.value = this.value;
    this.#field.setCustomValidity(
      pending ? this.#config.invalidMessage : this.#validationMessage(),
    );
  }

  #dispatchCountryChange() {
    this.#field.dispatchEvent(
      new CustomEvent<PhoneInputCountryChangeDetail>(
        "bl-phone-input-country-change",
        {
          bubbles: true,
          detail: {
            country: this.#country.code,
            dialCode: this.#country.dialCode,
          },
        },
      ),
    );
  }

  #validationMessage() {
    if (this.#digits === "") {
      // A calling code typed without a known country is not a number
      return this.#field.value === "" ? "" : this.#config.invalidMessage;
    }
    const valid = countryFormats(this.#country).some(
      (format) => digitCount(format) === this.#digits.length,
    );
    return valid ? "" : this.#config.invalidMessage;
  }

  #selectOption(option: HTMLDivElement) {
    const code = option.dataset.country;
    if (code !== undefined) this.setCountry(code, true);
    this.close();
  }

  #filterOptions() {
    const search = this.#searchInput.value.toLowerCase().trim();
    let found = 0;
    for (const option of this.#options) {
      const match = (option.dataset.search ?? "").includes(search);
      option.hidden = !match;
      if (match) found++;
    }
    this.#noResults.hidden = found > 0;
  }

  #highlightNext(direction: 1 | -1) {
    const count = this.#options.length;
    for (let step = 1; step <= count; step++) {
      const index =
        (((this.#highlighted + step * direction) % count) + count) % count;
      if (!this.#options[index].hidden) {
        this.#highlight(index);
        return;
      }
    }
  }

  #highlight(index: number, scroll = true) {
    if (index === this.#highlighted && !scroll) return;
    this.#options[this.#highlighted]?.classList.remove(
      "phone-input-option-highlighted",
    );
    this.#highlighted = index;
    const option = this.#options[index];
    if (option === undefined) {
      this.#searchInput.removeAttribute("aria-activedescendant");
      return;
    }
    option.classList.add("phone-input-option-highlighted");
    this.#searchInput.setAttribute("aria-activedescendant", option.id);
    if (scroll) option.scrollIntoView({ block: "nearest" });
  }

  #availableCountries() {
    const countries = PhoneInput.countries;
    if (!this.#config.countries || this.#config.countries.length === 0) {
      return countries;
    }
    const codes = this.#config.countries.map((code) => code.toUpperCase());
    const filtered = countries.filter((country) =>
      codes.includes(country.code),
    );
    return filtered.length > 0 ? filtered : countries;
  }

  #findCountry(code: string) {
    const upper = code.toUpperCase();
    return this.#countries.find((country) => country.code === upper);
  }

  #defaultCountry() {
    const candidates = [
      this.#config.country,
      ...navigator.languages.map((tag) => {
        try {
          return new Intl.Locale(tag).maximize().region;
        } catch {
          return undefined;
        }
      }),
    ];

    for (const code of candidates) {
      const country = code ? this.#findCountry(code) : undefined;
      if (country) return country;
    }
    return this.#countries[0];
  }

  /**
   * Country of an international number, from the digits after the `+`. The
   * selected country wins when several share the calling code.
   * @private
   */
  #countryFromDialCode(digits: string) {
    if (digits.startsWith(this.#country.dialCode)) return this.#country;
    // Calling codes are prefix-free, the first match is the only one
    for (let length = 1; length <= 3; length++) {
      const dialCode = digits.slice(0, length);
      if (dialCode.length < length) break;
      const country = this.#countries.find((c) => c.dialCode === dialCode);
      if (country) return country;
    }
    return undefined;
  }

  #displayNames() {
    const lang =
      this.#field.closest<HTMLElement>("[lang]")?.lang || navigator.language;
    try {
      return new Intl.DisplayNames([lang, "en"], { type: "region" });
    } catch {
      return undefined;
    }
  }

  get #maxDigits() {
    const formats = countryFormats(this.#country);
    return digitCount(formats[formats.length - 1]);
  }

  get #isDisabled() {
    return this.#field.disabled || this.#field.readOnly;
  }

  #restoreAttribute(name: string, value: string | null) {
    if (value === null) {
      this.#field.removeAttribute(name);
    } else {
      this.#field.setAttribute(name, value);
    }
  }

  /**
   * Update the position of the country menu using floating-ui
   * @private
   */
  #updatePosition() {
    computePosition(this.#wrapper, this.#menu, {
      strategy: "fixed",
      placement: "bottom-start",
      middleware: [
        offset(6),
        flip(),
        shift({ padding: 6 }),
        // min-width: 100% would resolve against the viewport once fixed
        size({
          apply: ({ rects, elements }) => {
            elements.floating.style.minWidth = `${rects.reference.width}px`;
          },
        }),
      ],
    }).then(({ x, y }) => {
      Object.assign(this.#menu.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }
}

/**
 * Position right after the given number of digits in a formatted value.
 */
function caretPosition(formatted: string, digits: number) {
  if (digits === 0) {
    const firstDigit = formatted.search(/\d/);
    return firstDigit === -1 ? formatted.length : firstDigit;
  }
  let count = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]) && ++count === digits) return i + 1;
  }
  return formatted.length;
}

/**
 * Placeholder showing the format of the country's longest number.
 */
function examplePlaceholder(country: PhoneCountry) {
  const formats = countryFormats(country);
  const pattern = formats[formats.length - 1];
  let digit = 0;
  return pattern.replace(/#/g, () => String(++digit % 10));
}

function parseConfig(
  field: HTMLInputElement,
  config?: PhoneInputConfig,
): PhoneInputConfig & typeof DEFAULT_CONFIG {
  const parsedConfig = { ...DEFAULT_CONFIG, ...config };

  const country = field.dataset.phoneInputCountry;
  if (country) parsedConfig.country = country;

  const countries = field.dataset.phoneInputCountries;
  if (countries) {
    parsedConfig.countries = countries
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code !== "");
  }

  const searchPlaceholder = field.dataset.phoneInputSearchPlaceholder;
  if (searchPlaceholder) parsedConfig.searchPlaceholder = searchPlaceholder;

  const noResults = field.dataset.phoneInputNoResults;
  if (noResults) parsedConfig.noResultsText = noResults;

  const invalidMessage = field.dataset.phoneInputInvalidMessage;
  if (invalidMessage) parsedConfig.invalidMessage = invalidMessage;

  return parsedConfig;
}

export function initPhoneInput(container: HTMLElement | Document = document) {
  const fields = container.querySelectorAll<BloumPhoneInputElement>(
    "input[data-phone-input]",
  );
  fields.forEach((field) => {
    if (field.blPhoneInput === undefined) {
      new PhoneInput(field);
    }
  });
}
