<script lang="ts">
  const { className } = $props();
  const terrainOptions = [
    'google', 'bing', 'foobar'
  ];
</script>

<div class="join {className}">
  {#each terrainOptions as options}
    <input class='join-item btn grow' type='radio' name='terrainOptions' aria-label={options} />
  {/each}
</div>