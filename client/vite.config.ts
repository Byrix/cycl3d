import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import type { UserConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const cesiumSource = "../node_modules/cesium/Build/Cesium";
const cesiumBaseUrl = "cesiumStatic";

// https://vite.dev/config/
export default {
	server: {
		proxy: {
			"/openapi": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			$: path.resolve(__dirname, "./src"),
		},
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
		CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl),
	},
} satisfies UserConfig;
