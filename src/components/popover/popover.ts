import { createFocusTrap, FocusTrap } from "focus-trap";
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";

interface BloumPopoverElement extends HTMLElement {
  blpopover?: Popover;
}

export class Popover {
  readonly #element: BloumPopoverElement;
  readonly #focusTrap: FocusTrap;
  #arrowElement: HTMLDivElement | null = null;
  #cleanup: VoidFunction | null = null;

  constructor(element: BloumPopoverElement) {
    this.#element = element;
    this.#element.blpopover = this;
    this.#focusTrap = createFocusTrap(this.#element, {
      allowOutsideClick: true,
    });
  }

  open(trigger: HTMLElement) {
    this.#element.classList.add("show");
    try {
      this.#focusTrap.activate();
    } catch {
      console.warn("[Popover] No focusable elements found in popover");
    }

    if (this.#arrowElement === null) {
      this.#arrowElement = document.createElement("div");
      this.#arrowElement.classList.add("popover-arrow");
      this.#element.appendChild(this.#arrowElement);
    }

    this.#cleanup = autoUpdate(trigger, this.#element, () => {
      this.#updatePosition(trigger);
    });
  }

  close() {
    this.#element.classList.remove("show");
    this.#focusTrap.deactivate();
    if (this.#cleanup) {
      this.#cleanup();
      this.#cleanup = null;
    }
  }

  toggle(trigger: HTMLElement) {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open(trigger);
    }
  }

  isOpen() {
    return this.#element.classList.contains("show");
  }

  #updatePosition(trigger: HTMLElement) {
    if (!trigger || !this.#element || !this.#arrowElement) {
      return;
    }

    // Compute the position of the tooltip
    computePosition(trigger, this.#element, {
      placement: "top",
      middleware: [
        offset(8),
        flip(),
        shift({ padding: 10 }),
        arrow({ element: this.#arrowElement }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      if (!this.#element || !this.#arrowElement) {
        return;
      }

      Object.assign(this.#element.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (!middlewareData.arrow) {
        return;
      }
      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[placement.split("-")[0]];

      const rotation = {
        top: 45,
        right: 135,
        bottom: 225,
        left: 315,
      }[placement.split("-")[0]];

      Object.assign(this.#arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide as string]: "-6px",
        transform: `rotate(${rotation}deg)`,
      });
    });
  }
}

let popoverMouseDownHandler: ((e: MouseEvent) => void) | null = null;
let popoverKeydownHandler: ((e: KeyboardEvent) => void) | null = null;
const popoverOpenHandlers: Array<[HTMLElement, VoidFunction]> = [];

export function initPopover() {
  document.querySelectorAll(".popover").forEach((element) => {
    element.classList.remove("show");
    new Popover(element as HTMLElement);
  });

  // Cleanup event listeners
  for (const [element, handler] of popoverOpenHandlers) {
    element.removeEventListener("click", handler);
  }

  document
    .querySelectorAll<HTMLElement>("[data-popover]")
    .forEach((element) => {
      const popoverSelector = element.dataset.popover;
      if (!popoverSelector) {
        return;
      }
      const popover =
        document.querySelector<BloumPopoverElement>(popoverSelector);
      if (!popover) {
        return;
      }
      const popoverInstance = popover.blpopover;
      if (popoverInstance === undefined) {
        return;
      }
      const openHandler = () => {
        popoverInstance.toggle(element);
      };
      element.addEventListener("click", openHandler);
      popoverOpenHandlers.push([element, openHandler]);
    });

  // Cleanup event listeners
  if (popoverMouseDownHandler) {
    removeEventListener("mousedown", popoverMouseDownHandler);
  }
  if (popoverKeydownHandler) {
    removeEventListener("keydown", popoverKeydownHandler);
  }

  popoverMouseDownHandler = (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".popover") && !target.closest("[data-popover]")) {
      document.addEventListener(
        "click",
        (e) => {
          const target2 = e.target as HTMLElement;
          if (target2 !== target) return;
          document
            .querySelectorAll<BloumPopoverElement>(".popover")
            .forEach((popover) => {
              const popoverInstance = popover.blpopover;
              if (popoverInstance === undefined) {
                return;
              }
              popoverInstance.close();
            });
        },
        { once: true },
      );
    }
  };

  popoverKeydownHandler = (event) => {
    if (event.key === "Escape") {
      document
        .querySelectorAll<BloumPopoverElement>(".popover")
        .forEach((popover) => {
          const popoverInstance = popover.blpopover;
          if (popoverInstance === undefined) {
            return;
          }
          popoverInstance.close();
        });
    }
  };

  addEventListener("mousedown", popoverMouseDownHandler);
  addEventListener("keydown", popoverKeydownHandler);
}
