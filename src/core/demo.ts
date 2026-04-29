import { SceneModel } from ".";

export function createDemoScene(): SceneModel {
	return {
		selectedId: "poly-2",
		polygons: new Map([
			[
				"poly-1",
				{
					id: "poly-1",
					name: "Polygon 1",
					position: { x: 140, y: 120 },
					fill: "#86efac",
					stroke: "#166534",
					points: [
						{ x: -36, y: -22 },
						{ x: 48, y: -24 },
						{ x: 34, y: 30 },
						{ x: -28, y: 24 },
					],
				},
			],
			[
				"poly-2",
				{
					id: "poly-2",
					name: "Polygon 2",
					position: { x: 340, y: 220 },
					fill: "#93c5fd",
					stroke: "#1d4ed8",
					points: [
						{ x: -50, y: -12 },
						{ x: -12, y: -40 },
						{ x: 42, y: -20 },
						{ x: 38, y: 28 },
						{ x: -14, y: 42 },
					],
				},
			],
		]),
	};
}
