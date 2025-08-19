<script lang='ts'>
  import { slide, fly } from 'svelte/transition';
  let { title, content='', id='' } = $props();
</script>

<div 
  tabIndex={0} 
  class='collapse collapse-arrow join-item border-base-300 border-t-2 w-full rounded-none'
>
  <div class='collapse-title font-semibold'>{title}</div>
  <div {id} class='collapse-content text-sm'>{content}</div>
</div>
