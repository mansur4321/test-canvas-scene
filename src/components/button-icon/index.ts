import styles from "./style.css";

class ButtonIcon extends HTMLElement {
	private root = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.title = this.getAttribute("title") || "";
	}

	connectedCallback(): void {
		this.root.innerHTML = `
            <style>${styles}</style>
            <button class="button-icon" title="${this.title}">
                <slot></slot>
            </button>
        `;
	}
}
export function registerButtonIcon(): void {
	if (!customElements.get("button-icon")) {
		customElements.define("button-icon", ButtonIcon);
	}
}
