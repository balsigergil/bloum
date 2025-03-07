export function initCollapse() {
  document.querySelectorAll(".collapse").forEach((collapse) => {
    const trigger = document.querySelector(`[data-collapse="#${collapse.id}"]`);
    if (!trigger) {
      return;
    }
    trigger.addEventListener("click", () => {
      collapse.classList.toggle("show");
    });
  });
}
