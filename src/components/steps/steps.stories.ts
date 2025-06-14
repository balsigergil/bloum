import { Meta, StoryObj } from "@storybook/html-vite";

type StepsArgs = {
  orientation: "horizontal" | "vertical";
  size: "sm" | "default" | "lg";
  variant: "default" | "primary" | "success" | "danger" | "warning";
  currentStep: number;
  showDescriptions: boolean;
  showIcons: boolean;
};

const meta: Meta<StepsArgs> = {
  title: "Components/Steps",
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "success", "danger", "warning"],
    },
    currentStep: {
      control: { type: "number", min: 1, max: 5 },
    },
    showDescriptions: {
      control: "boolean",
    },
    showIcons: {
      control: "boolean",
    },
  },
  render: (args) => {
    const sizeClass = args.size !== "default" ? `steps-${args.size}` : "";
    const variantClass =
      args.variant !== "default" ? `steps-${args.variant}` : "";
    const orientationClass =
      args.orientation === "vertical" ? "steps-vertical" : "";

    const steps = [
      { title: "Account", description: "Create your account", icon: "fa-user" },
      {
        title: "Profile",
        description: "Complete your profile",
        icon: "fa-id-card",
      },
      {
        title: "Preferences",
        description: "Set your preferences",
        icon: "fa-cog",
      },
      {
        title: "Confirmation",
        description: "Review and confirm",
        icon: "fa-check-circle",
      },
    ];

    const stepsHtml = steps
      .map((step, index) => {
        const stepNumber = index + 1;
        const isDone = stepNumber < args.currentStep;
        const isActive = stepNumber === args.currentStep;
        const stepClass = isDone ? "done" : isActive ? "active" : "";

        return `
        <a href="#" class="step ${stepClass}">
          <div class="step-indicator">
            ${args.showIcons && !isDone ? `<i class="fas ${step.icon}"></i>` : ""}
          </div>
          <div class="step-content">
            <div class="step-title">${step.title}</div>
            ${args.showDescriptions ? `<div class="step-description">${step.description}</div>` : ""}
          </div>
        </a>
      `;
      })
      .join("");

    return `
      <div class="steps ${sizeClass} ${variantClass} ${orientationClass}">
        ${stepsHtml}
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<StepsArgs>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    size: "default",
    variant: "default",
    currentStep: 2,
    showDescriptions: false,
    showIcons: false,
  },
};

export const WithDescriptions: Story = {
  args: {
    orientation: "horizontal",
    size: "default",
    variant: "default",
    currentStep: 2,
    showDescriptions: true,
    showIcons: false,
  },
};

export const WithIcons: Story = {
  args: {
    orientation: "horizontal",
    size: "default",
    variant: "default",
    currentStep: 3,
    showDescriptions: true,
    showIcons: true,
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    size: "default",
    variant: "default",
    currentStep: 2,
    showDescriptions: true,
    showIcons: false,
  },
};

export const SmallSize: Story = {
  args: {
    orientation: "horizontal",
    size: "sm",
    variant: "default",
    currentStep: 3,
    showDescriptions: false,
    showIcons: false,
  },
};

export const LargeSize: Story = {
  args: {
    orientation: "horizontal",
    size: "lg",
    variant: "default",
    currentStep: 2,
    showDescriptions: true,
    showIcons: true,
  },
};

export const AllCompleted: Story = {
  args: {
    orientation: "horizontal",
    size: "default",
    variant: "default",
    currentStep: 5,
    showDescriptions: true,
    showIcons: false,
  },
};
