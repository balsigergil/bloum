export function preventBodyScroll() {
  // Trick to hide scrollbar and prevent page shift
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
}

export function allowBodyScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}
