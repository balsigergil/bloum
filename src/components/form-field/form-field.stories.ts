import { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Form Field",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="form-field">
          <label for="email" class="label">Email</label>
          <input type="email" id="email" class="form-control" placeholder="Enter your email">
        </div>
      </div>
    `;
  },
};

export const WithHelpText: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="form-field">
          <label for="username" class="label">Username</label>
          <input type="text" id="username" class="form-control" placeholder="Choose a username">
          <p class="form-field-help">Your username will be visible to other users</p>
        </div>
      </div>
    `;
  },
};

export const WithError: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="form-field form-field-error-state">
          <label for="password" class="label">Password</label>
          <input type="password" id="password" class="form-control" placeholder="Enter password">
          <p class="form-field-error">Password must be at least 8 characters long</p>
        </div>
      </div>
    `;
  },
};

export const WithSuccess: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="form-field form-field-success-state">
          <label for="email2" class="label">Email</label>
          <input type="email" id="email2" class="form-control" value="user@example.com">
          <p class="form-field-help">✓ Email is available</p>
        </div>
      </div>
    `;
  },
};

export const TextareaField: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="form-field">
          <label for="message" class="label">Message</label>
          <textarea id="message" class="form-control" rows="4" placeholder="Type your message here..."></textarea>
          <p class="form-field-help">Maximum 500 characters</p>
        </div>
      </div>
    `;
  },
};

export const SelectField: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="form-field">
          <label for="country" class="label">Country</label>
          <select id="country" class="form-control">
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
          </select>
          <p class="form-field-help">Select your country of residence</p>
        </div>
      </div>
    `;
  },
};

export const RequiredField: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="form-field">
          <label for="fullname" class="label">
            Full Name <span class="text-red-500">*</span>
          </label>
          <input type="text" id="fullname" class="form-control" placeholder="John Doe" required>
          <p class="form-field-help">This field is required</p>
        </div>
      </div>
    `;
  },
};

export const MultipleFields: Story = {
  render: () => {
    return `
      <form class="max-w-md space-y-4">
        <div class="form-field">
          <label for="firstname" class="label">First Name</label>
          <input type="text" id="firstname" class="form-control" placeholder="John">
        </div>
        
        <div class="form-field">
          <label for="lastname" class="label">Last Name</label>
          <input type="text" id="lastname" class="form-control" placeholder="Doe">
        </div>
        
        <div class="form-field form-field-error-state">
          <label for="email3" class="label">Email</label>
          <input type="email" id="email3" class="form-control" placeholder="john@example.com">
          <p class="form-field-error">Please enter a valid email address</p>
        </div>
        
        <div class="form-field">
          <label for="bio" class="label">Bio</label>
          <textarea id="bio" class="form-control" rows="3" placeholder="Tell us about yourself..."></textarea>
          <p class="form-field-help">Brief description for your profile (max 200 chars)</p>
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    `;
  },
};

export const InputGroupField: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="form-field">
          <label for="search" class="label">Search</label>
          <div class="input-group">
            <span class="input-group-icon">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input type="text" id="search" class="form-control" placeholder="Search for items...">
          </div>
          <p class="form-field-help">Search by name, category, or description</p>
        </div>
      </div>
    `;
  },
};
