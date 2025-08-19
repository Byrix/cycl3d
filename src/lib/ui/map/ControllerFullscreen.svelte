<script lang="ts">
    import { Fullscreen, FullscreenButton } from 'cesium';
    import { onMount } from 'svelte';
    import { Icon, ArrowsPointingOut, ArrowsPointingIn } from 'svelte-hero-icons';
    import overrideButtons from './overrideButtons';

    let { element, classes, icon, altIcon } = $props();
    var wrapper: HTMLLIElement;
    'btn btn-lg btn-circle btn-soft btn-primary'

    onMount(() => {
        try{ 
            new FullscreenButton(wrapper.id, element);
            // @ts-expect-error previous line would throw error if it failed to create children for wrapper
            overrideButtons(wrapper.firstElementChild, classes, icon, altIcon);
        } catch (error) {
            console.log(error);
        } 
    });
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
</svelte:head>

<li bind:this={wrapper} id='btn-fullscreen' class='tooltip tooltip-left' data-tip='Make fullscreen'></li>


