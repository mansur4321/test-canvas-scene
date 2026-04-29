import type { SceneModel, Point, PolygonModel } from "./types";
import { createDemoScene } from "./demo";
import Scene from "./scene";
import { sceneStore } from "./scene-store";

function toWorldPoints(polygon: PolygonModel): Point[] {
	return polygon.points.map((point) => ({
		x: point.x + polygon.position.x,
		y: point.y + polygon.position.y,
	}));
}

export { type SceneModel, type Point, type PolygonModel, toWorldPoints, createDemoScene, Scene, sceneStore };
