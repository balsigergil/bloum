import type { Meta, StoryObj } from "@storybook/html-vite";

type TimelineArgs = {
  size: "sm" | "md" | "lg";
  showIcons: boolean;
};

const meta: Meta<TimelineArgs> = {
  title: "Components/Elements/Timeline",
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showIcons: {
      control: "boolean",
    },
  },
  args: {
    size: "md",
    showIcons: false,
  },
  render: (args) => {
    const classes = [
      "timeline",
      args.size !== "md" ? `timeline-${args.size}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    const timelineEvents = [
      {
        date: "15th March 2024",
        title: "Application Submitted",
        description:
          "Your job application has been successfully submitted to the system.",
        icon: "fa-paper-plane",
        state: "completed",
      },
      {
        date: "18th March 2024",
        title: "Under Review",
        description:
          "Your application is currently being reviewed by our hiring team.",
        icon: "fa-search",
        state: "active",
      },
      {
        date: "22nd March 2024",
        title: "Interview Scheduled",
        description: "We would like to invite you for an interview next week.",
        icon: "fa-calendar-check",
        state: "",
      },
    ];

    const eventsHtml = timelineEvents
      .map((event) => {
        const itemClass = event.state ? `timeline-item-${event.state}` : "";

        return `
          <div class="timeline-item ${itemClass}">
            <div class="timeline-indicator">
              ${args.showIcons && event.icon ? `<i class="fas ${event.icon}"></i>` : ""}
            </div>
            <div class="timeline-content">
              <div class="timeline-title">${event.title}</div>
              <div class="timeline-date">${event.date}</div>
              <div class="timeline-description">${event.description}</div>
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <div class="${classes}">
        ${eventsHtml}
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<TimelineArgs>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    showIcons: true,
  },
};

export const Sizes: Story = {
  render: () => `
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="text-sm font-semibold mb-4">Small</h3>
        <div class="timeline timeline-sm">
          <div class="timeline-item timeline-item-completed">
            <div class="timeline-indicator"></div>
            <div class="timeline-content">
              <div class="timeline-title">Task Completed</div>
              <div class="timeline-date">2 hours ago</div>
              <div class="timeline-description">The assigned task has been completed successfully.</div>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-indicator"></div>
            <div class="timeline-content">
              <div class="timeline-title">Meeting Scheduled</div>
              <div class="timeline-date">Yesterday</div>
              <div class="timeline-description">Team meeting scheduled for project review.</div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-4">Medium (Default)</h3>
        <div class="timeline">
          <div class="timeline-item timeline-item-completed">
            <div class="timeline-indicator"></div>
            <div class="timeline-content">
              <div class="timeline-title">Task Completed</div>
              <div class="timeline-date">2 hours ago</div>
              <div class="timeline-description">The assigned task has been completed successfully.</div>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-indicator"></div>
            <div class="timeline-content">
              <div class="timeline-title">Meeting Scheduled</div>
              <div class="timeline-date">Yesterday</div>
              <div class="timeline-description">Team meeting scheduled for project review.</div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-4">Large</h3>
        <div class="timeline timeline-lg">
          <div class="timeline-item timeline-item-completed">
            <div class="timeline-indicator"></div>
            <div class="timeline-content">
              <div class="timeline-title">Task Completed</div>
              <div class="timeline-date">2 hours ago</div>
              <div class="timeline-description">The assigned task has been completed successfully.</div>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-indicator"></div>
            <div class="timeline-content">
              <div class="timeline-title">Meeting Scheduled</div>
              <div class="timeline-date">Yesterday</div>
              <div class="timeline-description">Team meeting scheduled for project review.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const ProjectTimeline: Story = {
  render: () => `
    <div class="timeline">
      <div class="timeline-item timeline-item-completed">
        <div class="timeline-indicator">
          <i class="fas fa-check"></i>
        </div>
        <div class="timeline-content">
          <div class="timeline-title">Project Kickoff</div>
          <div class="timeline-date">January 2024</div>
          <div class="timeline-description">Initial meeting with stakeholders to define project scope and requirements.</div>
        </div>
      </div>
      
      <div class="timeline-item timeline-item-completed">
        <div class="timeline-indicator">
          <i class="fas fa-code"></i>
        </div>
        <div class="timeline-content">
          <div class="timeline-title">Development Started</div>
          <div class="timeline-date">February 2024</div>
          <div class="timeline-description">Development team began working on core features and infrastructure.</div>
        </div>
      </div>
      
      <div class="timeline-item timeline-item-active">
        <div class="timeline-indicator">
          <i class="fas fa-flask"></i>
        </div>
        <div class="timeline-content">
          <div class="timeline-title">Testing Phase</div>
          <div class="timeline-date">March 2024</div>
          <div class="timeline-description">Currently conducting comprehensive testing of all features.</div>
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-indicator">
          <i class="fas fa-rocket"></i>
        </div>
        <div class="timeline-content">
          <div class="timeline-title">Launch</div>
          <div class="timeline-date">April 2024</div>
          <div class="timeline-description">Planned release date for the production version.</div>
        </div>
      </div>
    </div>
  `,
};
