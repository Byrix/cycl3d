import { createWorldTerrainAsync, Ion, Viewer } from "cesium";
import { useEffect } from "preact/hooks";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { env } from "$/shared";
import { map } from "$/shared/cesium.store";
import { getData } from "./data";
import { MapFlower } from "./widgets";

Ion.defaultAccessToken = env.CESIUM_TOKEN;
const terrainProv = await createWorldTerrainAsync();

const CesiumMap = () => {
  useEffect(() => {
    if (map.isMounted) return;

    // @ts-expect-error
    map.viewer = new Viewer("cesiumContainer", {
      terrainProvider: terrainProv,
      fullscreenButton: false,
      sceneModePicker: false,
      homeButton: false,
      navigationHelpButton: false,
      geocoder: false,
      timeline: false,
      animation: false,
    });
    map.flyHome();
    getData();
  }, []);

  return (
    <>
      <div id="cesiumContainer" class="h-full max-h-full">
        <MapFlower />
      </div>
    </>
  );
};

export default CesiumMap;
