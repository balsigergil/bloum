import { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Forms",
};

export default meta;
type Story = StoryObj;

export const FormControls: Story = {
  render: () => {
    return `
      <form>
        <div class="mb-4">
          <label for="name" class="form-label">Name:</label>
          <input class="form-control" type="text" id="name" name="name" required>
        </div>
        <div class="mb-4">
          <label for="email" class="form-label">Email:</label>
          <input type="email" id="email" name="email" class="form-control" required>
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">Password:</label>
          <input type="password" id="password" name="password" class="form-control" required>
        </div>
        <div class="mb-4">
          <label for="message" class="form-label">Message:</label>
          <textarea id="message" name="message" class="form-control" placeholder="Your message here..."></textarea>
        </div>
        <div class="mb-4 form-check">
          <input type="checkbox" id="remember" name="remember" class="form-checkbox">
          <label for="remember" class="form-label">Remember me</label>
        </div>
        <div class="mb-4">
          <p class="form-label mb-2">Favorite pet:</p>
          <div class="flex gap-4">
            <div class="form-check">
              <input type="radio" id="cat" name="pet" value="cat" class="form-checkbox">
              <label for="cat" class="form-label">Cat</label>
            </div>
            <div class="form-check">
              <input type="radio" id="dog" name="pet" value="dog" class="form-checkbox">
              <label for="dog" class="form-label">Dog</label>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>`;
  },
};

export const CheckboxCard: Story = {
  render: () => {
    return `
    <div class="grid grid-flow-col gap-4 auto-cols-[250px]">
      <label for="pack1" class="card checkbox-card">
        <input type="checkbox" id="pack1" name="pack1" class="form-checkbox">
        <img src="https://picsum.photos/id/25/300/200" alt="Nature" class="card-image" />
        <div class="card-header">
          <h3 class="card-title">Basic</h3>
        </div>
        <div class="card-body">
          <div class="font-semibold text-gray-500 text-sm">Get started with the basics</div>
          <p class="font-semibold mt-2">$10/month</p>
        </div>
      </label>
      <label for="pack2" class="card checkbox-card">
        <input type="checkbox" id="pack2" name="pack2" class="form-checkbox">
        <img src="https://picsum.photos/id/27/300/200" alt="Nature" class="card-image" />
        <div class="card-header">
          <h3 class="card-title">Pro</h3>
        </div>
        <div class="card-body">
          <div class="font-semibold text-gray-500 text-sm">For the professionals</div>
          <p class="font-semibold mt-2">$20/month</p>
        </div>
      </label>
      <label for="pack3" class="card checkbox-card">
        <input type="checkbox" id="pack3" name="pack3" class="form-checkbox">
        <img src="https://picsum.photos/id/28/300/200" alt="Nature" class="card-image" />
        <div class="card-header">
          <h3 class="card-title">Expert</h3>
        </div>
        <div class="card-body">
          <div class="font-semibold text-gray-500 text-sm">When you know what you're doing</div>
          <p class="font-semibold mt-2">$50/month</p>
        </div>
      </label>
    </div>
     `;
  },
};

export const RadioCard: Story = {
  render: () => {
    return `
    <div class="grid grid-flow-col gap-4 auto-cols-[250px]">
      <label for="pack4" class="card checkbox-card">
        <input type="radio" id="pack4" name="pack" class="form-checkbox">
        <img src="https://picsum.photos/id/25/300/200" alt="Nature" class="card-image" />
        <div class="card-header">
          <h3 class="card-title">Basic</h3>
        </div>
        <div class="card-body">
          <div class="font-semibold text-gray-500 text-sm">Get started with the basics</div>
          <p class="font-semibold mt-2">$10/month</p>
        </div>
      </label>
      <label for="pack5" class="card checkbox-card">
        <input type="radio" id="pack5" name="pack" class="form-checkbox">
        <img src="https://picsum.photos/id/27/300/200" alt="Nature" class="card-image" />
        <div class="card-header">
          <h3 class="card-title">Pro</h3>
        </div>
        <div class="card-body">
          <div class="font-semibold text-gray-500 text-sm">For the professionals</div>
          <p class="font-semibold mt-2">$20/month</p>
        </div>
      </label>
      <label for="pack6" class="card checkbox-card">
        <input type="radio" id="pack6" name="pack" class="form-checkbox" disabled>
        <img src="https://picsum.photos/id/28/300/200" alt="Nature" class="card-image" />
        <div class="card-header">
          <h3 class="card-title">Expert</h3>
        </div>
        <div class="card-body">
          <div class="font-semibold text-gray-500 text-sm">When you know what you're doing</div>
          <p class="font-semibold mt-2">$50/month</p>
        </div>
      </label>
    </div>
     `;
  },
};
