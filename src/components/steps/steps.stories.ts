import { Meta, StoryObj } from "@storybook/html-vite";

type StepsArgs = {
  size: "sm" | "default" | "lg";
  currentStep: number;
  showDescriptions: boolean;
  showIcons: boolean;
};

const meta: Meta<StepsArgs> = {
  title: "Components/Navigation/Steps",
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
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
        <div class="step ${stepClass}">
          <a href="#" class="step-inner">
            <div class="step-indicator">
              ${args.showIcons && !isDone ? `<i class="fas ${step.icon}"></i>` : ""}
            </div>
            <div class="step-content">
              <div class="step-title">${step.title}</div>
              ${args.showDescriptions ? `<div class="step-description">${step.description}</div>` : ""}
            </div>
          </a>
        </div>
      `;
      })
      .join("");

    return `
      <div class="steps ${sizeClass}">
        ${stepsHtml}
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<StepsArgs>;

export const Default: Story = {
  args: {
    size: "default",
    currentStep: 2,
    showDescriptions: false,
    showIcons: false,
  },
};

export const WithDescriptions: Story = {
  args: {
    size: "default",
    currentStep: 2,
    showDescriptions: true,
    showIcons: false,
  },
};

export const WithIcons: Story = {
  args: {
    size: "default",
    currentStep: 3,
    showDescriptions: true,
    showIcons: true,
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    currentStep: 2,
    showDescriptions: true,
    showIcons: true,
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    currentStep: 2,
    showDescriptions: true,
    showIcons: true,
  },
};

export const AllCompleted: Story = {
  args: {
    size: "default",
    currentStep: 5,
    showDescriptions: true,
    showIcons: false,
  },
};
