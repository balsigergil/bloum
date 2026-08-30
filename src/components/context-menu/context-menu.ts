import type { VirtualElement } from "@floating-ui/dom";
import { Menu } from "../menu/menu";

export interface BlContextMenuElement extends HTMLElement {
  blcontextmenu?: ContextMenu;
}

// Every target registered on the page. Targets can be nested, and a right
// click must only open the menu of the innermost one.
const registeredTargets = new Set<HTMLElement>();

/**
 * Closest ancestor of a node — itself included — that is the target of a
 * context menu.
 */
function closestTarget(node: Node | null): HTMLElement | null {
  let element: Element | null =
    node instanceof Element ? node : (node?.parentElement ?? null);

  while (element !== null) {
    if (element instanceof HTMLElement && registeredTargets.has(element)) {
      return element;
    }
    element = element.parentElement;
  }

  return null;
}

function resolveTargets(
  targets: string | HTMLElement | HTMLElement[],
): HTMLElement[] {
  if (typeof targets === "string") {
    return Array.from(document.querySelectorAll<HTMLElement>(targets));
  }
  return Array.isArray(targets) ? targets : [targets];
}

/**
 * A context menu is a `.menu` opened with a right click on one or several
 * target elements, and anchored to the pointer instead of a trigger element.
 * Everything the menu already knows how to do — submenus, keyboard navigation,
 * closing on an outside click — is handled by the `Menu` component it wraps.
 */
export class ContextMenu {
  readonly #element: BlContextMenuElement;
  readonly #targets: HTMLElement[];
  readonly #menu: Menu;
  readonly #removalObserver: MutationObserver;

  // Position of the pointer, in page coordinates so that an open menu stays on
  // the content it was opened from when the page scrolls
  #x = 0;
  #y = 0;

  // A zero sized rectangle at the pointer: the menu is anchored to the point
  // that was right clicked, not to an element
  readonly #anchor: VirtualElement = {
    getBoundingClientRect: () =>
      new DOMRect(this.#x - window.scrollX, this.#y - window.scrollY, 0, 0),
  };

  #destroyed = false;

  constructor(
    element: string | BlContextMenuElement,
    targets: string | HTMLElement | HTMLElement[],
  ) {
    const menuElement =
      typeof element === "string"
        ? document.querySelector<BlContextMenuElement>(element)
        : element;
    if (menuElement === null) {
      throw new Error(
        `Element ${element} not found to initialize BlContextMenu`,
      );
    }

    const targetElements = resolveTargets(targets);
    if (targetElements.length === 0) {
      throw new Error("A context menu must be bound to at least one element");
    }

    if (menuElement.blcontextmenu !== undefined) {
      menuElement.blcontextmenu.destroy();
    }

    this.#element = menuElement;
    this.#targets = targetElements;
    this.#targets.forEach((target) => registeredTargets.add(target));
    this.#menu = new Menu(menuElement, this.#anchor);

    // Watch for element removal from DOM (e.g., HTMX swaps)
    this.#removalObserver = new MutationObserver(() => {
      if (this.#targets.every((target) => !target.isConnected)) {
        this.destroy();
      }
    });
    this.#removalObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    document.addEventListener("contextmenu", this.#contextMenuHandler);

    menuElement.blcontextmenu = this;
  }

  /**
   * Open the menu at the given viewport coordinates, as reported by the
   * `clientX` and `clientY` of a mouse event.
   */
  open(x: number, y: number) {
    if (this.#destroyed) return;

    // Drop the item focused and the submenus opened during a previous opening
    this.#menu.close();

    this.#x = x + window.scrollX;
    this.#y = y + window.scrollY;
    this.#menu.open();
  }

  close() {
    this.#menu.close();
  }

  isOpen() {
    return this.#menu.isOpen();
  }

  /**
   * Destroy the component and remove all event listeners.
   */
  destroy() {
    if (this.#destroyed) return;
    this.#destroyed = true;

    this.#removalObserver.disconnect();
    document.removeEventListener("contextmenu", this.#contextMenuHandler);
    this.#targets.forEach((target) => registeredTargets.delete(target));
    this.#menu.destroy();
    delete this.#element.blcontextmenu;

    // Once opened, the menu lives in the portal appended to the body: drop it
    // when the markup it belongs to is gone
    if (this.#targets.every((target) => !target.isConnected)) {
      this.#element.remove();
    }
  }

  readonly #contextMenuHandler = (event: MouseEvent) => {
    // Right clicking the menu itself keeps it open, rather than stacking the
    // native menu on top of it
    if (this.#element.contains(event.target as Node)) {
      event.preventDefault();
      return;
    }

    const target = closestTarget(event.target as Node);
    if (target === null || !this.#targets.includes(target)) {
      this.close();
      return;
    }

    event.preventDefault();
    this.open(event.clientX, event.clientY);
  };
}

export function initContextMenu(container: HTMLElement | Document = document) {
  // Several elements can share the same menu, so targets are grouped by the
  // menu they point at before being bound
  const menus = new Map<BlContextMenuElement, HTMLElement[]>();

  container
    .querySelectorAll<HTMLElement>("[data-context-menu]")
    .forEach((target) => {
      const selector = target.dataset.contextMenu;
      if (!selector) return;

      const element = document.querySelector<BlContextMenuElement>(selector);
      if (element === null) {
        console.warn(`[ContextMenu] No menu matching "${selector}" was found`);
        return;
      }

      const targets = menus.get(element);
      if (targets === undefined) {
        menus.set(element, [target]);
      } else {
        targets.push(target);
      }
    });

  menus.forEach((targets, element) => {
    new ContextMenu(element, targets);
  });
}
