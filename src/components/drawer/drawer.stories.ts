import { Meta, StoryObj } from "@storybook/html-vite";

// Extend Window interface for cleanup functions
declare global {
  interface Window {
    __drawerCleanups?: (() => void)[];
  }
}

// Helper function to portal drawers to body in Storybook
function setupDrawerPortal() {
  // Check if we're in Storybook iframe
  if (typeof window !== "undefined" && window.parent !== window) {
    let observer: MutationObserver | null = null;

    const handleDrawerPortal = () => {
      // Find all drawers currently in the DOM
      const drawers = document.querySelectorAll(".drawer");
      drawers.forEach((drawer) => {
        // Only move drawers that are not already in body and not already processed
        if (
          drawer.parentElement !== document.body &&
          !drawer.hasAttribute("data-portaled")
        ) {
          drawer.setAttribute("data-portaled", "true");
          document.body.appendChild(drawer);
        }
      });
    };

    // Initial check
    setTimeout(handleDrawerPortal, 0);

    // Set up observer for dynamic content
    observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (
              element.classList?.contains("drawer") ||
              element.querySelector?.(".drawer")
            ) {
              shouldCheck = true;
            }
          }
        });
      });

      if (shouldCheck) {
        setTimeout(handleDrawerPortal, 0);
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
      }
      // Remove portaled drawers
      document.querySelectorAll(".drawer[data-portaled]").forEach((drawer) => {
        drawer.remove();
      });
    };
  }
  return () => {};
}

const meta: Meta = {
  title: "Components/Overlays/Drawer",
  parameters: {
    docs: {
      description: {
        component: `
The Drawer component provides a slide-out panel that appears from the left or right side of the screen, perfect for navigation, settings, or contextual content.

## Features
- **Accessible**: Includes proper ARIA attributes and focus management
- **Keyboard Navigation**: Supports ESC key to close
- **Focus Trap**: Keeps focus within the drawer while open
- **Multiple Sizes**: Small, medium, and large width variants
- **Position**: Can slide in from right (default) or left side
- **Backdrop Click**: Click outside to close
- **Dimmed Background**: Background is dimmed but not blurred
- **Animation**: Smooth slide-in and slide-out animations

## Usage
- Use \`data-drawer\` attribute on triggers to specify target drawer ID
- Use \`data-drawer-close\` attribute on elements to close the drawer
- Add \`drawer-left\` class to position drawer on the left side
- Add size classes (\`drawer-sm\`, \`drawer-md\`, \`drawer-lg\`) to drawer content
- Press ESC key to close any open drawer
        `,
      },
    },
  },
  decorators: [
    (story) => {
      // Setup drawer portal for Storybook
      const cleanup = setupDrawerPortal();

      // Cleanup on story change
      if (typeof window !== "undefined") {
        const originalStory = story();

        // Add cleanup to window for manual cleanup if needed
        if (!window.__drawerCleanups) {
          window.__drawerCleanups = [];
        }
        window.__drawerCleanups.push(cleanup);

        return originalStory;
      }

      return story();
    },
  ],
};

export default meta;

export const BasicDrawer: StoryObj = {
  name: "Basic Drawer",
  parameters: {
    docs: {
      description: {
        story:
          "A simple drawer that slides in from the right side with header, body, and footer sections.",
      },
    },
  },
  render: () => {
    return `<button class="btn btn-primary" data-drawer="#basic-drawer">Open Drawer</button>

<div class="drawer" id="basic-drawer" aria-labelledby="basic-drawer-title" aria-hidden="true">
  <div class="drawer-content">
    <div class="drawer-header">
      <h3 class="drawer-title" id="basic-drawer-title">Navigation</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-drawer-close>
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="drawer-body">
      <nav>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 0.5rem;">
            <a href="#" class="btn btn-ghost" style="width: 100%; justify-content: flex-start;">
              <i class="fa-solid fa-house" style="margin-right: 0.5rem;"></i>
              Home
            </a>
          </li>
          <li style="margin-bottom: 0.5rem;">
            <a href="#" class="btn btn-ghost" style="width: 100%; justify-content: flex-start;">
              <i class="fa-solid fa-clipboard" style="margin-right: 0.5rem;"></i>
              Projects
            </a>
          </li>
          <li style="margin-bottom: 0.5rem;">
            <a href="#" class="btn btn-ghost" style="width: 100%; justify-content: flex-start;">
              <i class="fa-solid fa-user" style="margin-right: 0.5rem;"></i>
              Profile
            </a>
          </li>
          <li style="margin-bottom: 0.5rem;">
            <a href="#" class="btn btn-ghost" style="width: 100%; justify-content: flex-start;">
              <i class="fa-solid fa-gear" style="margin-right: 0.5rem;"></i>
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="drawer-footer">
      <button type="button" class="btn btn-outline" data-drawer-close>Close</button>
    </div>
  </div>
</div>`;
  },
};

export const DrawerSizes: StoryObj = {
  name: "Drawer Sizes",
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates different drawer sizes: small (300px), medium (400px), and large (500px).",
      },
    },
  },
  render: () => {
    return `<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button class="btn btn-primary" data-drawer="#drawer-sm">Small Drawer</button>
  <button class="btn btn-primary" data-drawer="#drawer-md">Medium Drawer</button>
  <button class="btn btn-primary" data-drawer="#drawer-lg">Large Drawer</button>
</div>

<!-- Small Drawer -->
<div class="drawer" id="drawer-sm" aria-labelledby="drawer-sm-title" aria-hidden="true">
  <div class="drawer-content drawer-sm">
    <div class="drawer-header">
      <h3 class="drawer-title" id="drawer-sm-title">Small Drawer</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-drawer-close>
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="drawer-body">
      <p>This is a small drawer (300px width). Perfect for simple navigation or quick actions.</p>
    </div>
  </div>
</div>

<!-- Medium Drawer -->
<div class="drawer" id="drawer-md" aria-labelledby="drawer-md-title" aria-hidden="true">
  <div class="drawer-content drawer-md">
    <div class="drawer-header">
      <h3 class="drawer-title" id="drawer-md-title">Medium Drawer</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-drawer-close>
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="drawer-body">
      <p>This is a medium drawer (400px width). This is the default size, ideal for navigation and forms.</p>
    </div>
  </div>
</div>

<!-- Large Drawer -->
<div class="drawer" id="drawer-lg" aria-labelledby="drawer-lg-title" aria-hidden="true">
  <div class="drawer-content drawer-lg">
    <div class="drawer-header">
      <h3 class="drawer-title" id="drawer-lg-title">Large Drawer</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-drawer-close>
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="drawer-body">
      <p>This is a large drawer (500px width). Great for detailed content, settings panels, or complex navigation.</p>
    </div>
  </div>
</div>`;
  },
};

export const DrawerPositions: StoryObj = {
  name: "Drawer Positions",
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates drawers that can slide in from either the right (default) or left side of the screen.",
      },
    },
  },
  render: () => {
    return `<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button class="btn btn-primary" data-drawer="#drawer-left">Left Drawer</button>
  <button class="btn btn-primary" data-drawer="#drawer-right">Right Drawer</button>
</div>

<!-- Left Drawer -->
<div class="drawer drawer-left" id="drawer-left" aria-labelledby="drawer-left-title" aria-hidden="true">
  <div class="drawer-content">
    <div class="drawer-header">
      <h3 class="drawer-title" id="drawer-left-title">Left Drawer</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-drawer-close>
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="drawer-body">
      <p>This drawer slides in from the left side of the screen. Use the <code>drawer-left</code> class to position it on the left.</p>
      <p>Left drawers are commonly used for:</p>
      <ul>
        <li>Primary navigation menus</li>
        <li>Application sidebars</li>
        <li>Filter panels</li>
      </ul>
    </div>
  </div>
</div>

<!-- Right Drawer -->
<div class="drawer" id="drawer-right" aria-labelledby="drawer-right-title" aria-hidden="true">
  <div class="drawer-content">
    <div class="drawer-header">
      <h3 class="drawer-title" id="drawer-right-title">Right Drawer</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-drawer-close>
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="drawer-body">
      <p>This drawer slides in from the right side of the screen. This is the default position.</p>
      <p>Right drawers are commonly used for:</p>
      <ul>
        <li>Shopping cart contents</li>
        <li>User profile panels</li>
        <li>Settings and preferences</li>
        <li>Contextual actions</li>
      </ul>
    </div>
  </div>
</div>`;
  },
};

export const DrawerWithForm: StoryObj = {
  name: "Drawer with Form",
  parameters: {
    docs: {
      description: {
        story:
          "A drawer containing a form, demonstrating how to use drawers for data entry and settings.",
      },
    },
  },
  render: () => {
    return `<button class="btn btn-primary" data-drawer="#form-drawer">Open Settings</button>

<div class="drawer" id="form-drawer" aria-labelledby="form-drawer-title" aria-hidden="true">
  <div class="drawer-content drawer-lg">
    <div class="drawer-header">
      <h3 class="drawer-title" id="form-drawer-title">User Settings</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-drawer-close>
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="drawer-body">
      <form id="settings-form">
        <div class="field">
          <label for="user-name" class="label">Display Name</label>
          <input type="text" id="user-name" name="displayName" class="input" placeholder="Enter your name" value="John Doe">
        </div>
        
        <div class="field">
          <label for="user-email" class="label">Email</label>
          <input type="email" id="user-email" name="email" class="input" placeholder="Enter your email" value="john@example.com">
        </div>
        
        <div class="field">
          <label for="user-timezone" class="label">Timezone</label>
          <select id="user-timezone" name="timezone" class="input">
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles" selected>Pacific Time</option>
          </select>
        </div>
        
        <div class="field">
          <label for="user-bio" class="label">Bio</label>
          <textarea id="user-bio" name="bio" class="input" rows="3" placeholder="Tell us about yourself...">Frontend developer with a passion for creating beautiful user experiences.</textarea>
        </div>
        
        <div class="field">
          <div class="field">
            <input type="checkbox" class="input-check" id="notifications" name="notifications" checked>
            <label class="label" for="notifications">Email notifications</label>
          </div>
        </div>
        
        <div class="field">
          <div class="field">
            <input type="checkbox" class="input-check" id="marketing" name="marketing">
            <label class="label" for="marketing">Marketing emails</label>
          </div>
        </div>
        
        <div class="field">
          <div class="field">
            <input type="checkbox" class="input-check" id="dark-mode" name="darkMode" checked>
            <label class="label" for="dark-mode">Dark mode</label>
          </div>
        </div>
      </form>
    </div>
    <div class="drawer-footer">
      <button type="button" class="btn btn-outline" data-drawer-close>Cancel</button>
      <button type="submit" form="settings-form" class="btn btn-primary">Save Settings</button>
    </div>
  </div>
</div>`;
  },
};
