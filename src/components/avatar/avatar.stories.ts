import type { Meta, StoryObj } from "@storybook/html-vite";

type AvatarArgs = {
  src?: string;
  alt?: string;
  initials?: string;
  size?: string;
  variant?: string;
  showBadge?: boolean;
  badgeType?: string;
};

const meta: Meta<AvatarArgs> = {
  title: "Components/Avatar",
  argTypes: {
    src: {
      control: "text",
    },
    alt: {
      control: "text",
    },
    initials: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: ["default", "solid", "outline", "subtle"],
    },
    showBadge: {
      control: "boolean",
    },
    badgeType: {
      control: "select",
      options: ["default", "primary", "success", "error", "warning", "info"],
    },
  },
  args: {
    initials: "JD",
    size: "md",
    variant: "default",
    alt: "John Doe",
    showBadge: false,
    badgeType: "default",
  },
  render: (args) => {
    const sizeClass = args.size !== "md" ? `avatar-${args.size}` : "";
    const variantClass =
      args.variant !== "default" ? `avatar-${args.variant}` : "";
    const badgeTypeClass =
      args.showBadge && args.badgeType !== "default"
        ? `badge-${args.badgeType}`
        : "";

    const classes = ["avatar", sizeClass, variantClass]
      .filter(Boolean)
      .join(" ");

    const imageElement = args.src
      ? `<img src="${args.src}" alt="${args.alt || ""}" />`
      : "";
    const initialsElement =
      args.initials && !args.src
        ? `<span class="avatar-initials">${args.initials}</span>`
        : "";

    const badgeElement = args.showBadge
      ? `<div class="badge badge-top-right ${badgeTypeClass}">3</div>`
      : "";

    return `
      <div style="position: relative; display: inline-block;">
        <div class="${classes}">
          ${imageElement}
          ${initialsElement}
        </div>
        ${badgeElement}
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<AvatarArgs>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    alt: "John Doe",
    initials: "JD",
  },
};

export const InitialsOnly: Story = {
  args: {
    initials: "AB",
    variant: "solid",
  },
};

export const Sizes: Story = {
  render: () => `
    <div class="flex gap-4 items-center">
      <div class="avatar avatar-xs">
        <span class="avatar-initials">XS</span>
      </div>
      <div class="avatar avatar-sm">
        <span class="avatar-initials">SM</span>
      </div>
      <div class="avatar">
        <span class="avatar-initials">MD</span>
      </div>
      <div class="avatar avatar-lg">
        <span class="avatar-initials">LG</span>
      </div>
      <div class="avatar avatar-xl">
        <span class="avatar-initials">XL</span>
      </div>
    </div>
  `,
};

export const Variants: Story = {
  render: () => `
    <div class="flex gap-4 items-center">
      <div class="avatar">
        <span class="avatar-initials">AB</span>
      </div>
      <div class="avatar avatar-solid">
        <span class="avatar-initials">CD</span>
      </div>
      <div class="avatar avatar-outline">
        <span class="avatar-initials">EF</span>
      </div>
      <div class="avatar avatar-subtle">
        <span class="avatar-initials">GH</span>
      </div>
    </div>
  `,
};

export const WithImages: Story = {
  render: () => `
    <div class="flex gap-4 items-center">
      <div class="avatar avatar-sm">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="John Doe" />
      </div>
      <div class="avatar">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&fit=facearea&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Jean François" />
      </div>
      <div class="avatar avatar-lg">
        <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Mike Johnson" />
      </div>
    </div>
  `,
};

export const WithBadge: Story = {
  args: {
    showBadge: true,
    badgeType: "error",
    initials: "JD",
    variant: "solid",
  },
};

export const BadgeExamples: Story = {
  render: () => `
    <div class="flex gap-6 items-center">
      <div style="position: relative;">
        <div class="avatar avatar-solid">
          <span class="avatar-initials">AB</span>
        </div>
        <div class="badge badge-error badge-top-right badge-sm">3</div>
      </div>
      
      <div style="position: relative;">
        <div class="avatar">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&fit=facearea&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Jean François" />
        </div>
        <div class="badge badge-success badge-top-right badge-dot"></div>
      </div>
      
      <div style="position: relative;">
        <div class="avatar avatar-outline">
          <span class="avatar-initials">CD</span>
        </div>
        <div class="badge badge-primary badge-top-right badge-lg">12</div>
      </div>
      
      <div style="position: relative;">
        <div class="avatar">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="John Doe" />
        </div>
        <div class="badge badge-warning badge-top-right badge-dot badge-ping"></div>
      </div>
    </div>
  `,
};

export const JavaScriptAPI: Story = {
  render: () => `
    <div class="flex gap-4 items-center flex-wrap">
      <!-- Auto-initialized with data attributes -->
      <div 
        data-avatar 
        data-avatar-initials="JS" 
        data-avatar-variant="solid"
        data-avatar-size="sm"
      ></div>
      
      <div 
        data-avatar 
        data-avatar-src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        data-avatar-alt="John Doe"
        data-avatar-initials="JD"
      ></div>
      
      <div 
        data-avatar 
        data-avatar-initials="AB" 
        data-avatar-variant="outline"
        data-avatar-size="lg"
      ></div>
      
      <div 
        data-avatar 
        data-avatar-initials="CD" 
        data-avatar-variant="subtle"
        data-avatar-size="xl"
      ></div>
      
      <!-- This one will fallback to initials when image fails -->
      <div 
        data-avatar 
        data-avatar-src="https://invalid-image-url.com/avatar.jpg"
        data-avatar-alt="Failed Image"
        data-avatar-initials="FI"
        data-avatar-variant="solid"
      ></div>
    </div>
    
    <div class="mt-4 p-4 bg-gray-50 rounded text-sm dark:bg-gray-800">
      <p class="mb-2 font-bold">JavaScript API Usage</p>
      These avatars are initialized automatically using data attributes:<br/>
      <code>data-avatar</code> - Enables auto-initialization<br/>
      <code>data-avatar-src</code> - Image source URL<br/>
      <code>data-avatar-alt</code> - Image alt text<br/>
      <code>data-avatar-initials</code> - Fallback initials<br/>
      <code>data-avatar-size</code> - Size variant (xs, sm, md, lg, xl)<br/>
      <code>data-avatar-variant</code> - Style variant (default, solid, outline, subtle)
    </div>
  `,
};
