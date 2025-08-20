<script lang='ts'>
    import { SceneMode, Viewer } from "cesium";
    import { onMount, getContext, hasContext } from 'svelte';
    import { Icon, GlobeAlt } from 'svelte-hero-icons';

    var is3D = $state(true);
    var viewer: Viewer | undefined;

    onMount(() => {
        if (hasContext('viewer')) viewer = getContext('viewer');
    })

    const planeToggle = () => {
        if (!viewer) return;
        const scene = viewer.scene;

        if (is3D) scene.mode = SceneMode.SCENE2D;
        else scene.mode = SceneMode.SCENE3D;

        is3D = !is3D;
    }
</script>

<li class='tooltip tooltip-left' data-tip='Toggle 3D/2D'>
    <button onclick={() => planeToggle() } class='btn btn-lg btn-circle btn-primary btn-soft'>
        <label class={`swap ${is3D ? 'swap-active' : ''}`}>
            <Icon src={GlobeAlt} class='swap-off size-8' />
            <div class='swap-on'>
                <svg class='size-8 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133ZM200-413h133v-134H200v134Zm213 0h134v-134H413v134Zm214 0h133v-134H627v134ZM200-627h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133Z"/>
                </svg>
            </div>
        </label>
    </button>
</li>