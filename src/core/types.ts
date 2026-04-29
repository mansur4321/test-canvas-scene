export type Point = {
	x: number;
	y: number;
};

export type PolygonModel = {
	id: string;
	name: string;
	position: Point;
	points: Point[];
	fill: string;
	stroke: string;
};

export type SceneModel = {
	polygons: Map<string, PolygonModel>;
	selectedId: string | null;
};

export type SceneListener = (scene: SceneModel) => void;
