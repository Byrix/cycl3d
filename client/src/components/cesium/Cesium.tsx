import { createWorldTerrainAsync, Viewer } from "cesium";
import { useEffect } from "preact/hooks";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { map } from "$/shared/cesium.store";
import { Buildings } from "./features";
import { MapFlower } from "./widgets";

const terrainProv = await createWorldTerrainAsync();

const CesiumMap = () => {
	useEffect(() => {
		if (map.isMounted) return;
		map.viewer = new Viewer("cesiumContainer", {
			terrainProvider: terrainProv,
			fullscreenButton: false,
			sceneModePicker: false,
			homeButton: false,
			navigationHelpButton: false,
			geocoder: false,
		});
		map.flyHome();
	}, []);

	return (
		<>
			<div id="cesiumContainer" class="h-full max-h-full">
				<Buildings />
				<MapFlower />
			</div>
		</>
	);
};

export default CesiumMap;
