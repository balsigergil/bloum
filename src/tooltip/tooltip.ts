import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";

export class Tooltip {
  private readonly title!: string;
  private readonly trigger: HTMLElement | null = null;
  private tooltip: HTMLElement | null = null;
  private arrowElement: HTMLDivElement | null = null;
  private cleanup: VoidFunction | null = null;

  constructor(element: HTMLElement) {
    const title = element.getAttribute("data-tooltip");
    if (!title) {
      return;
    }

    this.title = title;
    this.trigger = element;

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
    if (this.tooltip || !this.trigger) {
      return;
    }

    const tooltipId = randomId();
    const tooltip = document.createElement("div");

    tooltip.id = tooltipId;
    tooltip.classList.add("tooltip");
    tooltip.setAttribute("role", "tooltip");
    tooltip.textContent = this.title;
    this.tooltip = tooltip;

    this.trigger.setAttribute("aria-describedby", tooltipId);

    this.arrowElement = document.createElement("div");
    this.arrowElement.classList.add("tooltip-arrow");
    tooltip.append(this.arrowElement);
    document.body.append(tooltip);

    this.cleanup = autoUpdate(
      this.trigger,
      this.tooltip,
      this.updatePosition.bind(this),
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

      // @ts-ignore
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

  removeTooltipElement() {
    if (this.tooltip) {
      this.tooltip.classList.add("tooltip-hidden");
      this.tooltip.addEventListener("animationend", () => {
        if (this.tooltip) {
          this.tooltip.remove();
          this.tooltip = null;
        }

        if (this.arrowElement) {
          this.arrowElement.remove();
          this.arrowElement = null;
        }

        if (this.cleanup) {
          this.cleanup();
        }
      });
    }
  }
}

function randomId() {
  return Math.random().toString(36).substring(2, 9);
}
