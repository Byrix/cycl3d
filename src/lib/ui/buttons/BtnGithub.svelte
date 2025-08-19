<script lang="ts">
  import IconGithub from '$lib/ui/icons/IconGithub.svelte';
</script>

<div class='toast dropdown dropdown-left dropdown-hover'>
  <div tabIndex={0} role='button' class='btn btn-circle btn-lg bg-black text-white border-black z-1000'>
    <IconGithub className='size-10' />
  </div>
  <div tabIndex={0} class='top-auto bottom-auto dropdown-content bg-base-200 rounded-box w-52 p-4 -mr-2 h-[80%]'>
    View on GitHub
  </div>
</div>