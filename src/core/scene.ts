import type { Point, PolygonModel, SceneModel, SceneListener } from "./types";

export default class Scene {
	private scene: SceneModel = { polygons: new Map(), selectedId: null };
	private listeners = new Set<SceneListener>();

	getScene(): SceneModel {
		return structuredClone(this.scene);
	}
	subscribe(listener: SceneListener): () => void {
		this.listeners.add(listener);
		listener(this.getScene());

		return () => {
			this.listeners.delete(listener);
		};
	}
	private notify(): void {
		for (const listener of this.listeners) {
			listener(this.getScene());
		}
	}
	setSelected(id: string | null): boolean {
		if (id === this.scene.selectedId) return true;

		if (id !== null && !this.scene.polygons.has(id)) {
			return false; // Warning (Сделать log об ошибке)
		}

		this.scene.selectedId = id;
		this.notify();

		//Warning (Сделать log)
		return true;
	}
	addPolygon(polygon: PolygonModel): boolean {
		if (this.scene.polygons.has(polygon.id)) {
			return false; //Warning (Сделать log об ошибке)
		}

		this.scene.polygons.set(polygon.id, polygon);
		this.notify();
		return true;
	}
	removeSelected(): boolean {
		if (this.scene.selectedId === null) return false; //Warning (Сделать log)

		const res = this.scene.polygons.delete(this.scene.selectedId);
		if (!res) return false; //Warning (Сделать log об ошибке)

		this.scene.selectedId = null;
		this.notify();
		return true;
	}
	removeAll() {
		this.scene.polygons.clear();
		this.scene.selectedId = null;
		this.notify();
		//Warning (Сделать log)
	}
	movePolygon(id: string, nextPosition: Point): boolean {
		const polygon = this.scene.polygons.get(id);

		if (polygon === undefined) return false; //Warning (Сделать log об ошибке)

		polygon.position = nextPosition;

		this.notify();
		return true;
	}
}
