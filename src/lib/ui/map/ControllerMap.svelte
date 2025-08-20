<script lang="ts">
  import {
    Icon,
    Home,
    InformationCircle,
    GlobeAlt,
    Plus
  } from "svelte-hero-icons";

  let { children } = $props();

  interface MapControls {
    tooltip: string;
    icon: typeof Home;
  }
  const mapControls: MapControls[] = [
    { tooltip: "Navigation Instructions", icon: InformationCircle },
  ];

</script>

<div
  class="dropdown dropdown-hover dropdown-top dropdown-center toast toast-end"
>
  <div tabIndex={0} role="button" class="btn btn-primary btn-circle btn-xl m-1">
    <Icon
      src={Plus}
      class="size-10 rotate-0 transition duration-300 ease-in-out hover:rotate-45"
    />
  </div>
  <div
    tabIndex={0}
    class="dropdown-content menu bg-transparent rounded-box z-1 w-fit p-2 gap-3"
  >
    
    {#each mapControls as { tooltip, icon }}
      <li class="tooltip tooltip-left" data-tip={tooltip}>
        <button class="btn btn-lg btn-circle btn-soft btn-primary">
          <Icon src={icon} class="size-8" />
        </button>
      </li>
    {/each}
    
    {@render children()}
  </div>
</div>
