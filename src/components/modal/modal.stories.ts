import { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Components/Modal",
  render: () => {
    return `<button class="btn btn-primary" data-modal="#my-modal">Open modal</button>
<div class="modal" id="my-modal" role="dialog" aria-labelledby="my-modal-title">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="my-modal-title">Login modal</h3>
      <button type="button" class="btn btn-icon btn-ghost btn-sm" aria-label="Close" data-modal-close>
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="mb-4">
          <label for="email" class="label">Email:</label>
          <input type="email" id="email" name="email" class="form-control" required>
        </div>
        <div class="mb-4">
          <label for="password" class="label">Password:</label>
          <input type="password" id="password" name="password" class="form-control" autocomplete="off" required>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>`;
  },
};

export default meta;

export const Modal: StoryObj = {};
