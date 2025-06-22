import type { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
  title: "Components/Navigation/Pagination",
};

export default meta;
type Story = StoryObj;

export const Pagination: Story = {
  render: () => {
    return `
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li><a class="page-item" href="#"><i class="fas fa-angle-double-left"></i></a></li>
    <li><a class="page-item" href="#"><i class="fas fa-angle-left"></i></a></li>
    <li><a class="page-item" href="#">1</a></li>
    <li><a class="page-item active" href="#">2</a></li>
    <li><a class="page-item" href="#">3</a></li>
    <li><button class="page-item">...</button></li>
    <li><a class="page-item" href="#"><i class="fas fa-angle-right"></i></a></li>
    <li><a class="page-item" href="#"><i class="fas fa-angle-double-right"></i></a></li>
  </ul>
</nav>
`;
  },
};
