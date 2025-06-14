enum ColorScheme {
  Dark = "dark",
  Light = "light",
  System = "system",
}

const SCHEME_KEY = "color-scheme";

function getCurrentColorScheme(): ColorScheme {
  return localStorage.getItem(SCHEME_KEY) as ColorScheme;
}

function setCurrentColorScheme(colorScheme: ColorScheme) {
  localStorage.setItem(SCHEME_KEY, colorScheme);
}

function updateColorScheme() {
  const colorScheme = getCurrentColorScheme();
  switch (colorScheme) {
    case ColorScheme.Dark:
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      break;
    case ColorScheme.Light:
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      break;
    default: {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      document.documentElement.classList.toggle("light", !prefersDark);
      break;
    }
  }
}

export function initColorScheme() {
  if (!localStorage.getItem(SCHEME_KEY)) {
    setCurrentColorScheme(ColorScheme.System);
  }
  updateColorScheme();
}

function switchToNextTheme() {
  const currentColorScheme = getCurrentColorScheme();
  let nextTheme: ColorScheme;
  switch (currentColorScheme) {
    case ColorScheme.Dark:
      nextTheme = ColorScheme.Light;
      break;
    case ColorScheme.Light:
      nextTheme = ColorScheme.System;
      break;
    default:
      nextTheme = ColorScheme.Dark;
      break;
  }
  setCurrentColorScheme(nextTheme);
  updateColorScheme();
}

interface ColorSchemeSwitcherElement extends HTMLElement {
  blcolorschemeswitcher?: ColorSchemeSwitcher;
}

export class ColorSchemeSwitcher {
  readonly #element: ColorSchemeSwitcherElement;
  #clean: VoidFunction | null = null;

  constructor(element: ColorSchemeSwitcherElement) {
    if (element.blcolorschemeswitcher !== undefined) {
      element.blcolorschemeswitcher.#destroy();
    }
    this.#element = element;
    element.blcolorschemeswitcher = this;
    this.#init();
  }

  #init() {
    const handler = this.#handleClick.bind(this);
    this.#element.addEventListener("click", handler);
    this.#clean = () => {
      this.#element.removeEventListener("click", handler);
    };
    this.#updateIndicators();
  }

  #destroy() {
    if (this.#clean) this.#clean();
  }

  #handleClick() {
    switchToNextTheme();
    this.#updateIndicators();
  }

  #updateIndicators() {
    const darkIndicators = this.#element.querySelectorAll(".scheme-dark");
    const lightIndicators = this.#element.querySelectorAll(".scheme-light");
    const systemIndicators = this.#element.querySelectorAll(".scheme-system");
    const currentColorScheme = getCurrentColorScheme();
    switch (currentColorScheme) {
      case ColorScheme.Dark:
        darkIndicators.forEach((el) => el.classList.add("active"));
        lightIndicators.forEach((el) => el.classList.remove("active"));
        systemIndicators.forEach((el) => el.classList.remove("active"));
        break;
      case ColorScheme.Light:
        darkIndicators.forEach((el) => el.classList.remove("active"));
        lightIndicators.forEach((el) => el.classList.add("active"));
        systemIndicators.forEach((el) => el.classList.remove("active"));
        break;
      default:
        darkIndicators.forEach((el) => el.classList.remove("active"));
        lightIndicators.forEach((el) => el.classList.remove("active"));
        systemIndicators.forEach((el) => el.classList.add("active"));
    }
  }
}

export function initColorSchemeSwitcher() {
  // initColorScheme();
  document.querySelectorAll(".color-scheme-switcher").forEach((element) => {
    new ColorSchemeSwitcher(element as HTMLElement);
  });
}
