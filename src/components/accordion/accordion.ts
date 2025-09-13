import { BloumCollapseElement } from "../collapse/collapse";

const accordionListeners: EventListener[] = [];

export function initAccordion() {
  accordionListeners.forEach((l) => {
    document.removeEventListener("toggle", l);
  });

  document
    .querySelectorAll<HTMLElement>(".accordion-header")
    .forEach((header) => {
      const handler = (event: any) => {
        const ownedCollapseId = header.dataset.collapse;
        if (!ownedCollapseId) {
          return;
        }
        const ownedCollapse =
          document.querySelector<HTMLElement>(ownedCollapseId);
        if (!ownedCollapse) {
          return;
        }

        const { collapse, show } = event.detail;
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
      };
      accordionListeners.push(handler);
      document.addEventListener("toggle", handler);
    });
}
