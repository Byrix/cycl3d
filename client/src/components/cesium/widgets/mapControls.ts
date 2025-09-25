import { Viewer } from "cesium";
import type { DeepSignal } from "deepsignal";
import { map } from "$/shared/cesium.store";
import { useToasts } from "$/shared/toasts.store";

export const toggleFullscreen = () => {
	if (!map.isMounted) {
		useToasts.warn("Map element does not exist.");
		return;
	}
	const container = document.getElementById(map.container) as HTMLElement;

	if (document.fullscreenElement) {
		document.exitFullscreen();
		map.isFullscreen = false;
	} else {
		if (container.requestFullscreen) {
			try {
				container.requestFullscreen();
				map.isFullscreen = true;
			} catch (err) {
				useToasts.warn("Something went wrong, please try again later.");
				console.error(err);
			}
		} else {
			useToasts.warn("Fullscreen not supported by your browser, sorry.");
		}
	}
};

export const togglePlane = () => {
	if (!map.isMounted) return;
	const { scene } = map.viewer as DeepSignal<Viewer>;

	switch (scene.mode) {
		case 3:
			scene.mode = 2;
			map.isPlanar = true;
			break;
		case 2:
		default:
			scene.mode = 3;
			map.isPlanar = false;
			break;
	}
};
