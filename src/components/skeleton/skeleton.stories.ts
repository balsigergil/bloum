import type { Meta, StoryObj } from "@storybook/html-vite";

type SkeletonArgs = {
  shape?: string;
  size?: string;
  animation?: string;
  height?: string;
};

const meta: Meta<SkeletonArgs> = {
  title: "Components/Skeleton",
  argTypes: {
    shape: {
      control: "select",
      options: ["box", "circle", "text"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    animation: {
      control: "select",
      options: ["pulse", "shine"],
    },
    height: {
      control: "text",
    },
  },
  args: {
    shape: "box",
    size: "md",
    animation: "pulse",
    height: "",
  },
  render: (args) => {
    const skeleton = document.createElement("div");
    skeleton.classList.add("skeleton");

    if (args.shape && args.shape !== "box") {
      skeleton.classList.add(`skeleton-${args.shape}`);
    }

    if (args.size && args.size !== "md") {
      skeleton.classList.add(`skeleton-${args.size}`);
    }

    if (args.animation && args.animation !== "pulse") {
      skeleton.classList.add(`skeleton-${args.animation}`);
    }

    if (args.height) {
      skeleton.style.height = args.height;
    }

    return skeleton;
  },
};

export default meta;
type Story = StoryObj<SkeletonArgs>;

export const Default: Story = {};

export const Shapes: Story = {
  render: () => `
    <div class="flex gap-4 items-center">
      <div class="skeleton" style="width: 100px;"></div>
      <div class="skeleton skeleton-circle"></div>
      <div class="skeleton skeleton-text" style="width: 200px;"></div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => `
    <div class="flex gap-4 items-center">
      <div class="skeleton skeleton-xs" style="width: 80px;"></div>
      <div class="skeleton skeleton-sm" style="width: 100px;"></div>
      <div class="skeleton skeleton-md" style="width: 120px;"></div>
      <div class="skeleton skeleton-lg" style="width: 140px;"></div>
      <div class="skeleton skeleton-xl" style="width: 160px;"></div>
    </div>
  `,
};

export const Animations: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <div class="flex gap-4 items-center">
        <span class="text-sm font-medium w-16">Pulse:</span>
        <div class="skeleton skeleton-pulse" style="width: 200px;"></div>
      </div>
      <div class="flex gap-4 items-center">
        <span class="text-sm font-medium w-16">Shine:</span>
        <div class="skeleton skeleton-shine" style="width: 200px;"></div>
      </div>
    </div>
  `,
};

export const ContentPlaceholder: Story = {
  render: () => `
    <div class="space-y-4 max-w-md">
      <div class="flex items-center gap-4">
        <div class="skeleton skeleton-circle skeleton-lg"></div>
        <div class="space-y-2 flex-1">
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text" style="width: 80%;"></div>
        </div>
      </div>
      <div class="space-y-2">
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text" style="width: 90%;"></div>
        <div class="skeleton skeleton-text" style="width: 85%;"></div>
      </div>
      <div class="skeleton" style="height: 200px;"></div>
    </div>
  `,
};

export const ShineExample: Story = {
  render: () => `
    <div class="space-y-4 max-w-md skeleton-shine">
      <div class="flex items-center gap-4">
        <div class="skeleton skeleton-circle skeleton-lg"></div>
        <div class="space-y-2 flex-1">
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text" style="width: 80%;"></div>
        </div>
      </div>
      <div class="space-y-2">
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text" style="width: 90%;"></div>
        <div class="skeleton skeleton-text" style="width: 85%;"></div>
      </div>
      <div class="skeleton" style="height: 200px;"></div>
    </div>
  `,
};
