import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

const cesiumSource = './node_modules/cesium/Build/Cesium';
const cesiumPath = 'static/cesium';

export default defineConfig({
	define: {
		CESIUM_BASE_URL: JSON.stringify(`/${cesiumPath}`),
	},
	plugins: [
		tailwindcss(), 
		sveltekit(),
		viteStaticCopy({
			targets: [
				{ src: `${cesiumSource}/ThirdParty`, dest: cesiumPath },
				{ src: `${cesiumSource}/Workers`, dest: cesiumPath },
				{ src: `${cesiumSource}/Assets`, dest: cesiumPath },
				{ src: `${cesiumSource}/Widgets`, dest: cesiumPath },
			],
		}),
	]
});