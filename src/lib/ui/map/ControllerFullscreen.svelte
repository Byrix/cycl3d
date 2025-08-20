<script lang='ts'>
    import { Icon, ArrowsPointingOut, ArrowsPointingIn } from "svelte-hero-icons";

    let { element } = $props();
    var isFullscreen = $state(false);

    const fullscreenToggle = (id: string) => {
        const element = document.getElementById(id);
        if (!element) throw new Error(`No element ID:#${id} found in DOM`);

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen().catch((err: Error) => { throw err });
            } else {
                alert('Browser does not support fullscreen');
            }
        }
        isFullscreen = document.fullscreenElement ? true : false
    }
</script>

<li class='tooltip tooltip-left' data-tip='Make fullscreen'>
    <button onclick={() => fullscreenToggle(element) } class='btn btn-lg btn-circle btn-primary btn-soft'>
        <label class={`swap ${isFullscreen ? 'swap-active' : ''}`}>
            <Icon src={ArrowsPointingIn} class='swap-off size-8' />
            <Icon src={ArrowsPointingOut} class='swap-on size-8' />
        </label>
    </button>
</li>