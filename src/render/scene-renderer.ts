import type { SceneModel } from "@/core";
import { clearCanvas } from "./canvas-clear";
import { drawPolygon } from "./polygon-renderer";

type RenderSceneArgs = {
	ctx: CanvasRenderingContext2D;
	scene: SceneModel;
	width: number;
	height: number;
};

export function renderScene({ ctx, scene, width, height }: RenderSceneArgs) {
	clearCanvas(ctx, width, height);

	for (const polygon of scene.polygons.values()) {
		drawPolygon(ctx, polygon, { selected: polygon.id === scene.selectedId });
	}
}
