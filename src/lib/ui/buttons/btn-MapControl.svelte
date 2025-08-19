<script lang="ts">
  import { Icon } from 'svelte-hero-icons';
  let { icon, tooltip, className='' } = $props();
</script>

<li>
  <div class='tooltip btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl {className}' data-tip={tooltip}>
    <Icon src={icon} class='h-8 w-8' />
  </div>
</li>