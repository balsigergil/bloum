import { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Inputs/Form Field",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="field">
          <label for="email" class="label">Email</label>
          <input type="email" id="email" class="input" placeholder="Enter your email">
        </div>
      </div>
    `;
  },
};

export const WithHelpText: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="field">
          <label for="username" class="label">Username</label>
          <input type="text" id="username" class="input" placeholder="Choose a username">
          <p class="field-text-help">Your username will be visible to other users</p>
        </div>
      </div>
    `;
  },
};

export const WithError: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="field field-danger">
          <label for="password" class="label">Password</label>
          <input type="password" id="password" class="input" placeholder="Enter password">
          <p class="field-text-danger">Password must be at least 8 characters long</p>
        </div>
      </div>
    `;
  },
};

export const WithSuccess: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="field field-success">
          <label for="email2" class="label">Email</label>
          <input type="email" id="email2" class="input" value="user@example.com">
          <p class="field-text-success">✓ Email is available</p>
        </div>
      </div>
    `;
  },
};

export const WithAdapativeHelpText: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="field field-success">
          <label for="email2" class="label">Email</label>
          <input type="email" id="email2" class="input" value="user@example.com">
          <p class="field-text">This is a valid email</p>
        </div>
        <div class="field field-danger">
          <label for="username" class="label">Username</label>
          <input type="text" id="username" class="input" value="Albert">
          <p class="field-text">This username is already taken</p>
        </div>
      </div>
    `;
  },
};

export const TextareaField: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="field">
          <label for="message" class="label">Message</label>
          <textarea id="message" class="input" rows="4" placeholder="Type your message here..."></textarea>
          <p class="field-text-help">Maximum 500 characters</p>
        </div>
      </div>
    `;
  },
};

export const SelectField: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="field">
          <label for="country" class="label">Country</label>
          <select id="country" class="input">
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
          </select>
          <p class="field-text-help">Select your country of residence</p>
        </div>
      </div>
    `;
  },
};

export const RequiredField: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="field">
          <label for="fullname" class="label">
            Full Name <span class="text-red-500">*</span>
          </label>
          <input type="text" id="fullname" class="input" placeholder="John Doe" required>
          <p class="field-text-help">This field is required</p>
        </div>
      </div>
    `;
  },
};

export const MultipleFields: Story = {
  render: () => {
    return `
      <form class="max-w-md space-y-4" action="" method="post" id="my-form">
        <div class="field">
          <label for="firstname" class="label">First Name</label>
          <input type="text" id="firstname" name="firstname" class="input" placeholder="John">
        </div>

        <div class="field">
          <label for="lastname" class="label">Last Name *</label>
          <input type="text" id="lastname" name="lastname" class="input" placeholder="Doe" required>
        </div>

        <div class="field field-danger">
          <label for="email3" class="label">Email</label>
          <input type="email" id="email3" name="email" class="input" placeholder="john@example.com">
          <p class="field-text-danger">Please enter a valid email address</p>
        </div>

        <div class="field">
          <label for="country" class="label">Country *</label>
          <select id="country" name="country" required>
            <option value="">Select a country</option>
            <option value="ch">Switzerland</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="it">Italy</option>
            <option value="au">Austria</option>
          </select>
        </div>

        <div class="field">
          <label for="bio" class="label">Bio</label>
          <textarea id="bio" class="input" name="bio" rows="3" placeholder="Tell us about yourself..."></textarea>
          <p class="field-text-help">Brief description for your profile (max 200 chars)</p>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <script>
      new Bloum.Combobox("#country", { isSearchable: true });
      document.getElementById("my-form").addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        alert(JSON.stringify(data, null, 2));
      })
      </script>`;
  },
};

export const InputGroupField: Story = {
  render: () => {
    return `
      <div class="max-w-md">
        <div class="field">
          <label for="search" class="label">Search</label>
          <div class="input-icon">
            <span class="input-icon-addon">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input type="text" id="search" class="input" placeholder="Search for items...">
          </div>
          <p class="field-text-help">Search by name, category, or description</p>
        </div>
      </div>
    `;
  },
};
