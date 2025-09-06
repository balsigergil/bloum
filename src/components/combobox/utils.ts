import type { ComboboxConfig } from "./combobox";

export const DEFAULT_PROPS: ComboboxConfig = {
  placeholder: "Select an option...",
  noResultsText: "No results found",
  isSearchable: false,
  isMultiple: false,
  debug: false,
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
  } else {
    // Look an empy option for the placeholder
    const emptyOption = field.querySelector("option[value='']");
    if (
      emptyOption !== null &&
      emptyOption.textContent !== null &&
      emptyOption.textContent !== ""
    ) {
      datasetProps["placeholder"] = emptyOption.textContent;
    }
  }

  if (field.dataset.comboboxNoResults) {
    datasetProps["noResultsText"] = field.dataset.comboboxNoResults;
  }

  if (field.dataset.comboboxSearchable) {
    datasetProps["isSearchable"] = field.dataset.comboboxSearchable === "true";
  }

  return { ...parsedProps, ...props, ...datasetProps };
}
