function updateStepConnectors() {
  const stepsContainers = document.querySelectorAll(".steps");

  stepsContainers.forEach((stepsContainer) => {
    const steps = Array.from(stepsContainer.querySelectorAll(".step"));

    // Remove existing last-in-row classes
    steps.forEach((step) => step.classList.remove("last-in-row"));

    // Get container width and step positions
    let currentRowTop: number | null = null;
    let currentRowSteps: HTMLElement[] = [];

    steps.forEach((step, index) => {
      const stepRect = step.getBoundingClientRect();
      const stepTop = Math.round(stepRect.top);

      // If this is a new row or the first step
      if (currentRowTop === null || stepTop > currentRowTop) {
        // Mark the last step of the previous row
        if (currentRowSteps.length > 0) {
          currentRowSteps[currentRowSteps.length - 1].classList.add(
            "last-in-row",
          );
        }

        // Start tracking new row
        currentRowTop = stepTop;
        currentRowSteps = [step as HTMLElement];
      } else {
        // Same row
        currentRowSteps.push(step as HTMLElement);
      }

      // Handle the last step
      if (index === steps.length - 1 && currentRowSteps.length > 0) {
        currentRowSteps[currentRowSteps.length - 1].classList.add(
          "last-in-row",
        );
      }
    });
  });
}

export function initSteps() {
  updateStepConnectors();
  window.addEventListener("resize", updateStepConnectors);
}
