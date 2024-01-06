import "../../src";
import "../../src/style.css";
import "../../src/modern.css";
import "./unstyled.css";

document.querySelector("#myForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  console.log(formData);
});
