import type { Action } from 'svelte/action';
import { Viewer, Cartesian3, Math as CesiumMath, createOsmBuildingsAsync, WebMapServiceImageryProvider } from 'cesium';

export const loadMap: Action<
    HTMLDivElement,
    {
        viewerOpts: Viewer.ConstructorOptions;
    },
    {
        mapLoaded: (e: CustomEvent) => void;
        mapDestroyed: (e: CustomEvent) => void;
    }
> = (node, { viewerOpts }) => {
     $effect(() => {
        // When map container loaded into DOM
        const viewer = new Viewer(node.id, viewerOpts);

        viewer.camera.flyTo({
            // destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
            destination: Cartesian3.fromDegrees(-73.935242, 40.730610, 400),
            orientation: {
                heading: CesiumMath.toRadians(0.0),
                pitch: CesiumMath.toRadians(-15.0),
            },
        });

        viewer.imageryLayers.addImageryProvider(new WebMapServiceImageryProvider({
            url: "http://192.168.1.52:8080/geoserver/wms",
            parameters: {
                format: "image/png",
                transparent:"true",
                tiled:true,
                enablePickFeatures:false,
            },
            layers: "tiger:tiger_roads",
        }));
        viewer.imageryLayers.addImageryProvider(new WebMapServiceImageryProvider({
            url: "http://192.168.1.52:8080/geoserver/wms",
            parameters: {
                format: "image/png",
                transparent:"true",
                tiled:true,
                enablePickFeatures:true,
            },
            layers: "tiger:poi",
        }));

        node.dispatchEvent(new CustomEvent('mapLoaded', { detail: { map: viewer }}));
        node.classList.toggle('hidden');

        // When map container is unloaded
        // return () => {
        //     container.dispatchEvent(new CustomEvent('mapDestroyed'));
        // }
    })
}