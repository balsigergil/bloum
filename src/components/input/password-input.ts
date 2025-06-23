/**
 * Password input toggle functionality
 */

export function initPasswordToggle(
  container: HTMLElement | Document = document,
) {
  const passwordToggles = container.querySelectorAll(".password-toggle");

  passwordToggles.forEach((toggle) => {
    // Remove any existing listeners to prevent duplicates
    const newToggle = toggle.cloneNode(true) as HTMLElement;
    toggle.parentNode?.replaceChild(newToggle, toggle);

    newToggle.addEventListener("click", (e) => {
      e.preventDefault();

      const passwordInput = newToggle.parentElement?.querySelector(
        ".input",
      ) as HTMLInputElement;
      if (!passwordInput) return;

      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";

      // Update icon
      const icon = newToggle.querySelector("i");
      if (icon) {
        if (isPassword) {
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }

      // Update aria-label for accessibility
      newToggle.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password",
      );

      // Keep focus on the toggle button
      newToggle.focus();
    });
  });
}
