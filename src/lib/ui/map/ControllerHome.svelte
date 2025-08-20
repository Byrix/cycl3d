<script lang="ts">
    import { Cartesian3, Math as CesiumMath } from 'cesium';
    import type { Viewer } from 'cesium';
    import { onMount, getContext, hasContext } from 'svelte';
    import { Icon, Home } from 'svelte-hero-icons';

    var viewer: Viewer;

    onMount(() => {
        if (hasContext('viewer')) viewer = getContext('viewer');
    })

    const etGoHome = () => {
        if (!viewer) return;
        viewer.camera.flyTo({
            // destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
            destination: Cartesian3.fromDegrees(-73.935242, 40.730610, 400),
            orientation: {
                heading: CesiumMath.toRadians(0.0),
                pitch: CesiumMath.toRadians(-15.0),
            },
        });
    }
</script>

<li class='tooltip tooltip-left' data-tip='Recenter camera on home'>
    <button onclick={() => etGoHome() } class='btn btn-lg btn-circle btn-primary btn-soft'>
        <Icon src={Home} class='size-8' />
    </button>
</li>