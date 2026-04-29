import { type PolygonModel, toWorldPoints } from "@/core";

type DrawPolygonOptions = {
	selected: boolean;
};

export function drawPolygon(ctx: CanvasRenderingContext2D, polygon: PolygonModel, options: DrawPolygonOptions) {
	const worldPoints = toWorldPoints(polygon);
	if (worldPoints.length < 3) return;

	ctx.beginPath();
	ctx.moveTo(worldPoints[0].x, worldPoints[0].y);
	for (let i = 1; i < worldPoints.length; i += 1) {
		ctx.lineTo(worldPoints[i].x, worldPoints[i].y);
	}
	ctx.closePath();

	ctx.fillStyle = polygon.fill;
	ctx.fill();

	ctx.lineWidth = options.selected ? 3 : 2;
	ctx.strokeStyle = options.selected ? "#111827" : polygon.stroke;
	ctx.stroke();
}
