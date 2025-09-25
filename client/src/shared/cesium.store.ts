import { signal } from "@preact/signals";
import type { Viewer } from "cesium";
import { Cartesian3, Math as CesiumMath, Rectangle } from "cesium";
import { deepSignal } from "deepsignal";

type CesiumStore = {
	viewer: Viewer | undefined;
	isMounted: boolean;
	isFullscreen: boolean;
	isPlanar: boolean;
	flyTo: (lat: number, lon: number, h?: number) => void;
	zoomTo: (bbox: number[]) => void;
	flyHome: () => void;
	container: string;
};

const map = deepSignal<CesiumStore>({
	viewer: undefined,
	get isMounted(): boolean {
		return map.viewer != undefined;
	},
	isFullscreen: false,
	isPlanar: false,
	flyTo: (lat, lon, h) => {
		if (!map.viewer) return;
		map.viewer.camera.flyTo({
			destination: Cartesian3.fromDegrees(lon, lat, h || 20000),
		});
	},
	zoomTo: (bbox) => {
		if (!map.viewer) return;
		const rect = Rectangle.fromDegrees(bbox[2], bbox[0], bbox[3], bbox[1]); // W S E N
		const point = map.viewer.camera.getRectangleCameraCoordinates(rect);
		map.viewer.camera.flyTo({ destination: point });
	},
	flyHome: () => {
		if (!map.viewer) return;
		map.viewer.camera.flyTo({
			destination: Cartesian3.fromDegrees(144.9655616, -37.8141705, 20000),
		});
	},
	get container(): string {
		return map.viewer?.container.id || "";
	},
});

export { map };
