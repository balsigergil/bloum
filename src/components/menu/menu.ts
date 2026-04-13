import {
  autoUpdate,
  computePosition,
  offset,
  shift,
  flip,
} from "@floating-ui/dom";

export interface BlMenuElement extends HTMLElement {
  blmenu?: Menu;
}

function getOrCreatePortal(): HTMLElement {
  const PORTAL_ID = "bl-menu-portal";
  let portal = document.getElementById(PORTAL_ID);
  if (!portal) {
    portal = document.createElement("div");
    portal.id = PORTAL_ID;
    document.body.appendChild(portal);
  }
  return portal;
}

export class Menu {
  readonly #menu: HTMLElement;
  readonly #trigger: HTMLElement;
  #cleanup: VoidFunction | null = null;
  #cleanupEvents: VoidFunction | null = null;
  #focusedItem: HTMLElement | null = null;

  constructor(element: BlMenuElement, trigger: HTMLElement) {
    if (element.blmenu !== undefined) {
      element.blmenu.destroy();
    }
    this.#menu = element;
    this.#trigger = trigger;
    this.#registerEvents();
    element.blmenu = this;
  }

  open() {
    getOrCreatePortal().appendChild(this.#menu);

    this.#menu.setAttribute("tabindex", "-1");
    this.#menu.classList.add("show");
    this.#menu.focus();
    this.#cleanup = autoUpdate(
      this.#trigger,
      this.#menu,
      this.#updatePosition.bind(this),
    );
  }

  close() {
    this.#menu.classList.remove("show");
    this.#menu.removeAttribute("tabindex");
    if (this.#cleanup) {
      this.#cleanup();
      this.#cleanup = null;
    }
    this.#clearAllFocus();
    this.#trigger.focus();
  }

  isOpen() {
    return this.#menu.classList.contains("show");
  }

  destroy() {
    this.close();
    if (this.#cleanupEvents) {
      this.#cleanupEvents();
    }
  }

  #getNavigableItems(container: HTMLElement): HTMLElement[] {
    const items: HTMLElement[] = [];
    const groups = container.querySelectorAll<HTMLElement>(
      ":scope > .menu-group",
    );
    for (const group of groups) {
      for (const child of group.children) {
        if (
          child.classList.contains("menu-item") &&
          !child.classList.contains("disabled") &&
          !child.hasAttribute("disabled")
        ) {
          items.push(child as HTMLElement);
        }
      }
    }
    return items;
  }

  #focusItem(item: HTMLElement) {
    if (this.#focusedItem === item) return;
    this.#deactivatePrevious(item);
    this.#closeUnrelatedSubmenus(item);
    this.#focusedItem = item;
    item.classList.add("active");
    item.scrollIntoView({ block: "nearest" });
  }

  #deactivatePrevious(newItem: HTMLElement) {
    if (!this.#focusedItem) return;
    const submenu = this.#focusedItem.querySelector(":scope > .submenu");
    if (submenu && submenu.contains(newItem)) {
      return;
    }
    this.#deactivateWithSubmenu(this.#focusedItem);
  }

  #closeUnrelatedSubmenus(newItem: HTMLElement) {
    this.#menu
      .querySelectorAll<HTMLElement>(".menu-item.submenu-open")
      .forEach((openItem) => {
        const submenu = openItem.querySelector(":scope > .submenu");
        if (submenu && !submenu.contains(newItem)) {
          openItem.classList.remove("submenu-open");
          submenu
            .querySelectorAll<HTMLElement>(
              ".menu-item.active, .menu-item.submenu-open",
            )
            .forEach((i) => i.classList.remove("active", "submenu-open"));
        }
      });
  }

  #deactivateWithSubmenu(item: HTMLElement) {
    item.classList.remove("active", "submenu-open");
    const submenu = item.querySelector(":scope > .submenu");
    if (submenu) {
      submenu
        .querySelectorAll<HTMLElement>(
          ".menu-item.active, .menu-item.submenu-open",
        )
        .forEach((i) => i.classList.remove("active", "submenu-open"));
    }
  }

  #clearAllFocus() {
    this.#menu
      .querySelectorAll<HTMLElement>(
        ".menu-item.active, .menu-item.submenu-open",
      )
      .forEach((item) => item.classList.remove("active", "submenu-open"));
    this.#focusedItem = null;
  }

  #focusNextItem() {
    const currentLevel = this.#getCurrentMenuLevel();
    if (!currentLevel) return;
    const items = this.#getNavigableItems(currentLevel);
    if (items.length === 0) return;
    const currentIndex = this.#focusedItem
      ? items.indexOf(this.#focusedItem)
      : -1;
    if (currentIndex < items.length - 1) {
      this.#focusItem(items[currentIndex + 1]);
    }
  }

  #focusPreviousItem() {
    const currentLevel = this.#getCurrentMenuLevel();
    if (!currentLevel) return;
    const items = this.#getNavigableItems(currentLevel);
    if (items.length === 0) return;
    const currentIndex = this.#focusedItem
      ? items.indexOf(this.#focusedItem)
      : -1;
    if (currentIndex > 0) {
      this.#focusItem(items[currentIndex - 1]);
    }
  }

  #openSubmenu(item: HTMLElement) {
    const submenu = item.querySelector<HTMLElement>(":scope > .submenu");
    if (!submenu) return;
    item.classList.add("submenu-open");
    const items = this.#getNavigableItems(submenu);
    if (items.length > 0) {
      this.#focusItem(items[0]);
    }
  }

  #closeSubmenuAndReturn() {
    if (!this.#focusedItem) return;
    const submenu = this.#focusedItem.closest(".submenu");
    if (!submenu) return;
    const parentItem = submenu.parentElement;
    if (!parentItem || !parentItem.classList.contains("menu-item")) return;
    submenu
      .querySelectorAll<HTMLElement>(
        ".menu-item.active, .menu-item.submenu-open",
      )
      .forEach((item) => item.classList.remove("active", "submenu-open"));
    parentItem.classList.remove("submenu-open");
    parentItem.classList.add("active");
    this.#focusedItem = parentItem;
  }

  #getCurrentMenuLevel(): HTMLElement | null {
    if (!this.#focusedItem) return this.#menu;
    const submenu = this.#focusedItem.closest<HTMLElement>(".submenu");
    return submenu || this.#menu;
  }

  #isInsideSubmenu(): boolean {
    if (!this.#focusedItem) return false;
    return !!this.#focusedItem.closest(".submenu");
  }

  #registerEvents() {
    const triggerHandler = this.#toggle.bind(this);
    this.#trigger.addEventListener("click", triggerHandler);

    const documentClickHandler = (e: MouseEvent) => {
      if (
        !this.#menu.contains(e.target as Node) &&
        !this.#trigger.contains(e.target as Node)
      ) {
        this.close();
      }
    };
    document.addEventListener("click", documentClickHandler);

    const menuMousemoveHandler = (e: MouseEvent) => {
      if (!this.isOpen()) return;
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        ".menu-item",
      );
      if (
        !target ||
        target.classList.contains("disabled") ||
        target.hasAttribute("disabled")
      )
        return;
      if (!this.#menu.contains(target)) return;
      this.#focusItem(target);
      if (target.querySelector(":scope > .submenu")) {
        target.classList.add("submenu-open");
      }
    };
    this.#menu.addEventListener("mousemove", menuMousemoveHandler);

    const documentKeydownHandler = (e: KeyboardEvent) => {
      if (!this.isOpen()) return;

      if (e.key === "Tab") {
        e.preventDefault();
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        if (this.#isInsideSubmenu()) {
          this.#closeSubmenuAndReturn();
        } else {
          this.close();
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.#menu.focus();
        this.#focusNextItem();
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        this.#menu.focus();
        this.#focusPreviousItem();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (this.#focusedItem) {
          this.#openSubmenu(this.#focusedItem);
        }
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (this.#isInsideSubmenu()) {
          this.#closeSubmenuAndReturn();
        }
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (this.#focusedItem) {
          this.#focusedItem.click();
        }
        return;
      }
    };
    document.addEventListener("keydown", documentKeydownHandler);

    this.#cleanupEvents = () => {
      this.#trigger.removeEventListener("click", triggerHandler);
      document.removeEventListener("click", documentClickHandler);
      document.removeEventListener("keydown", documentKeydownHandler);
      this.#menu.removeEventListener("mousemove", menuMousemoveHandler);
    };
  }

  #toggle(e: MouseEvent) {
    e.preventDefault();
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  #updatePosition() {
    computePosition(this.#trigger, this.#menu, {
      placement: "bottom-start",
      middleware: [
        offset(6),
        flip({
          crossAxis: false,
        }),
        shift({ padding: 6 }),
      ],
    }).then(({ x, y }) => {
      Object.assign(this.#menu.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });

    this.#menu.querySelectorAll<HTMLElement>(".submenu").forEach((submenu) => {
      const anchor = submenu.closest(".menu-item");
      if (!anchor) {
        return;
      }
      computePosition(anchor, submenu, {
        placement: "right-start",
        middleware: [
          flip({
            crossAxis: false,
          }),
        ],
      }).then(({ x, y }) => {
        Object.assign(submenu.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    });
  }
}

export function initMenus() {
  document.querySelectorAll<HTMLElement>(".menu").forEach((menuEl) => {
    const dropdown = menuEl.closest(".dropdown");
    if (!dropdown) {
      return;
    }

    const trigger = dropdown.querySelector<HTMLElement>(
      "[data-dropdown-toggle]",
    );
    if (!trigger) {
      return;
    }

    new Menu(menuEl, trigger);
  });
}
