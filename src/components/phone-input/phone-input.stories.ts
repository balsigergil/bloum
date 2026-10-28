import { Meta, StoryObj } from "@storybook/html-vite";
import { initPhoneInput } from "./phone-input";

const meta: Meta = {
  title: "Components/Inputs/Phone Input",
  parameters: {
    docs: {
      description: {
        component: `
A phone number field with a country selector inside the same border. The number is formatted as it is typed with the pattern of the selected country, and limited to its length.

## Usage

Add the \`data-phone-input\` attribute to any text input:

\`\`\`html
<input type="tel" class="input" name="phone" data-phone-input data-phone-input-country="CH" />
\`\`\`

The input keeps the formatted national number (\`79 123 45 67\`). Its \`name\` moves to a hidden input that holds the E.164 value (\`+41791234567\`), so that is what the form submits. Typing or pasting an international number (\`+33…\` or \`0033…\`) selects its country, and a leading trunk prefix (\`0\` in most of Europe) is dropped.

A number with an incomplete length is reported as invalid through the constraint validation API, so the browser blocks the form submission like any other invalid field.

## Data Attributes

- \`data-phone-input\`: Enables the phone input
- \`data-phone-input-country\`: ISO code of the default country (defaults to the region of the browser language)
- \`data-phone-input-countries\`: Comma-separated ISO codes of the countries offered in the menu
- \`data-phone-input-search-placeholder\`: Placeholder of the country search field
- \`data-phone-input-no-results\`: Text shown when no country matches the search
- \`data-phone-input-invalid-message\`: Validation message of an incomplete number

## JavaScript

\`\`\`js
const phone = new Bloum.PhoneInput("#phone", { country: "FR" });
phone.value; // "+33612345678"
phone.country = "BE";

// Support another country or format
Bloum.PhoneInput.countries.push({ code: "MC", dialCode: "377", format: "## ## ## ##" });
\`\`\`

Changing the country from the menu dispatches \`bl-phone-input-country-change\` on the input, with \`{ country, dialCode }\` as its detail.

Flags are emoji: Windows does not ship flag glyphs and shows the two-letter country code instead.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    setTimeout(() => initPhoneInput(), 0);

    return `
      <div class="field" style="max-width: 20rem">
        <label class="label" for="phone-default">Phone number</label>
        <input type="tel" class="input" id="phone-default" name="phone" data-phone-input data-phone-input-country="CH" />
      </div>
    `;
  },
};

export const WithValue: Story = {
  render: () => {
    setTimeout(() => initPhoneInput(), 0);

    return `
      <div class="field" style="max-width: 20rem">
        <label class="label" for="phone-value">Phone number</label>
        <input type="tel" class="input" id="phone-value" name="phone" value="+33612345678" data-phone-input />
      </div>
    `;
  },
};

export const RestrictedCountries: Story = {
  render: () => {
    setTimeout(() => initPhoneInput(), 0);

    return `
      <div class="field" style="max-width: 20rem">
        <label class="label" for="phone-restricted">Phone number</label>
        <input type="tel" class="input" id="phone-restricted" name="phone" data-phone-input data-phone-input-country="CH" data-phone-input-countries="CH,FR,DE,IT,AT,LI" />
        <p class="field-text-help">Only Switzerland and its neighbours.</p>
      </div>
    `;
  },
};

export const InForm: Story = {
  render: () => {
    setTimeout(() => initPhoneInput(), 0);

    return `
      <form style="max-width: 20rem" onsubmit="event.preventDefault(); alert('phone: ' + new FormData(event.target).get('phone'));">
        <div class="field">
          <label class="label" for="phone-form">Phone number</label>
          <input type="tel" class="input" id="phone-form" name="phone" required data-phone-input data-phone-input-country="US" />
          <p class="field-text-help">Submits the number in E.164 format.</p>
        </div>
        <div style="display: flex; gap: 0.5rem; margin-top: 1rem">
          <button type="submit" class="btn btn-primary">Submit</button>
          <button type="reset" class="btn">Reset</button>
        </div>
      </form>
    `;
  },
};

export const Disabled: Story = {
  render: () => {
    setTimeout(() => initPhoneInput(), 0);

    return `
      <div class="field" style="max-width: 20rem">
        <label class="label" for="phone-disabled">Phone number</label>
        <input type="tel" class="input" id="phone-disabled" name="phone" value="+41791234567" disabled data-phone-input />
      </div>
    `;
  },
};
