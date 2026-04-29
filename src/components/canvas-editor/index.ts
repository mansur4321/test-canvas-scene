import styles from "./style.css";
import { type SceneModel, sceneStore } from "@/core";
import { renderScene } from "@/render";

class CanvasEditor extends HTMLElement {
	private root = this.attachShadow({ mode: "open" });
	private canvas!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;

	private scene: SceneModel = sceneStore.getScene();
	private unsubscribeScene: (() => void) | null = null;
	private resizeRafId: number | null = null;

	constructor() {
		super();
	}

	connectedCallback(): void {
		this.root.innerHTML = `
            <style>${styles}</style>
            <canvas class="canvas-editor"></canvas>
        `;
		this.canvas = this.root.querySelector(".canvas-editor") as HTMLCanvasElement;
		this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

		this.resizeCanvas();
		window.addEventListener("resize", this.scheduleViewportSync, { passive: true });
		window.addEventListener("orientationchange", this.scheduleViewportSync, {
			passive: true,
		});

		this.unsubscribeScene = sceneStore.subscribe((scene) => {
			this.scene = scene;
			this.render();
		});
	}

	disconnectedCallback(): void {
		window.removeEventListener("resize", this.scheduleViewportSync);
		window.removeEventListener("orientationchange", this.scheduleViewportSync);
		if (this.resizeRafId !== null) {
			cancelAnimationFrame(this.resizeRafId);
			this.resizeRafId = null;
		}
	}
	private getCanvasSize(): { width: number; height: number } {
		const rect = this.canvas.getBoundingClientRect();
		return {
			width: rect.width,
			height: rect.height,
		};
	}
	private render(): void {
		const size = this.getCanvasSize();
		renderScene({
			ctx: this.ctx,
			scene: this.scene,
			width: size.width,
			height: size.height,
		});
	}
	private resizeCanvas(): void {
		if (!this.canvas || !this.ctx) return;

		const dpr = window.devicePixelRatio || 1;
		const size = this.getCanvasSize();

		const nextWidth = Math.max(1, Math.round(size.width * dpr));
		const nextHeight = Math.max(1, Math.round(size.height * dpr));

		if (this.canvas.width !== nextWidth || this.canvas.height !== nextHeight) {
			this.canvas.width = nextWidth;
			this.canvas.height = nextHeight;

			this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			this.render();
		}
	}

	private scheduleViewportSync = (): void => {
		if (this.resizeRafId !== null) return;

		this.resizeRafId = requestAnimationFrame(() => {
			this.resizeRafId = null;
			this.resizeCanvas();
		});
	};
}
export function registerCanvasEditor(): void {
	if (!customElements.get("canvas-editor")) {
		customElements.define("canvas-editor", CanvasEditor);
	}
}
