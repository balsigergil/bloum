import { FocusTrap, createFocusTrap } from "focus-trap";

export interface BloumDrawerElement extends HTMLElement {
  bloumDrawer?: Drawer;
}

export class Drawer {
  readonly #element: BloumDrawerElement;
  readonly #focusTrap: FocusTrap;

  constructor(element: BloumDrawerElement) {
    if (element.bloumDrawer !== undefined) {
      element.bloumDrawer.destroy();
    }
    this.#element = element;
    this.#element.bloumDrawer = this;
    this.#focusTrap = createFocusTrap(this.#element);
  }

  open() {
    this.#element.classList.add("open");
    this.#element.setAttribute("aria-hidden", "false");
    this.#element.setAttribute("aria-modal", "true");
    this.#element.setAttribute("role", "dialog");
    try {
      this.#focusTrap.activate();
    } catch {
      console.warn("No focusable elements found in drawer");
    }
  }

  close() {
    this.#element.classList.add("closing");

    this.#element.addEventListener(
      "animationend",
      () => {
        this.#element.classList.remove("open");
        this.#element.classList.remove("closing");
        this.#element.setAttribute("aria-hidden", "true");
        this.#element.removeAttribute("aria-modal");
        this.#element.removeAttribute("role");
        this.#focusTrap.deactivate();
      },
      { once: true },
    );
  }

  destroy() {
    this.#element.classList.remove("open");
    this.#focusTrap.deactivate();
    delete this.#element.bloumDrawer;
  }
}

// Store references to event handlers for cleanup
let drawerClickHandler: ((e: Event) => void) | null = null;
let drawerKeydownHandler: ((e: KeyboardEvent) => void) | null = null;
let drawerCustomEventHandler: (() => void) | null = null;

export function initDrawers() {
  // Clean up existing event listeners
  if (drawerClickHandler) {
    removeEventListener("click", drawerClickHandler);
  }
  if (drawerKeydownHandler) {
    removeEventListener("keydown", drawerKeydownHandler);
  }
  if (drawerCustomEventHandler) {
    removeEventListener("bl-drawer-close", drawerCustomEventHandler);
  }

  // Create new event handlers
  drawerClickHandler = (e: Event) => {
    const target = e.target as HTMLElement;

    // Open drawer when clicking on drawer trigger
    if (target.closest("[data-drawer]")) {
      const drawerSelector = target
        .closest("[data-drawer]")
        ?.getAttribute("data-drawer") as string;
      const element =
        document.querySelector<BloumDrawerElement>(drawerSelector);
      if (element) {
        if (element.bloumDrawer === undefined) {
          new Drawer(element);
        }
        element.bloumDrawer?.open();
        e.preventDefault();
        e.stopPropagation();
      }
    }

    // Close drawer when clicking on the close button
    if (target.closest("[data-drawer-close]")) {
      const drawer = target.closest<BloumDrawerElement>(".drawer");
      if (drawer !== null && drawer.bloumDrawer !== undefined) {
        drawer.bloumDrawer.close();
        e.preventDefault();
        e.stopPropagation();
      }
    }

    // Close drawer when clicking outside (on backdrop)
    if (
      target.classList.contains("drawer") &&
      target.classList.contains("open")
    ) {
      const drawer = target as BloumDrawerElement;
      if (drawer.bloumDrawer !== undefined) {
        drawer.bloumDrawer.close();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  drawerKeydownHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Esc") {
      closeAllDrawers();
    }
  };

  drawerCustomEventHandler = () => {
    closeAllDrawers();
  };

  // Add new event listeners
  addEventListener("click", drawerClickHandler);
  addEventListener("keydown", drawerKeydownHandler);
  addEventListener("bl-drawer-close", drawerCustomEventHandler);
}

function closeAllDrawers() {
  document.querySelectorAll(".drawer.open").forEach((el) => {
    const drawer = el as BloumDrawerElement;
    if (drawer.bloumDrawer !== undefined) {
      drawer.bloumDrawer.close();
    }
  });
}
