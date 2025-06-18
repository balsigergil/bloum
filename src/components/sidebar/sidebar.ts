// Store references to event listeners to allow removal
let sidebarToggleListener: ((e: Event) => void) | null = null;
let sidebarHideListener: ((e: Event) => void) | null = null;

export function initSidebar() {
  // Remove existing listeners if they exist
  if (sidebarToggleListener) {
    document.removeEventListener("click", sidebarToggleListener);
  }
  if (sidebarHideListener) {
    document.removeEventListener("click", sidebarHideListener);
  }

  // Define the toggle listener
  sidebarToggleListener = (e) => {
    let target = e.target as HTMLElement | null;
    if (!target) {
      return;
    }

    target = target.closest("[data-sidebar]");
    if (!target || !target.dataset.sidebar) {
      return;
    }

    const sidebarSelector = target.dataset.sidebar;
    const sidebar = document.querySelector(sidebarSelector);
    if (!sidebar) {
      return;
    }

    sidebar.classList.toggle("show");
  };

  // Define the hide listener
  sidebarHideListener = (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) {
      return;
    }

    if (target.classList.contains("sidebar")) {
      target.classList.add("hide");
      target.addEventListener(
        "animationend",
        () => {
          target.classList.remove("show");
          target.classList.remove("hide");
        },
        { once: true },
      );
    }
  };

  // Add the new listeners
  document.addEventListener("click", sidebarToggleListener);
  document.addEventListener("click", sidebarHideListener);
}
