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
        <input class="field" type="text" placeholder="Enter your name">
      </div>
    `;
  },
};

export const PasswordInput: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <input type="password" class="field" placeholder="Enter password">
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
          <input type="password" class="field" placeholder="Enter password" id="password1">
          <button type="button" class="password-toggle" aria-label="Show password">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>
        
        <div class="input-icon">
          <input type="password" class="field" placeholder="Confirm password" id="password2">
          <button type="button" class="password-toggle" aria-label="Show password">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>
        
        <div class="form-field">
          <label class="label">With Label</label>
          <div class="input-icon">
            <input type="password" class="field" placeholder="Your secure password">
            <button type="button" class="password-toggle" aria-label="Show password">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
          <p class="form-field-help">Password must be at least 8 characters long.</p>
        </div>
      </div>
    `;
  },
};

export const EmailInput: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <input type="email" class="field" placeholder="Enter email">
      </div>
    `;
  },
};

export const FileInput: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <input type="file" class="field">
      </div>
    `;
  },
};

export const Select: Story = {
  render: () => {
    return `
      <div class="max-w-md space-y-4">
        <select class="field">
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <div class="input-icon">
          <span class="input-icon-addon">
            <i class="fa-solid fa-user"></i>
          </span>
          <select class="field">
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
        <select class="field" multiple size="5">
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
          <input type="text" class="field" placeholder="Search...">
        </div>

        <div class="input-icon">
          <input type="text" class="field" placeholder="Username">
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
        <input class="field" type="text" placeholder="Text input">
        <input type="password" class="field" placeholder="Password input">
        <input type="email" class="field" placeholder="Email input">
        <input type="number" class="field" placeholder="Number input">
        <input type="tel" class="field" placeholder="Phone input">
        <input type="url" class="field" placeholder="URL input">
        <input type="date" class="field">
        <input type="time" class="field">
        <input type="datetime-local" class="field">
        <input type="month" class="field">
        <input type="week" class="field">
        <input type="color" class="field">
        <input type="range" class="field">
      </div>
    `;
  },
};
