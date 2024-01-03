import "@fortawesome/fontawesome-free/css/all.min.css";

import "../src/style.scss";

import "./tailwind.css";
import "./select.css";
import "../src/main.ts";

document.getElementById("myform")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
});
