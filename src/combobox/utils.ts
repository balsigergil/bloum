import { BlComboboxConfig, DEFAULT_PROPS } from "./Combobox";

export function parseOptions(
  field: HTMLSelectElement,
  props?: BlComboboxConfig,
): BlComboboxConfig {
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
