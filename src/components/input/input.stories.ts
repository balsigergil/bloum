import { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Input",
};

export default meta;
type Story = StoryObj;

export const TextInput: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <input class="form-control" type="text" placeholder="Enter your name">
      </div>
    `;
  },
};

export const PasswordInput: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <input type="password" class="form-control" placeholder="Enter password">
      </div>
    `;
  },
};

export const EmailInput: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <input type="email" class="form-control" placeholder="Enter email">
      </div>
    `;
  },
};

export const FileInput: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <input type="file" class="form-control">
      </div>
    `;
  },
};

export const Select: Story = {
  render: () => {
    return `
      <div class="max-w-md space-y-4">
        <select class="form-control">
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <div class="input-icon">
          <span class="input-icon-addon">
            <i class="fa-solid fa-user"></i>
          </span>
          <select class="form-control">
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
        <select class="form-control" multiple size="5">
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
          <input type="text" class="form-control" placeholder="Search...">
        </div>
        
        <div class="input-icon">
          <input type="text" class="form-control" placeholder="Username">
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
        <input class="form-control" type="text" placeholder="Text input">
        <input type="password" class="form-control" placeholder="Password input">
        <input type="email" class="form-control" placeholder="Email input">
        <input type="number" class="form-control" placeholder="Number input">
        <input type="tel" class="form-control" placeholder="Phone input">
        <input type="url" class="form-control" placeholder="URL input">
        <input type="date" class="form-control">
        <input type="time" class="form-control">
        <input type="datetime-local" class="form-control">
        <input type="month" class="form-control">
        <input type="week" class="form-control">
        <input type="color" class="form-control">
        <input type="range" class="form-control">
      </div>
    `;
  },
};
