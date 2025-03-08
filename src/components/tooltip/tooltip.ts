import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import { randomId } from "@/utils/random";

type TooltipElement = HTMLElement & { bltooltip?: Tooltip };

export class Tooltip {
  private readonly trigger: HTMLElement;

  private readonly tooltipId: string;
  private tooltip: HTMLDivElement | null = null;
  private readonly title: string | null = null;
  private arrowElement: HTMLDivElement | null = null;
  private cleanup: VoidFunction | null = null;

  constructor(element: TooltipElement) {
    const title = element.getAttribute("data-tooltip");
    this.tooltipId = `bl-toolip-${randomId()}`;
    this.title = title;
    this.trigger = element;

    if (element.bltooltip !== undefined) {
      return;
    }
    element.bltooltip = this;

    element.addEventListener(
      "mouseenter",
      this.createTooltipElement.bind(this),
    );
    element.addEventListener("focus", this.createTooltipElement.bind(this));

    element.addEventListener(
      "mouseleave",
      this.removeTooltipElement.bind(this),
    );
    element.addEventListener("blur", this.removeTooltipElement.bind(this));
  }

  createTooltipElement() {
    const existingTooltip = document.getElementById(this.tooltipId);
    if (existingTooltip) {
      if (existingTooltip !== this.tooltip) {
        existingTooltip.remove();
      } else {
        existingTooltip.classList.add("show");
        return;
      }
    }

    this.tooltip = document.createElement("div");

    this.tooltip.id = this.tooltipId;
    this.tooltip.classList.add("tooltip", "show");
    this.tooltip.setAttribute("role", "tooltip");
    this.tooltip.textContent = this.title;

    this.trigger.setAttribute("aria-describedby", this.tooltipId);

    this.arrowElement = document.createElement("div");
    this.arrowElement.classList.add("tooltip-arrow");
    this.tooltip.append(this.arrowElement);
    document.body.append(this.tooltip);

    this.cleanup = autoUpdate(
      this.trigger,
      this.tooltip,
      this.updatePosition.bind(this),
    );
  }

  removeTooltipElement() {
    const tooltip = document.getElementById(this.tooltipId);
    if (!tooltip) {
      return;
    }

    if (this.cleanup) {
      this.cleanup();
    }

    tooltip.classList.remove("show");
    tooltip.addEventListener(
      "transitionend",
      () => {
        tooltip.remove();
        this.trigger?.removeAttribute("aria-describedby");
      },
      { once: true },
    );
  }

  updatePosition() {
    if (!this.trigger || !this.tooltip || !this.arrowElement) {
      return;
    }

    // Compute the position of the tooltip
    computePosition(this.trigger, this.tooltip, {
      placement: "top",
      middleware: [
        offset(6),
        flip(),
        shift({ padding: 6 }),
        arrow({ element: this.arrowElement }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      if (!this.tooltip || !this.arrowElement) {
        return;
      }

      Object.assign(this.tooltip.style, {
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

      Object.assign(this.arrowElement.style, {
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
  const createTooltip = (element: HTMLElement) => {
    new Tooltip(element as HTMLElement);
  };
  document
    .querySelectorAll<HTMLElement>("[data-tooltip]")
    .forEach(createTooltip);

  document.addEventListener("htmx:load", () => {
    document
      .querySelectorAll<HTMLElement>("[data-tooltip]")
      .forEach(createTooltip);
  });
}
