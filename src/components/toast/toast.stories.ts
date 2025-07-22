import type { Meta, StoryObj } from "@storybook/html-vite";
import { ToastOptions } from "./toast";

type ToastArgs = ToastOptions & {
  showToast?: boolean;
};

const meta: Meta<ToastArgs> = {
  title: "Components/Overlays/Toast",
  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "success", "danger", "warning"],
    },
    placement: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
    duration: {
      control: "number",
      description: "Duration in milliseconds (0 = no auto-dismiss)",
    },
    closeable: {
      control: "boolean",
    },
  },
  args: {
    title: "Toast Notification",
    description: "This is a toast message",
    variant: "default",
    placement: "top-right",
    duration: 5000,
    closeable: true,
  },
  render: (args) => {
    return `
      <div class="flex flex-col gap-4">
        <div>
          <h3 class="text-lg font-semibold mb-2">Interactive Toast Demo</h3>
          <button 
            class="btn btn-primary"
            onclick="Toast.show({
              title: '${args.title}',
              description: '${args.description}',
              variant: '${args.variant}',
              placement: '${args.placement}',
              duration: ${args.duration},
              closeable: ${args.closeable}
            })"
          >
            Show Toast
          </button>
        </div>
        
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Use the controls to customize the toast and click the button to show it.
          </p>
        </div>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<ToastArgs>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold mb-2">Toast Variants</h3>
      <div class="flex flex-wrap gap-2">
        <button 
          class="btn"
          onclick="Toast.show({
            title: 'Default Toast',
            description: 'This is a default toast message',
            variant: 'default'
          })"
        >
          Default
        </button>
        
        <button 
          class="btn btn-primary"
          onclick="Toast.primary('Primary Toast', 'This is a primary toast message')"
        >
          Primary
        </button>
        
        <button 
          class="btn btn-success"
          onclick="Toast.success('Success!', 'Your action was completed successfully')"
        >
          Success
        </button>
        
        <button 
          class="btn btn-danger"
          onclick="Toast.danger('danger!', 'Something went wrong')"
        >
          Error
        </button>
        
        <button 
          class="btn btn-warning"
          onclick="Toast.warning('Warning!', 'Please be careful')"
        >
          Warning
        </button>
      </div>
    </div>
  `,
};

export const Placements: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold mb-2">Toast Placements</h3>
      <div class="grid grid-cols-3 gap-2 max-w-2xl">
        <button 
          class="btn btn-sm"
          onclick="Toast.show({
            title: 'Top Left',
            placement: 'top-left'
          })"
        >
          Top Left
        </button>
        
        <button 
          class="btn btn-sm"
          onclick="Toast.show({
            title: 'Top Center',
            placement: 'top-center'
          })"
        >
          Top Center
        </button>
        
        <button 
          class="btn btn-sm"
          onclick="Toast.show({
            title: 'Top Right',
            placement: 'top-right'
          })"
        >
          Top Right
        </button>
        
        <button 
          class="btn btn-sm"
          onclick="Toast.show({
            title: 'Bottom Left',
            placement: 'bottom-left'
          })"
        >
          Bottom Left
        </button>
        
        <button 
          class="btn btn-sm"
          onclick="Toast.show({
            title: 'Bottom Center',
            placement: 'bottom-center'
          })"
        >
          Bottom Center
        </button>
        
        <button 
          class="btn btn-sm"
          onclick="Toast.show({
            title: 'Bottom Right',
            placement: 'bottom-right'
          })"
        >
          Bottom Right
        </button>
      </div>
    </div>
  `,
};

export const Durations: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold mb-2">Toast Durations</h3>
      <div class="flex flex-wrap gap-2">
        <button 
          class="btn"
          onclick="Toast.show({
            title: 'Quick Toast (2s)',
            description: 'This will disappear in 2 seconds',
            duration: 2000
          })"
        >
          2 seconds
        </button>
        
        <button 
          class="btn"
          onclick="Toast.show({
            title: 'Normal Toast (5s)',
            description: 'This will disappear in 5 seconds',
            duration: 5000
          })"
        >
          5 seconds
        </button>
        
        <button 
          class="btn"
          onclick="Toast.show({
            title: 'Long Toast (10s)',
            description: 'This will disappear in 10 seconds',
            duration: 10000
          })"
        >
          10 seconds
        </button>
        
        <button 
          class="btn"
          onclick="Toast.show({
            title: 'Persistent Toast',
            description: 'This toast will stay until you close it',
            duration: 0,
            closeable: true
          })"
        >
          No auto-dismiss
        </button>
      </div>
    </div>
  `,
};

export const MultipleToasts: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold mb-2">Multiple Toasts</h3>
      <div class="flex flex-wrap gap-2">
        <button 
          class="btn btn-primary"
          onclick="
            Toast.success('First Toast', 'This is the first toast');
            setTimeout(() => Toast.warning('Second Toast', 'This is the second toast'), 500);
            setTimeout(() => Toast.danger('Third Toast', 'This is the third toast'), 1000);
          "
        >
          Show Multiple Toasts
        </button>
        
        <button 
          class="btn btn-danger"
          onclick="Toast.dismissAll()"
        >
          Dismiss All
        </button>
      </div>
    </div>
  `,
};

export const RealWorldExamples: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold mb-2">Real World Examples</h3>
      <div class="flex flex-wrap gap-2">
        <button 
          class="btn btn-success"
          onclick="Toast.success('Saved!', 'Your changes have been saved successfully.')"
        >
          Save Success
        </button>
        
        <button 
          class="btn btn-danger"
          onclick="Toast.danger('Connection Failed', 'Unable to connect to the server. Please check your internet connection.')"
        >
          Network Error
        </button>
        
        <button 
          class="btn btn-warning"
          onclick="Toast.warning('Low Storage', 'You are running low on storage space.')"
        >
          Storage Warning
        </button>
        
        <button 
          class="btn btn-primary"
          onclick="Toast.show({
            title: 'Update Available',
            description: 'A new version is available. Click to update now.',
            variant: 'primary',
            duration: 0,
            closeable: true
          })"
        >
          Update Notification
        </button>
      </div>
    </div>
  `,
};

export const WithoutDescription: Story = {
  render: () => `
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold mb-2">Toasts Without Description</h3>
      <div class="flex flex-wrap gap-2">
        <button 
          class="btn"
          onclick="Toast.show({ title: 'Simple notification' })"
        >
          Default
        </button>
        
        <button 
          class="btn btn-success"
          onclick="Toast.success('Saved!')"
        >
          Success
        </button>
        
        <button 
          class="btn btn-danger"
          onclick="Toast.danger('Failed!')"
        >
          Error
        </button>
      </div>
    </div>
  `,
};
