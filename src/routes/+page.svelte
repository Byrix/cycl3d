<script lang="ts">
  // import { Cartesian3, Ion, Math as CesiumMath, Viewer, createOsmBuildingsAsync } from 'cesium';
  import {
    Icon,
    MagnifyingGlass,
    Home,
    InformationCircle,
    ArrowsPointingOut,
    GlobeAlt,
  } from "svelte-hero-icons";
  // import type { PageProps } from './$types';
  import AccordianEntry from "$lib/ui/AccordianEntry.svelte";
  import BtnMapControl from "$lib/ui/buttons/btn-MapControl.svelte";
  import Loading from '$lib/ui/Loading.svelte';
  import ControllerMap from '$lib/ui/map/ControllerMap.svelte';
    import ControllerTerrain from "$lib/ui/map/ControllerTerrain.svelte";

  interface AccordianDisplays {
    title: string;
    content?: string;
    id?: string;
  }
  const mapAttrib: AccordianDisplays[] = [
    { title: "Option 1", content: "Response 1" },
    { title: "Option 2", content: "Response 2" },
    { title: "Option 3", id: "map-attrib-data" },
  ];
</script>

<div class="bg-base-100 w-full h-full flex flex-row">
  <div
    id="sidebar"
    class="h-full max-h-full grow-1 flex flex-col bg-base-200 items-center max-w-1/5"
  >
    <div id="map-controls" class="w-full h-auto p-4 flex flex-col gap-3 justify-start">
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

      <ControllerTerrain className='flex w-full' />

      <div class='h-fit w-full flex flex-col items-center justify-center'>
        <button class='btn btn-primary btn-wide w-[90%]'>Enable Time</button>
        <div class='w-full max-w-xs'>
          <input type='range' min="0" max="24" value="13" class='range' step=1 />
          <div class='flex justify-between px-2.5 mt-2 text-xs'>
            {#each [...Array(6).keys()] as step}<span>|</span>{/each}
          </div> 
          <div class='flex justify-between px-2.5 mt-2 text-xs'>
            {#each [...Array(6).keys()] as step}<span>{step*4}</span>{/each}
          </div>
        </div>
      </div>
    </div>

    <div class="divider w-full px-[5%] my-0.5"></div>

    <div id="data-controls" class="w-full h-auto p-4 justify-start">
      <h2 class='text-lg text-base-content pb-2'>Data Controls</h2>
    </div>

    <div class="grow"></div>

    <div
      id="map-info"
      class="join join-vertical w-full inline-flex justify-end rounded-none"
    >
      {#each mapAttrib as attrib}<AccordianEntry {...attrib} />{/each}
    </div>
  </div>
  <div id="map" class="h-full grow-12 flex justify-center items-center skeleton rounded-none">
    <Loading />
    <ControllerMap />
    <!-- <BtnGithub /> -->
  </div>
</div>

<style>
  #map-controls .input input {
    --tw-ring-color: #00000000;
  }
</style>
