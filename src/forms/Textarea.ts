export class Textarea extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<textarea class="form-textarea"></textarea>`;
  }
}
