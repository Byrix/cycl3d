import { effect, signal } from "@preact/signals";
import { type Cesium3DTileset, createOsmBuildingsAsync, Ion } from "cesium";
import { map } from "$/shared/cesium.store";
import { data } from "$/shared/data.store";
import { useToasts } from "$/shared/toasts.store";

// const buildingData = signal<Cesium3DTileset>();
var buildingData: Cesium3DTileset;
var primitive = signal();

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MDQwOGUzNy05MWE2LTQwZmUtYmUzNi1iZWI0YmMyNjIwMmYiLCJpZCI6MzI4NDE3LCJpYXQiOjE3NTU2MDMwNTV9.EeIAbofEXbNunLLy5-UkZPpz_KUhNFQQSpksUcOFlwk";

effect(() => {
  if (!data.buildings.loaded) return;
  primitive.value.show = data.buildings.show;
});

const getBuilding = async () => {
  try {
    buildingData = await createOsmBuildingsAsync();
    primitive.value = map.viewer?.scene.primitives.add(buildingData);
    data.buildings.loaded = true;
    // biome-ignore lint/suspicious/noExplicitAny: caught err has to be
  } catch (err: any) {
    useToasts.warn("Failed to load OSM buildings");
    console.error(err);
  }
};

const Buildings = () => {
  getBuilding();
  return <></>;
};

export default Buildings;
