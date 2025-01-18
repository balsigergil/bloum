document.addEventListener("click", (e) => {
  let target = e.target as HTMLElement | null;
  if (!target) {
    return;
  }

  target = target.closest("[data-sidebar]");
  if (!target || !target.dataset.sidebar) {
    return;
  }

  const sidebarSelector = target.dataset.sidebar;
  const sidebar = document.querySelector(sidebarSelector);
  if (!sidebar) {
    return;
  }

  sidebar.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement | null;
  if (!target) {
    return;
  }

  if (target.classList.contains("sidebar")) {
    target.classList.add("hide");
    target.addEventListener(
      "animationend",
      () => {
        target.classList.remove("show");
        target.classList.remove("hide");
      },
      { once: true },
    );
  }
});
