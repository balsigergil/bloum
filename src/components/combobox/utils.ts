import type { ComboboxConfig } from "./combobox";

export const DEFAULT_PROPS: ComboboxConfig = {
  placeholder: "Select an option...",
  noResultsText: "No results found",
  isSearchable: false,
  isMultiple: false,
};

export function parseOptions(
  field: HTMLSelectElement,
  props?: ComboboxConfig,
): ComboboxConfig {
  // Merge the default props with the provided props
  const parsedProps = { ...DEFAULT_PROPS };

  if (field.hasAttribute("placeholder")) {
    parsedProps.placeholder = field.getAttribute("placeholder") || "";
  }

  if (field.hasAttribute("multiple")) {
    parsedProps.isMultiple = true;
  }

  return { ...parsedProps, ...props };
}
