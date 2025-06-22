import { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Modal",
  tags: ["!autodocs"],
};

export default meta;

export const BasicModal: StoryObj = {
  render: () => {
    return `<button class="btn btn-primary" data-modal="#my-modal">Open modal</button>
<div class="modal fade" id="my-modal" aria-labelledby="my-modal-title">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="my-modal-title">Login modal</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="mb-4">
          <label for="email" class="label">Email:</label>
          <input type="email" id="email" name="email" class="field" required>
        </div>
        <div class="mb-4">
          <label for="password" class="label">Password:</label>
          <input type="password" id="password" name="password" class="field" autocomplete="off" required>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</div>`;
  },
};

export const NestedModals: StoryObj = {
  render: () => {
    return `<button class="btn btn-primary" data-modal="#modal-1">Open modal</button>
<div class="modal" id="modal-1" role="dialog" aria-labelledby="my-modal-title">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="my-modal-title">Modal 1</h3>
      <button type="button" class="btn btn-icon btn-ghost btn-sm" aria-label="Close" data-modal-close>
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="modal-body">
      <button class="btn btn-primary" data-modal="#modal-2">Open second modal</button>
    </div>
  </div>
</div>
<div class="modal" id="modal-2" role="dialog" aria-labelledby="my-modal-title-2">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="my-modal-title-2">Modal 2</h3>
      <button type="button" class="btn btn-icon btn-ghost btn-sm" aria-label="Close" data-modal-close>
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="modal-body">
      This is the second modal
    </div>
  </div>
</div>`;
  },
};
