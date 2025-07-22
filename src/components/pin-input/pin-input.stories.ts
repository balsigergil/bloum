import { Meta, StoryObj } from "@storybook/html-vite";

// Extend Window interface for cleanup functions
declare global {
  interface Window {
    __pinInputCleanups?: (() => void)[];
  }
}

function setupPinInputCleanup() {
  // Initialize cleanup array if it doesn't exist
  if (!window.__pinInputCleanups) {
    window.__pinInputCleanups = [];
  }

  // Cleanup function to remove all pin input containers
  const cleanup = () => {
    document
      .querySelectorAll("[data-pin-input-container]")
      .forEach((container) => {
        container.remove();
      });
    // Reset original inputs
    document.querySelectorAll("[data-pin-input]").forEach((input) => {
      const htmlInput = input as HTMLInputElement;
      htmlInput.style.display = "";
      htmlInput.setAttribute("type", "text");
    });
  };

  window.__pinInputCleanups.push(cleanup);
  return cleanup;
}

const meta: Meta = {
  title: "Components/Inputs/Pin Input",
  parameters: {
    docs: {
      description: {
        component: `
The Pin Input component is used for entering PIN codes, one-time passwords, or any other numeric codes that need to be entered digit by digit.

## Features

- **Automatic focus management**: Automatically moves to the next field when typing and to the previous field when deleting
- **Paste support**: Paste a complete code from clipboard into any field
- **Numeric only**: Restricts input to numbers only
- **Form integration**: Works seamlessly with HTML forms using a hidden input field
- **HTMX compatible**: Works with HTMX and hx-boost
- **Customizable size**: Configure the number of input fields
- **Keyboard navigation**: Support for arrow keys to navigate between fields
- **Accessibility**: Proper ARIA attributes and focus management

## Usage

Simply add the \`data-pin-input\` attribute to any input element:

\`\`\`html
<input type="text" data-pin-input data-pin-input-size="6" value="542361" />
\`\`\`

## Data Attributes

- \`data-pin-input\`: Enables the pin input functionality
- \`data-pin-input-size\`: Number of input fields (default: 6)

## CSS Classes

- \`.pin-input\`: Container for the pin input fields
- \`.pin-input-field\`: Individual input field
- \`.pin-input-error\`: Error state
- \`.pin-input-success\`: Success state
        `,
      },
    },
  },
  decorators: [
    (story) => {
      setupPinInputCleanup();
      return story();
    },
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    setTimeout(() => {
      import("./PinInput").then(({ initPinInput }) => {
        initPinInput();
      });
    }, 100);

    return `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Enter PIN Code:</label>
          <input type="text" data-pin-input data-pin-input-size="6" name="pin" />
        </div>
      </div>
    `;
  },
};

export const WithValue: Story = {
  render: () => {
    setTimeout(() => {
      import("./PinInput").then(({ initPinInput }) => {
        initPinInput();
      });
    }, 100);

    return `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">PIN with initial value:</label>
          <input type="text" data-pin-input data-pin-input-size="6" value="123456" name="pin" />
        </div>
      </div>
    `;
  },
};

export const InForm: Story = {
  render: () => {
    setTimeout(() => {
      import("./PinInput").then(({ initPinInput }) => {
        initPinInput();
      });
    }, 100);

    return `
      <form class="space-y-4" onsubmit="event.preventDefault(); alert('PIN: ' + new FormData(event.target).get('verification_code'));">
        <div>
          <label class="block text-sm font-medium mb-2">Enter verification code:</label>
          <input 
            type="text" 
            data-pin-input 
            data-pin-input-size="6" 
            name="verification_code" 
            required 
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">Your email:</label>
          <input type="email" class="input w-full" name="email" placeholder="your@email.com" />
        </div>
        
        <button type="submit" class="btn btn-primary">
          Verify Code
        </button>
      </form>
    `;
  },
};

export const WithStates: Story = {
  render: () => {
    setTimeout(() => {
      import("./PinInput").then(({ initPinInput }) => {
        initPinInput();
      });
    }, 100);

    return `
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-2">Default state:</label>
          <input type="text" data-pin-input data-pin-input-size="4" name="pin_default" />
        </div>
        
                 <div>
           <label class="block text-sm font-medium mb-2 text-red-600">Error state:</label>
           <div data-pin-input-container class="pin-input pin-input-error">
             <input type="text" class="input pin-input-field" maxlength="1" value="1" />
             <input type="text" class="input pin-input-field" maxlength="1" value="2" />
             <input type="text" class="input pin-input-field" maxlength="1" value="3" />
             <input type="text" class="input pin-input-field" maxlength="1" />
           </div>
           <p class="text-sm text-red-600 mt-1">Invalid PIN code</p>
         </div>
         
         <div>
           <label class="block text-sm font-medium mb-2 text-green-600">Success state:</label>
           <div data-pin-input-container class="pin-input pin-input-success">
             <input type="text" class="input pin-input-field" maxlength="1" value="1" />
             <input type="text" class="input pin-input-field" maxlength="1" value="2" />
             <input type="text" class="input pin-input-field" maxlength="1" value="3" />
             <input type="text" class="input pin-input-field" maxlength="1" value="4" />
           </div>
           <p class="text-sm text-green-600 mt-1">PIN code verified</p>
         </div>
      </div>
    `;
  },
};
