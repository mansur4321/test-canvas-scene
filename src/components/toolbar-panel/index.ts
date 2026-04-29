import styles from "./style.css";

class ToolbarPanel extends HTMLElement {
	private root = this.attachShadow({ mode: "open" });

	constructor() {
		super();
	}

	connectedCallback(): void {
		this.root.innerHTML = `
      <style>${styles}</style>
      <div class="toolbar-panel">
      <slot></slot>
      </div>
    `;
	}
}
export function registerToolbarPanel(): void {
	if (!customElements.get("toolbar-panel")) {
		customElements.define("toolbar-panel", ToolbarPanel);
	}
}
