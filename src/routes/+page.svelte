<script lang="ts">
  import { Viewer, Terrain, Cartesian3, Math as CesiumMath, createOsmBuildingsAsync } from "cesium";
  import { Icon, MagnifyingGlass } from "svelte-hero-icons";
  import AccordianEntry from "$lib/ui/AccordianEntry.svelte";
  import Loading from "$lib/ui/Loading.svelte";
  import { MapControls, MapFullscreen, MapHome, MapPlane } from '$lib/ui/map';
  import "cesium/Build/Cesium/Widgets/widgets.css";
  import { loadMap } from './map.svelte';
  import { setContext } from 'svelte';

  interface AccordianDisplays {
    title: string;
    content?: string;
    id?: string;
  }
  const mapAttrib: AccordianDisplays[] = [
    { title: "Option 1", content: "Response 1" },
    { title: "Option 2", content: "Response 2" },
    { title: 'Data Attributions', id: 'map-data-attrib' },
  ];

  const viewerOpts = {
    terrain: Terrain.fromWorldTerrain(),
    fullscreenButton: false,
    sceneModePicker: false,
    homeButton: false,
    // creditContainer: 'map-attrib-data-head',
    // creditViewport: 'map-attrib-data-body',
  }



  var isMapLoaded = $state(false);
</script>

<div class="bg-base-100 w-full h-full flex flex-row">
  <div
    id="sidebar"
    class="h-full max-h-full grow-1 flex flex-col bg-base-200 items-center max-w-1/5"
  >
    <div
      id="map-controls"
      class="w-full h-auto p-4 flex flex-col gap-3 justify-start"
    >
      <h2 class="text-lg text-base-content">Map Controls</h2>

      <label
        class="input w-full focus:outline-1 focus-within:outline-base-300 focus:outline-base-300"
      >
        <span class="label"><Icon src={MagnifyingGlass} /></span>
        <input
          type="text"
          class="focus:shadow-none focus-within:shadow-none"
          placeholder="Enter an address or landmark..."
        />
      </label>
    </div>

    <div class="divider w-full px-[5%] my-0.5"></div>

    <div id="data-controls" class="w-full h-auto p-4 justify-start">
      <h2 class="text-lg text-base-content pb-2">Data Controls</h2>
    </div>

    <div class="grow"></div>

    <div
      id="map-info"
      class="join join-vertical w-full inline-flex justify-end rounded-none"
    >
      {#each mapAttrib as attrib}<AccordianEntry {...attrib} />{/each}
    </div>
  </div>
  <div
    id="map"
    class="h-full w-full grow-12 flex justify-center items-center rounded-none"
  >
    
    <div
      id="map-container"
      class="w-full h-full hidden"
      use:loadMap={{viewerOpts}}
      onmapLoaded={(e: CustomEvent) => {
        isMapLoaded = true; 
        setContext('viewer', e.detail.map); 
      }}
    ></div>
    <!-- <div
      id="map-container"
      class="w-full h-full hidden"
    ></div> -->
    {#if isMapLoaded}
      <MapControls>
        <MapHome />
        <MapPlane />
        <MapFullscreen element='map' />
      </MapControls>
    {:else}
      <Loading />
    {/if}
    <!-- <BtnGithub /> -->
  </div>
</div>

<style>
  #map-controls .input input {
    --tw-ring-color: #00000000;
  }
</style>
