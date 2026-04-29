import { Scene, createDemoScene } from ".";

const store = new Scene();
const demo = createDemoScene();

store.setSelected(demo.selectedId);
demo.polygons.forEach((polygon) => {
	store.addPolygon(polygon);
});

export { store as sceneStore };
