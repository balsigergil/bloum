import * as focusTrap from "focus-trap";

let modal: HTMLElement | null = null;
let modalFocusTrap: focusTrap.FocusTrap | null = null;

export function initModal() {
  addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    // Open modal when clicking on modal trigger
    if (target.closest("[data-modal]")) {
      const modalSelector = target
        .closest("[data-modal]")
        ?.getAttribute("data-modal") as string;
      const element = document.querySelector<HTMLElement>(modalSelector);
      if (element) {
        openModal(element);
        e.preventDefault();
        e.stopPropagation();
      }
    }

    // Close modal when clicking on close button
    if (target.closest("[data-modal-close]")) {
      const modal = target.closest<HTMLElement>(".modal");
      if (modal) {
        closeModal();
        e.preventDefault();
        e.stopPropagation();
      }
    }

    // Close modal when clicking outside of it
    if (target.closest(".modal.open")) {
      if (!target.closest(".modal-content")) {
        closeModal();
      }
    }
  });

  addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal();
    }
  });
}

export function openModal(element: HTMLElement) {
  if (!element) return;
  modal = element;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-modal", "true");
  modalFocusTrap = focusTrap.createFocusTrap(modal);
  modalFocusTrap.activate();
}

export function closeModal() {
  if (!modal) return;

  modal.classList.add("closing");

  modal.addEventListener(
    "animationend",
    () => {
      if (modal) {
        modal.classList.remove("open");
        modal.classList.remove("closing");
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
        modal = null;
      }
      if (modalFocusTrap) {
        modalFocusTrap.deactivate();
        modalFocusTrap = null;
      }
    },
    { once: true },
  );
}
