import { effect, signal } from "@preact/signals";
import {
  createOsmBuildingsAsync,
  ImageryLayer,
  WebMapServiceImageryProvider,
} from "cesium";
import { data, map, useToasts } from "$/shared";
import { env } from '$/shared';

export const getData = async () => {
  await Promise.all([
    getBuildings(),
    getTrees(),
    getLanes()
  ]);
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
        url: `${env.GEOSERVER_BASE}/wms`,
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

// === LANES ====================================
const lanes = signal<ImageryLayer>();
effect(() => {
  if (!data.lanes.loaded) return;
  // @ts-expect-error lanes.loaded is false if lanes.value does not exist
  lanes.value.show = data.lanes.show;
});

const getLanes = async () => {
  try {
    lanes.value = map.viewer?.imageryLayers.addImageryProvider(
      new WebMapServiceImageryProvider({
        url: `${env.GEOSERVER_BASE}/wms`,
        parameters: {
          version: "1.3.0",
          format: "image/png",
          transparent: true,
          enablePickFeatures: true,
        },
        layers: "cycl3d:lanes",
      }),
    );
    data.lanes.loaded = true;
    // biome-ignore lint/suspicious/noExplicitAny: required for caught error
  } catch (err: any) {
    console.error(err);
    useToasts.warn("Failed to lanes.");
  }
};
