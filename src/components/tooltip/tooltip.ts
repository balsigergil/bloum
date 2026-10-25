import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import { randomId } from "../../utils/random";

interface BloumTooltipElement extends HTMLElement {
  bltooltip?: Tooltip;
}

const DEFAULT_DELAY = 300;

// Once a tooltip has been shown, the next one skips its delay if it opens
// within this window, so sweeping over a toolbar doesn't wait on every icon.
const SKIP_DELAY_WINDOW = 300;
let skipDelayUntil = 0;

export class Tooltip {
  readonly #trigger: BloumTooltipElement;
  readonly #tooltipId = `bl-tooltip-${randomId()}`;
  #tooltip: HTMLDivElement | null = null;
  #arrowElement: HTMLDivElement | null = null;
  #cleanup: VoidFunction | null = null;
  #showTimer: ReturnType<typeof setTimeout> | undefined;
  // Bumped on every show/hide so a stale fade-out never removes a tooltip
  // that was shown again before its transition finished.
  #transitionToken = 0;

  // Only observes while a tooltip is in the DOM: a trigger removed mid-hover
  // (htmx swap) never fires mouseleave and would leave its tooltip behind.
  readonly #removalObserver = new MutationObserver(() => {
    if (!this.#trigger.isConnected) {
      this.#removeTooltip();
    }
  });

  readonly #enterHandler = () => this.#scheduleShow();
  readonly #leaveHandler = () => this.hide();

  constructor(element: BloumTooltipElement) {
    if (element.bltooltip !== undefined) {
      element.bltooltip.destroy();
    }

    this.#trigger = element;
    this.#trigger.bltooltip = this;
    this.#trigger.addEventListener("mouseenter", this.#enterHandler);
    this.#trigger.addEventListener("mouseleave", this.#leaveHandler);
  }

  show() {
    clearTimeout(this.#showTimer);
    this.#transitionToken++;

    if (!this.#tooltip) {
      this.#createTooltip();
    }
    if (!this.#tooltip) {
      return;
    }

    this.#tooltip.textContent = this.#trigger.getAttribute("data-tooltip");
    if (this.#arrowElement) {
      this.#tooltip.append(this.#arrowElement);
    }
    this.#tooltip.classList.add("show");
    this.#trigger.setAttribute("aria-describedby", this.#tooltipId);
  }

  hide() {
    clearTimeout(this.#showTimer);

    const tooltip = this.#tooltip;
    if (!tooltip || !tooltip.classList.contains("show")) {
      return;
    }

    skipDelayUntil = performance.now() + SKIP_DELAY_WINDOW;
    tooltip.classList.remove("show");
    this.#trigger.removeAttribute("aria-describedby");

    // getAnimations() is empty when there is no transition to wait for
    // (reduced motion, zero duration), so the tooltip is removed right away.
    const token = ++this.#transitionToken;
    Promise.allSettled(tooltip.getAnimations().map((a) => a.finished)).then(
      () => {
        if (token === this.#transitionToken) {
          this.#removeTooltip();
        }
      },
    );
  }

  destroy() {
    this.#removeTooltip();
    this.#trigger.removeEventListener("mouseenter", this.#enterHandler);
    this.#trigger.removeEventListener("mouseleave", this.#leaveHandler);
    delete this.#trigger.bltooltip;
  }

  #scheduleShow() {
    clearTimeout(this.#showTimer);

    const delay = performance.now() < skipDelayUntil ? 0 : this.#delay();
    if (delay === 0) {
      this.show();
    } else {
      this.#showTimer = setTimeout(() => this.show(), delay);
    }
  }

  #delay() {
    const value = Number(this.#trigger.getAttribute("data-tooltip-delay"));
    return this.#trigger.hasAttribute("data-tooltip-delay") &&
      Number.isFinite(value) &&
      value >= 0
      ? value
      : DEFAULT_DELAY;
  }

  #createTooltip() {
    if (!this.#trigger.isConnected) {
      return;
    }

    this.#tooltip = document.createElement("div");
    this.#tooltip.id = this.#tooltipId;
    this.#tooltip.classList.add("tooltip");
    this.#tooltip.setAttribute("role", "tooltip");

    this.#arrowElement = document.createElement("div");
    this.#arrowElement.classList.add("tooltip-arrow");
    document.body.append(this.#tooltip);

    this.#cleanup = autoUpdate(
      this.#trigger,
      this.#tooltip,
      this.#updatePosition.bind(this),
    );
    this.#removalObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  #removeTooltip() {
    clearTimeout(this.#showTimer);
    this.#transitionToken++;
    this.#removalObserver.disconnect();

    if (this.#cleanup) {
      this.#cleanup();
      this.#cleanup = null;
    }

    this.#tooltip?.remove();
    this.#tooltip = null;
    this.#arrowElement = null;
    this.#trigger.removeAttribute("aria-describedby");
  }

  #updatePosition() {
    if (!this.#tooltip || !this.#arrowElement) {
      return;
    }

    // Compute the position of the tooltip
    computePosition(this.#trigger, this.#tooltip, {
      strategy: "fixed",
      placement: "top",
      middleware: [
        offset(6),
        flip(),
        shift({ padding: 6 }),
        arrow({ element: this.#arrowElement }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      if (!this.#tooltip || !this.#arrowElement) {
        return;
      }

      Object.assign(this.#tooltip.style, {
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

      Object.assign(this.#arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide as string]: "-4px",
      });
    });
  }
}

export function initTooltip() {
  document
    .querySelectorAll<BloumTooltipElement>("[data-tooltip]")
    .forEach((element) => {
      new Tooltip(element);
    });
}
