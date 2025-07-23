import { BloumCollapseElement } from "../collapse/collapse";

export function initAccordion() {
  document
    .querySelectorAll<HTMLElement>(".accordion-header")
    .forEach((header) => {
      document.addEventListener("toggle", (event) => {
        const ownedCollapseId = header.dataset.collapse;
        if (!ownedCollapseId) {
          return;
        }
        const ownedCollapse =
          document.querySelector<HTMLElement>(ownedCollapseId);
        if (!ownedCollapse) {
          return;
        }

        const { collapse, show } = (event as any).detail;
        if (collapse !== ownedCollapse) {
          return;
        }

        header.setAttribute("aria-expanded", show.toString());
        collapse.setAttribute("aria-expanded", show.toString());

        // Show is true, close all other accordions
        if (show) {
          const accordion = header.closest(".accordion");
          if (!accordion) {
            return;
          }
          accordion
            .querySelectorAll<BloumCollapseElement>(".accordion-collapse.show")
            .forEach((c) => {
              if (c !== collapse) {
                c.blcollapse?.toggle(header);
              }
            });
        }
      });
    });
}
