import { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Inputs/Checkbox Card",
};

export default meta;
type Story = StoryObj;

export const CheckboxCard: Story = {
  render: () => {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <label for="pack1" class="card checkbox-card">
          <input type="checkbox" id="pack1" name="pack1" class="input-check">
          <img src="https://picsum.photos/id/25/300/200" alt="Nature" class="card-image" />
          <div class="card-header">
            <h3 class="card-title">Basic</h3>
            <div class="card-description">Get started with the basics</div>
          </div>
          <div class="card-body text-xl">$10/month</div>
        </label>

        <label for="pack2" class="card checkbox-card">
          <input type="checkbox" id="pack2" name="pack2" class="input-check" checked>
          <img src="https://picsum.photos/id/27/300/200" alt="Nature" class="card-image" />
          <div class="card-header">
            <h3 class="card-title">Pro</h3>
            <div class="card-description">For the professionals</div>
          </div>
          <div class="card-body text-xl">$20/month</div>
        </label>

        <label for="pack3" class="card checkbox-card">
          <input type="checkbox" id="pack3" name="pack3" class="input-check">
          <img src="https://picsum.photos/id/28/300/200" alt="Nature" class="card-image" />
          <div class="card-header">
            <h3 class="card-title">Expert</h3>
            <div class="card-description">When you know what you're doing</div>
          </div>
          <div class="card-body text-xl">
            $50/month
          </div>
        </label>
      </div>
    `;
  },
};

export const RadioCard: Story = {
  render: () => {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <label for="pack4" class="card checkbox-card">
          <input type="radio" id="pack4" name="pack" value="basic" class="input-check">
          <img src="https://picsum.photos/id/25/300/200" alt="Nature" class="card-image" />
          <div class="card-header">
            <h3 class="card-title">Basic</h3>
            <div class="card-description">Get started with the basics</div>
          </div>
          <div class="card-body text-xl">
            $10/month
          </div>
        </label>

        <label for="pack5" class="card checkbox-card">
          <input type="radio" id="pack5" name="pack" value="pro" class="input-check" checked>
          <img src="https://picsum.photos/id/27/300/200" alt="Nature" class="card-image" />
          <div class="card-header">
            <h3 class="card-title">Pro</h3>
            <div class="card-description">For the professionals</div>
          </div>
          <div class="card-body text-xl">
            $20/month
          </div>
        </label>

        <label for="pack6" class="card checkbox-card">
          <input type="radio" id="pack6" name="pack" value="enterprise" class="input-check" disabled>
          <img src="https://picsum.photos/id/28/300/200" alt="Nature" class="card-image" />
          <div class="card-header">
            <h3 class="card-title">Enterprise</h3>
            <div class="card-description">Contact us for pricing</div>
          </div>
          <div class="card-body text-xl">
            Custom pricing
          </div>
        </label>
      </div>
    `;
  },
};

export const SimpleCheckboxCards: Story = {
  render: () => {
    return `
      <div class="space-y-4 max-w-lg">
        <label for="feature1" class="card checkbox-card">
          <input type="checkbox" id="feature1" class="input-check">
          <div class="card-body">
            <h4 class="font-semibold text-lg">Analytics</h4>
            Advanced analytics and reporting
          </div>
        </label>

        <label for="feature2" class="card checkbox-card">
          <input type="checkbox" id="feature2" class="input-check" checked>
          <div class="card-body">
            <h4 class="font-semibold text-lg">API Access</h4>
            Full API access for integrations
          </div>
        </label>

        <label for="feature3" class="card checkbox-card">
          <input type="checkbox" id="feature3" class="input-check">
          <div class="card-body">
            <h4 class="font-semibold text-lg">Priority Support</h4>
            24/7 priority customer support
          </div>
        </label>
      </div>
    `;
  },
};

export const SimpleRadioCards: Story = {
  render: () => {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <label for="billing1" class="card checkbox-card">
          <input type="radio" id="billing1" name="billing" value="monthly" class="input-check" checked>
          <div class="card-body space-y-2">
            <h4 class="font-semibold text-lg">Monthly Billing</h4>
            <p class="">Pay month-to-month, cancel anytime</p>
            <p class="font-semibold">$29/month</p>
          </div>
        </label>

        <label for="billing2" class="card checkbox-card">
          <input type="radio" id="billing2" name="billing" value="yearly" class="input-check">
          <div class="card-body space-y-2">
            <h4 class="font-semibold text-lg">Yearly Billing</h4>
            <p class="">Save 20% with annual billing</p>
            <p class="font-semibold">$23/month</p>
          </div>
        </label>
      </div>
    `;
  },
};
