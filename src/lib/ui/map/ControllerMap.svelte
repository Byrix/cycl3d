<script lang="ts">
  import {
    Icon,
    Home,
    InformationCircle,
    ArrowsPointingOut,
    GlobeAlt,
    Plus,
    Bars3
  } from "svelte-hero-icons";

  interface MapControls {
    tooltip: string;
    icon: typeof Home;
  }
  const mapControls: MapControls[] = [
    { tooltip: "Fly to Home", icon: Home },
    { tooltip: "Navigation Instructions", icon: InformationCircle },
    { tooltip: "Toggle 3D/2D", icon: GlobeAlt },
    { tooltip: "Fullscreen", icon: ArrowsPointingOut },
  ];
</script>

<div class='dropdown dropdown-hover dropdown-top dropdown-center toast toast-end]'>
  <div tabIndex={0} role='button' class='btn btn-primary btn-circle btn-xl m-1'>
    <Icon src={Plus} class='size-10 rotate-0 transition duration-300 ease-in-out hover:rotate-45' />
    <!-- <Icon src={Bars3} class='size-10 ' -->
  </div>
  <div tabIndex={0} class='dropdown-content menu bg-transparent rounded-box z-1 w-fit p-2 gap-3'>
    {#each mapControls as { tooltip, icon }}
      <li class='tooltip tooltip-left' data-tip={tooltip}>
        <button class='btn btn-lg btn-circle btn-soft btn-primary'><Icon src={icon} class='size-8'/></button>
      </li>
    {/each}
  </div>
</div>