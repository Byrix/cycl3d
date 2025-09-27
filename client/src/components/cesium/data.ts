import { effect, signal } from "@preact/signals";
import {
  createOsmBuildingsAsync,
  type ImageryLayer,
  WebMapServiceImageryProvider,
} from "cesium";
import { data, map, useToasts } from "$/shared";

export const getData = async () => {
  await Promise.all([getBuildings(), getTrees()]);
};

// === BUILDINGS ================================
const buildings = signal();
effect(() => {
  if (!data.buildings.loaded) return;
  // @ts-expect-error buildings.loaded is false if buildings.value does not exist
  buildings.value.show = data.buildings.show;
});

const getBuildings = async () => {
  try {
    const buildingsData = await createOsmBuildingsAsync();
    buildings.value = map.viewer?.scene.primitives.add(buildingsData);
    data.buildings.loaded = true;
    // biome-ignore lint/suspicious/noExplicitAny: caught err has to be
  } catch (err: any) {
    useToasts.warn("Failed to load OSM buildings");
    console.error(err);
  }
};

// === TREES ====================================
const trees = signal<ImageryLayer>();
effect(() => {
  if (!data.trees.loaded) return;
  // @ts-expect-error trees.loaded is false if trees.value does not exist
  trees.value.show = data.trees.show;
});

const getTrees = async () => {
  try {
    trees.value = map.viewer?.imageryLayers.addImageryProvider(
      new WebMapServiceImageryProvider({
        url: `${window.location.origin}/wms`,
        parameters: {
          format: "image/png",
          transparent: true,
          enablePickFeatures: true,
        },
        layers: "cycl3d:trees",
      }),
    );
    data.trees.loaded = true;
    // biome-ignore lint/suspicious/noExplicitAny: required for caught error
  } catch (err: any) {
    console.error(err);
    useToasts.warn("Failed to load trees");
  }
};
