import { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Inputs/Checkbox",
};

export default meta;
type Story = StoryObj;

export const Checkbox: Story = {
  render: () => {
    return `
      <div class="space-y-4">
        <div class="field">
          <input type="checkbox" id="checkbox1" class="input-check">
          <label for="checkbox1" class="label">Accept terms and conditions</label>
        </div>
        
        <div class="field">
          <input type="checkbox" id="checkbox2" class="input-check" checked>
          <label for="checkbox2" class="label">Subscribe to newsletter</label>
        </div>
        
        <div class="field">
          <input type="checkbox" id="checkbox3" class="input-check" disabled>
          <label for="checkbox3" class="label">Disabled checkbox</label>
        </div>
        
        <div class="field">
          <input type="checkbox" id="checkbox4" class="input-check" checked disabled>
          <label for="checkbox4" class="label">Disabled checked checkbox</label>
        </div>
      </div>
    `;
  },
};

export const Radio: Story = {
  render: () => {
    return `
      <div class="space-y-4">
        <p class="label mb-2">Select your plan:</p>
        <div class="space-y-2">
          <div class="field">
            <input type="radio" id="basic" name="plan" value="basic" class="input-check">
            <label for="basic" class="label">Basic - $10/month</label>
          </div>
          
          <div class="field">
            <input type="radio" id="pro" name="plan" value="pro" class="input-check" checked>
            <label for="pro" class="label">Pro - $20/month</label>
          </div>
          
          <div class="field">
            <input type="radio" id="enterprise" name="plan" value="enterprise" class="input-check">
            <label for="enterprise" class="label">Enterprise - $50/month</label>
          </div>
          
          <div class="field">
            <input type="radio" id="custom" name="plan" value="custom" class="input-check" disabled>
            <label for="custom" class="label">Custom (Contact us)</label>
          </div>
        </div>
      </div>
    `;
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    return `
      <div class="space-y-4">
        <p class="label mb-2">Select your interests:</p>
        <div class="space-y-2">
          <div class="field">
            <input type="checkbox" id="design" class="input-check">
            <label for="design" class="label">Design</label>
          </div>
          <div class="field">
            <input type="checkbox" id="development" class="input-check" checked>
            <label for="development" class="label">Development</label>
          </div>
          <div class="field">
            <input type="checkbox" id="marketing" class="input-check">
            <label for="marketing" class="label">Marketing</label>
          </div>
          <div class="field">
            <input type="checkbox" id="sales" class="input-check">
            <label for="sales" class="label">Sales</label>
          </div>
        </div>
      </div>
    `;
  },
};

export const InlineCheckboxes: Story = {
  render: () => {
    return `
      <div class="flex gap-4 flex-wrap items-start">
        <div class="field">
          <input type="checkbox" id="inline1" class="input-check">
          <label for="inline1" class="label">Option 1</label>
        </div>
        <div class="field">
          <input type="checkbox" id="inline2" class="input-check">
          <label for="inline2" class="label">Option 2</label>
        </div>
        <div class="field">
          <input type="checkbox" id="inline3" class="input-check">
          <label for="inline3" class="label">Option 3</label>
        </div>
      </div>
    `;
  },
};

export const InlineRadios: Story = {
  render: () => {
    return `
      <div class="flex gap-4 flex-wrap items-start">
        <div class="field">
          <input type="radio" id="size-sm" name="size" value="sm" class="input-check">
          <label for="size-sm" class="label">Small</label>
        </div>
        <div class="field">
          <input type="radio" id="size-md" name="size" value="md" class="input-check" checked>
          <label for="size-md" class="label">Medium</label>
        </div>
        <div class="field">
          <input type="radio" id="size-lg" name="size" value="lg" class="input-check">
          <label for="size-lg" class="label">Large</label>
        </div>
      </div>
    `;
  },
};
