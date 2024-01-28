import "../../src";
import "../../src/style.css";
import "../../src/modern.css";
import "./example.css";

document.querySelectorAll("form").forEach((f) =>
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData);
  }),
);

document.getElementById("light")?.addEventListener("click", () => {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
  document
    .querySelector("meta[name='color-scheme']")
    ?.setAttribute("content", "light");
});

document.getElementById("dark")?.addEventListener("click", () => {
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");

  document
    .querySelector("meta[name='color-scheme']")
    ?.setAttribute("content", "dark");
});
