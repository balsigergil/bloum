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

  if (field.hasAttribute("multiple")) {
    parsedProps.isMultiple = true;
  }

  const datasetProps: Record<string, any> = {};

  if (field.dataset.comboboxPlaceholder) {
    datasetProps["placeholder"] = field.dataset.comboboxPlaceholder;
  }

  if (field.dataset.comboboxNoResults) {
    datasetProps["noResultsText"] = field.dataset.comboboxNoResults;
  }

  if (field.dataset.comboboxSearchable) {
    datasetProps["isSearchable"] = field.dataset.comboboxSearchable === "true";
  }

  return { ...parsedProps, ...props, ...datasetProps };
}
