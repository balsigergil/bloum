import type { Meta, StoryObj } from "@storybook/html-vite";

type ProgressArgs = {
  value?: number;
  size?: string;
  variant?: string;
  striped?: boolean;
  animated?: boolean;
  indeterminate?: boolean;
  showLabel?: boolean;
  labelText?: string;
};

const meta: Meta<ProgressArgs> = {
  title: "Components/Elements/Progress",
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "primary", "success", "danger", "warning", "info"],
    },
    striped: {
      control: "boolean",
    },
    animated: {
      control: "boolean",
    },
    indeterminate: {
      control: "boolean",
    },
    showLabel: {
      control: "boolean",
    },
    labelText: {
      control: "text",
    },
  },
  args: {
    value: 60,
    size: "md",
    variant: "default",
    striped: false,
    animated: false,
    indeterminate: false,
    showLabel: false,
    labelText: "",
  },
  render: (args) => {
    const classes = [
      "progress",
      args.size !== "md" ? `progress-${args.size}` : "",
      args.variant !== "default" ? `progress-${args.variant}` : "",
      args.striped ? "progress-striped" : "",
      args.striped && args.animated ? "progress-animated" : "",
      args.indeterminate ? "progress-indeterminate" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const labelContent = args.labelText || `${args.value}%`;
    const progressValue = args.indeterminate
      ? ""
      : `style="width: ${args.value}%"`;

    return `
      <div class="${classes}">
        <div class="progress-bar" ${progressValue}>
          ${args.showLabel ? `<span class="progress-label">${labelContent}</span>` : ""}
        </div>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<ProgressArgs>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-sm font-medium mb-2">Small</p>
        <div class="progress progress-sm">
          <div class="progress-bar" style="width: 25%"></div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Medium (Default)</p>
        <div class="progress">
          <div class="progress-bar" style="width: 50%"></div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Large</p>
        <div class="progress progress-lg">
          <div class="progress-bar" style="width: 75%"></div>
        </div>
      </div>
    </div>
  `,
};

export const Variants: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-sm font-medium mb-2">Default</p>
        <div class="progress">
          <div class="progress-bar" style="width: 20%"></div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Primary</p>
        <div class="progress progress-primary">
          <div class="progress-bar" style="width: 35%"></div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Success</p>
        <div class="progress progress-success">
          <div class="progress-bar" style="width: 50%"></div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Danger</p>
        <div class="progress progress-danger">
          <div class="progress-bar" style="width: 65%"></div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Warning</p>
        <div class="progress progress-warning">
          <div class="progress-bar" style="width: 80%"></div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Info</p>
        <div class="progress progress-info">
          <div class="progress-bar" style="width: 95%"></div>
        </div>
      </div>
    </div>
  `,
};

export const Striped: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-sm font-medium mb-2">Striped</p>
        <div class="progress progress-striped">
          <div class="progress-bar" style="width: 40%"></div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Striped Animated</p>
        <div class="progress progress-striped progress-animated">
          <div class="progress-bar" style="width: 60%"></div>
        </div>
      </div>
    </div>
  `,
};

export const WithLabels: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-sm font-medium mb-2">Progress with percentage</p>
        <div class="progress progress-lg progress-primary">
          <div class="progress-bar" style="width: 45%">
            <span class="progress-label">45%</span>
          </div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Progress with custom text</p>
        <div class="progress progress-lg progress-success">
          <div class="progress-bar" style="width: 75%">
            <span class="progress-label">Loading...</span>
          </div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Striped with label</p>
        <div class="progress progress-lg progress-warning progress-striped progress-animated">
          <div class="progress-bar" style="width: 90%">
            <span class="progress-label">90% Complete</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const Indeterminate: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-sm font-medium mb-2">Indeterminate Progress (Loading State)</p>
        <div class="progress progress-indeterminate">
          <div class="progress-bar"></div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Indeterminate with Color</p>
        <div class="progress progress-primary progress-indeterminate">
          <div class="progress-bar"></div>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">Large Indeterminate</p>
        <div class="progress progress-lg progress-danger progress-indeterminate">
          <div class="progress-bar"></div>
        </div>
      </div>
    </div>
  `,
};

export const MoreExamples: Story = {
  render: () => `
    <div class="flex flex-col gap-6">
      <div>
        <div class="flex justify-between mb-2">
          <span class="text-sm font-medium">File Upload Progress</span>
          <span class="text-sm">78%</span>
        </div>
        <div class="progress progress-lg progress-primary progress-striped progress-animated">
          <div class="progress-bar" style="width: 78%">
            <span class="progress-label">78% - 234MB/300MB</span>
          </div>
        </div>
      </div>

      <div>
        <div class="flex justify-between mb-2">
          <span class="text-sm font-medium">System Health</span>
          <span class="text-sm text-green-600">Good</span>
        </div>
        <div class="progress progress-success">
          <div class="progress-bar" style="width: 92%"></div>
        </div>
      </div>

      <div>
        <div class="flex justify-between mb-2">
          <span class="text-sm font-medium">Storage Usage</span>
          <span class="text-sm text-orange-600">Warning</span>
        </div>
        <div class="progress progress-warning">
          <div class="progress-bar" style="width: 85%"></div>
        </div>
      </div>

      <div>
        <div class="flex justify-between mb-2">
          <span class="text-sm font-medium">Processing...</span>
        </div>
        <div class="progress progress-info progress-indeterminate">
          <div class="progress-bar"></div>
        </div>
      </div>
    </div>
  `,
};
