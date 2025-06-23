import { Meta, StoryObj } from "@storybook/html-vite";

// Extend Window interface for cleanup functions
declare global {
  interface Window {
    __modalCleanups?: (() => void)[];
  }
}

// Helper function to portal modals to body in Storybook
function setupModalPortal() {
  // Check if we're in Storybook iframe
  if (typeof window !== "undefined" && window.parent !== window) {
    let observer: MutationObserver | null = null;

    const handleModalPortal = () => {
      // Find all modals currently in the DOM
      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => {
        // Only move modals that are not already in body and not already processed
        if (
          modal.parentElement !== document.body &&
          !modal.hasAttribute("data-portaled")
        ) {
          modal.setAttribute("data-portaled", "true");
          document.body.appendChild(modal);
        }
      });
    };

    // Initial check
    setTimeout(handleModalPortal, 0);

    // Set up observer for dynamic content
    observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (
              element.classList?.contains("modal") ||
              element.querySelector?.(".modal")
            ) {
              shouldCheck = true;
            }
          }
        });
      });

      if (shouldCheck) {
        setTimeout(handleModalPortal, 0);
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
      // Remove portaled modals
      document.querySelectorAll(".modal[data-portaled]").forEach((modal) => {
        modal.remove();
      });
    };
  }
  return () => {};
}

const meta: Meta = {
  title: "Components/Overlays/Modal",
  // tags: ["!autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
The Modal component provides an accessible, focus-trapped dialog overlay for displaying content above the main page.

## Features
- **Accessible**: Includes proper ARIA attributes and focus management
- **Keyboard Navigation**: Supports ESC key to close
- **Focus Trap**: Keeps focus within the modal while open
- **Multiple Sizes**: Small, medium, large, extra-large, and full-width variants
- **Backdrop Click**: Click outside to close (can be configured)
- **Nested Support**: Multiple modals can be opened simultaneously
- **Animation**: Smooth fade and scale animations

## Usage
- Use \`data-modal\` attribute on triggers to specify target modal ID
- Use \`data-modal-close\` attribute on elements to close the modal
- Modal automatically manages focus and prevents body scroll
- Press ESC key to close any open modal
        `,
      },
    },
  },
  decorators: [
    (story) => {
      // Setup modal portal for Storybook
      const cleanup = setupModalPortal();

      // Cleanup on story change
      if (typeof window !== "undefined") {
        const originalStory = story();

        // Add cleanup to window for manual cleanup if needed
        if (!window.__modalCleanups) {
          window.__modalCleanups = [];
        }
        window.__modalCleanups.push(cleanup);

        return originalStory;
      }

      return story();
    },
  ],
};

export default meta;

export const BasicModal: StoryObj = {
  name: "Basic Modal",
  parameters: {
    docs: {
      description: {
        story:
          "A simple modal with header, body, and footer sections. Shows a login form as an example.",
      },
    },
  },
  render: () => {
    return `<button class="btn btn-primary" data-modal="#my-basic-modal">Open Basic Modal</button>

<div class="modal" id="my-basic-modal" aria-labelledby="my-basic-modal-title">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="my-basic-modal-title">Login</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="form-field">
          <label for="email" class="label">Email</label>
          <input type="email" id="email" name="email" class="form-control" placeholder="Enter your email" required>
        </div>
        <div class="form-field">
          <label for="password" class="label">Password</label>
          <input type="password" id="password" name="password" class="form-control" placeholder="Enter your password" required>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" data-modal-close>Cancel</button>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </div>
  </div>
</div>`;
  },
};

export const ModalSizes: StoryObj = {
  name: "Modal Sizes",
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates different modal sizes: small, medium (default), large, extra-large, and full-width.",
      },
    },
  },
  render: () => {
    return `<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button class="btn btn-primary" data-modal="#modal-sm">Small Modal</button>
  <button class="btn btn-primary" data-modal="#modal-md">Medium Modal</button>
  <button class="btn btn-primary" data-modal="#modal-lg">Large Modal</button>
  <button class="btn btn-primary" data-modal="#modal-xl">Extra Large Modal</button>
  <button class="btn btn-primary" data-modal="#modal-full">Full Width Modal</button>
</div>

<!-- Small Modal -->
<div class="modal" id="modal-sm" aria-labelledby="modal-sm-title">
  <div class="modal-content modal-sm">
    <div class="modal-header">
      <h3 class="modal-title" id="modal-sm-title">Small Modal</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <p>This is a small modal (300px max-width). Perfect for simple confirmations or alerts.</p>
    </div>
  </div>
</div>

<!-- Medium Modal -->
<div class="modal" id="modal-md" aria-labelledby="modal-md-title">
  <div class="modal-content modal-md">
    <div class="modal-header">
      <h3 class="modal-title" id="modal-md-title">Medium Modal</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <p>This is a medium modal (500px max-width). This is the default size, ideal for forms and general content.</p>
    </div>
  </div>
</div>

<!-- Large Modal -->
<div class="modal" id="modal-lg" aria-labelledby="modal-lg-title">
  <div class="modal-content modal-lg">
    <div class="modal-header">
      <h3 class="modal-title" id="modal-lg-title">Large Modal</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <p>This is a large modal (800px max-width). Great for detailed forms, data tables, or rich content.</p>
    </div>
  </div>
</div>

<!-- Extra Large Modal -->
<div class="modal" id="modal-xl" aria-labelledby="modal-xl-title">
  <div class="modal-content modal-xl">
    <div class="modal-header">
      <h3 class="modal-title" id="modal-xl-title">Extra Large Modal</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <p>This is an extra large modal (1200px max-width). Perfect for dashboards, complex interfaces, or media galleries.</p>
    </div>
  </div>
</div>

<!-- Full Width Modal -->
<div class="modal" id="modal-full" aria-labelledby="modal-full-title">
  <div class="modal-content modal-full">
    <div class="modal-header">
      <h3 class="modal-title" id="modal-full-title">Full Width Modal</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <p>This is a full-width modal (calc(100% - 2rem) max-width). Takes up almost the entire viewport width with small margins.</p>
    </div>
  </div>
</div>`;
  },
};

export const ConfirmationModal: StoryObj = {
  name: "Confirmation Modal",
  parameters: {
    docs: {
      description: {
        story:
          "A destructive action confirmation modal with prominent action buttons.",
      },
    },
  },
  render: () => {
    return `<button class="btn btn-outline btn-error" data-modal="#my-confirmation-modal">Delete Account</button>

<div class="modal" id="my-confirmation-modal" aria-labelledby="my-confirmation-modal-title">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="my-confirmation-modal-title">Confirm Deletion</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" data-modal-close>Cancel</button>
      <button type="button" class="btn btn-error">Delete Account</button>
    </div>
  </div>
</div>`;
  },
};

export const ModalWithoutFooter: StoryObj = {
  name: "Modal Without Footer",
  parameters: {
    docs: {
      description: {
        story:
          "A modal that only contains header and body sections, without a footer.",
      },
    },
  },
  render: () => {
    return `<button class="btn btn-primary" data-modal="#no-footer-modal">Open Modal</button>

<div class="modal" id="no-footer-modal" aria-labelledby="no-footer-modal-title">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="no-footer-modal-title">Information</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <p>This modal doesn't have a footer section. You can close it using the X button, clicking outside, or pressing the ESC key.</p>
      <p>This pattern is useful for informational content that doesn't require specific actions.</p>
    </div>
  </div>
</div>`;
  },
};

export const ModalWithForm: StoryObj = {
  name: "Modal with Form",
  parameters: {
    docs: {
      description: {
        story:
          "A comprehensive form modal showing various form elements and validation states.",
      },
    },
  },
  render: () => {
    return `<button class="btn btn-primary" data-modal="#form-modal">Create User</button>

<div class="modal" id="form-modal" aria-labelledby="form-modal-title">
  <div class="modal-content modal-lg">
    <div class="modal-header">
      <h3 class="modal-title" id="form-modal-title">Create New User</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <form id="user-form">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-field">
            <label for="first-name" class="label">First Name</label>
            <input type="text" id="first-name" name="firstName" class="form-control" placeholder="John" required>
          </div>
          <div class="form-field">
            <label for="last-name" class="label">Last Name</label>
            <input type="text" id="last-name" name="lastName" class="form-control" placeholder="Doe" required>
          </div>
        </div>
        
        <div class="form-field">
          <label for="user-email" class="label">Email Address</label>
          <input type="email" id="user-email" name="email" class="form-control" placeholder="john.doe@example.com" required>
        </div>
        
        <div class="form-field">
          <label for="user-role" class="label">Role</label>
          <select id="user-role" name="role" class="form-control" required>
            <option value="">Select a role</option>
            <option value="admin">Administrator</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
        
        <div class="form-field">
          <label for="user-bio" class="label">Bio</label>
          <textarea id="user-bio" name="bio" class="form-control" rows="3" placeholder="Tell us about yourself..."></textarea>
        </div>
        
        <div class="form-field">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="notifications" name="notifications" checked>
            <label class="label" for="notifications">Send welcome email</label>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" data-modal-close>Cancel</button>
      <button type="submit" form="user-form" class="btn btn-primary">Create User</button>
    </div>
  </div>
</div>`;
  },
};

export const NestedModals: StoryObj = {
  name: "Nested Modals",
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates opening multiple modals on top of each other. Each modal maintains its own focus trap.",
      },
    },
  },
  render: () => {
    return `<button class="btn btn-primary" data-modal="#modal-1">Open First Modal</button>

<div class="modal" id="modal-1" aria-labelledby="modal-1-title">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="modal-1-title">First Modal</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <p>This is the first modal. You can open another modal from here.</p>
      <button class="btn btn-primary" data-modal="#modal-2">Open Second Modal</button>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" data-modal-close>Close</button>
    </div>
  </div>
</div>

<div class="modal" id="modal-2" aria-labelledby="modal-2-title">
  <div class="modal-content modal-sm">
    <div class="modal-header">
      <h3 class="modal-title" id="modal-2-title">Second Modal</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <p>This is the second modal, opened on top of the first one.</p>
      <button class="btn btn-primary" data-modal="#modal-3">Open Third Modal</button>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" data-modal-close>Close</button>
    </div>
  </div>
</div>

<div class="modal" id="modal-3" aria-labelledby="modal-3-title">
  <div class="modal-content modal-sm">
    <div class="modal-header">
      <h3 class="modal-title" id="modal-3-title">Third Modal</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <p>This is the third modal! Press ESC to close all modals at once.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" data-modal-close>Close</button>
    </div>
  </div>
</div>`;
  },
};

export const ModalWithScrollableContent: StoryObj = {
  name: "Modal with Scrollable Content",
  parameters: {
    docs: {
      description: {
        story:
          "A modal with long content that demonstrates scrollable behavior within the modal body.",
      },
    },
  },
  render: () => {
    return `<button class="btn btn-primary" data-modal="#scrollable-modal">Open Scrollable Modal</button>

<div class="modal" id="scrollable-modal" aria-labelledby="scrollable-modal-title">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="scrollable-modal-title">Terms and Conditions</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body" style="max-height: 400px; overflow-y: auto;">
      <h4>1. Introduction</h4>
      <p>These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions.</p>
      
      <h4>2. User Accounts</h4>
      <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for any activities that occur under your account.</p>
      
      <h4>3. Privacy Policy</h4>
      <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service.</p>
      
      <h4>4. Prohibited Uses</h4>
      <p>You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, or laws.</p>
      
      <h4>5. Content</h4>
      <p>Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service.</p>
      
      <h4>6. Intellectual Property Rights</h4>
      <p>The service and its original content, features, and functionality are and will remain the exclusive property of our company and its licensors.</p>
      
      <h4>7. Termination</h4>
      <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the terms.</p>
      
      <h4>8. Limitation of Liability</h4>
      <p>In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
      
      <h4>9. Governing Law</h4>
      <p>These terms shall be interpreted and defined in accordance with the laws of the jurisdiction in which our company is based.</p>
      
      <h4>10. Changes to Terms</h4>
      <p>We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" data-modal-close>Decline</button>
      <button type="button" class="btn btn-primary" data-modal-close>Accept Terms</button>
    </div>
  </div>
</div>`;
  },
};

export const ModalWithComplexContent: StoryObj = {
  name: "Modal with Complex Content",
  parameters: {
    docs: {
      description: {
        story:
          "A modal showcasing complex content including tabs, tables, and interactive elements.",
      },
    },
  },
  render: () => {
    return `<button class="btn btn-primary" data-modal="#complex-modal">View User Details</button>

<div class="modal" id="complex-modal" aria-labelledby="complex-modal-title">
  <div class="modal-content modal-xl">
    <div class="modal-header">
      <h3 class="modal-title" id="complex-modal-title">User Details - John Doe</h3>
      <button type="button" class="btn btn-icon btn-ghost" aria-label="Close" data-modal-close>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
        <div class="content">
          <bl-tabs class="-mt-4">
            <bl-tab-list>
              <bl-tab href="#tab1">Overview</bl-tab>
              <bl-tab href="#tab2">Recent Activity</bl-tab>
              <bl-tab href="#tab3">Team Access</bl-tab>
            </bl-tab-list>
            <bl-tab-panel id="tab1">
              <div class="grid grid-cols-2 gap-4">
                <div class="card card-body">
                  <h5 class="mb-2 card-title">Contact Information</h5>
                  <p class="mb-1"><strong>Email:</strong> john.doe@example.com</p>
                  <p class="mb-1"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p class="mb-1"><strong>Location:</strong> San Francisco, CA</p>
                </div>
                
                <div class="card card-body">
                  <h5 class="mb-2 card-title">Account Status</h5>
                  <p class="mb-1"><span class="badge badge-success">Active</span></p>
                  <p class="mb-1"><strong>Joined:</strong> March 15, 2023</p>
                  <p class="mb-1"><strong>Last Login:</strong> 2 hours ago</p>
                </div>
              </div>

              <h5 class="mt-4 mb-2">Recent Projects</h5>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Website Redesign</td>
                    <td><span class="badge badge-primary">In Progress</span></td>
                    <td>75%</td>
                    <td>2 hours ago</td>
                  </tr>
                  <tr>
                    <td>Mobile App</td>
                    <td><span class="badge badge-success">Completed</span></td>
                    <td>100%</td>
                    <td>1 day ago</td>
                  </tr>
                  <tr>
                    <td>API Documentation</td>
                    <td><span class="badge badge-warning">Review</span></td>
                    <td>90%</td>
                    <td>3 days ago</td>
                  </tr>
                </tbody>
              </table>
            </bl-tab-panel>
            <bl-tab-panel id="tab2">
              <h2>Recent Activity</h2>
            </bl-tab-panel>
            <bl-tab-panel id="tab3">
              <h2>Team Access</h2>
            </bl-tab-panel>
          </bl-tabs>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" data-modal-close>Close</button>
        <button type="button" class="btn btn-primary">Edit User</button>
      </div>
    </div>
  </div>
</div>`;
  },
};
