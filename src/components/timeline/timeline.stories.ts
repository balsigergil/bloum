import type { Meta, StoryObj } from "@storybook/html-vite";

type TimelineArgs = {
  inlineDate: boolean;
};

const meta: Meta<TimelineArgs> = {
  title: "Components/Elements/Timeline",
  argTypes: {
    inlineDate: {
      control: "boolean",
    },
  },
  args: {
    inlineDate: false,
  },
  render: (args) => {
    const timelineEvents = [
      {
        date: "15th March 2024",
        title: "Application Submitted",
        body: "Your job application has been successfully submitted.",
        icon: "fa-check",
        indicatorClass: "bg-green-600",
        state: "",
      },
      {
        date: "18th March 2024",
        title: "Application Reviewed",
        body: "Your application has been reviewed by the hiring team.",
        icon: "fa-check",
        indicatorClass: "",
        state: "completed",
      },
      {
        date: "22nd March 2024",
        title: "Interview Scheduled",
        body: "Your interview has been scheduled.",
        icon: "fa-clock",
        indicatorClass: "",
        state: "active",
      },
      {
        date: "",
        title: "Decision",
        body: "Pending",
        icon: "fa-hourglass",
        indicatorClass: "",
        state: "",
      },
    ];

    const eventsHtml = timelineEvents
      .map((event) => {
        const itemClass = event.state ? `timeline-item-${event.state}` : "";
        const indicatorClass = event.indicatorClass
          ? ` ${event.indicatorClass}`
          : "";

        const contentInner =
          args.inlineDate && event.date
            ? `
              <div class="flex items-center gap-2">
                <div class="timeline-title">${event.title}</div>
                <span class="text-gray-500">&bullet;</span>
                <div class="timeline-description">${event.date}</div>
              </div>
              <div class="timeline-body">${event.body}</div>`
            : `
              <div class="timeline-title">${event.title}</div>
              ${event.date ? `<div class="timeline-description">${event.date}</div>` : ""}
              <div class="timeline-body">${event.body}</div>`;

        return `
          <div class="timeline-item${itemClass ? ` ${itemClass}` : ""}">
            <div class="timeline-indicator${indicatorClass}">
              <i class="fas ${event.icon}"></i>
            </div>
            <div class="timeline-content">${contentInner}
            </div>
          </div>
        `;
      })
      .join("");

    return `<div class="timeline">${eventsHtml}</div>`;
  },
};

export default meta;
type Story = StoryObj<TimelineArgs>;

export const Default: Story = {};

export const InlineDate: Story = {
  args: {
    inlineDate: true,
  },
};
