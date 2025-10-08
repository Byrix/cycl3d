import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const cesiumSource = "../node_modules/cesium/Build/Cesium";
const cesiumBaseUrl = "cesiumStatic";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/app/",
    resolve: {
      alias: { $: path.resolve(__dirname, "./src") },
    },
    plugins: [
      preact(),
      tailwindcss(),
      viteStaticCopy({
        targets: [
          { src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl },
          { src: `${cesiumSource}/Workers`, dest: cesiumBaseUrl },
          { src: `${cesiumSource}/Assets`, dest: cesiumBaseUrl },
          { src: `${cesiumSource}/Widgets`, dest: cesiumBaseUrl },
        ],
      }),
    ],
    define: {
      CESIUM_BASE_URL: JSON.stringify(`${cesiumBaseUrl}`),
    },
  };
});
