import { Meta, StoryObj } from "@storybook/html-vite";
import { initPasswordToggle } from "./password-input";

const meta: Meta = {
  title: "Components/Inputs/Input",
};

export default meta;
type Story = StoryObj;

export const TextInput: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <input class="input" type="text" placeholder="Enter your name">
      </div>
    `;
  },
};

export const PasswordInput: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <input type="password" class="input" placeholder="Enter password">
      </div>
    `;
  },
};

export const PasswordWithToggle: Story = {
  render: () => {
    // Initialize password toggle after rendering
    setTimeout(() => {
      initPasswordToggle(document);
    }, 0);

    return `
      <div class="max-w-md space-y-4">
        <div class="input-icon">
          <input type="password" class="input" placeholder="Enter password" id="password1">
          <button type="button" class="password-toggle" aria-label="Show password">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>

        <div class="input-icon">
          <input type="password" class="input" placeholder="Confirm password" id="password2">
          <button type="button" class="password-toggle" aria-label="Show password">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>

        <div class="field">
          <label class="label">With Label</label>
          <div class="input-icon">
            <input type="password" class="input" placeholder="Your secure password">
            <button type="button" class="password-toggle" aria-label="Show password">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
          <p class="field-text-help">Password must be at least 8 characters long.</p>
        </div>
      </div>
    `;
  },
};

export const EmailInput: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <input type="email" class="input" placeholder="Enter email">
      </div>
    `;
  },
};

export const FileInput: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <input type="file" class="input">
      </div>
    `;
  },
};

export const Select: Story = {
  render: () => {
    return `
      <div class="max-w-md space-y-4">
        <select class="input">
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <div class="input-icon">
          <span class="input-icon-addon">
            <i class="fa-solid fa-user"></i>
          </span>
          <select class="input">
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>
    `;
  },
};

export const MultiSelect: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <select class="input" multiple size="5">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
        </select>
      </div>
    `;
  },
};

export const InputGroup: Story = {
  render: () => {
    return `
      <div class="max-w-md space-y-4">
        <div class="input-icon">
          <span class="input-icon-addon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <input type="text" class="input" placeholder="Search...">
        </div>

        <div class="input-icon">
          <input type="text" class="input" placeholder="Username">
          <span class="input-icon-addon">
            <i class="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
    `;
  },
};

export const AllInputTypes: Story = {
  render: () => {
    return `
      <div class="max-w-md space-y-4">
        <input class="input" type="text" placeholder="Text input">
        <input type="password" class="input" placeholder="Password input">
        <input type="email" class="input" placeholder="Email input">
        <input type="number" class="input" placeholder="Number input">
        <input type="tel" class="input" placeholder="Phone input">
        <input type="url" class="input" placeholder="URL input">
        <input type="date" class="input">
        <input type="time" class="input">
        <input type="datetime-local" class="input">
        <input type="month" class="input">
        <input type="week" class="input">
        <input type="color" class="input">
        <input type="range" class="input">
      </div>
    `;
  },
};
