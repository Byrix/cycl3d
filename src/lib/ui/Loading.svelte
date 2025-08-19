<!-- Adapted from https://uiverse.io/kennyotsu/fresh-lizard-20 -->

<script lang='ts'>
  const words: string[] = ['buttons', 'forms', 'switches', 'cards', 'buttons']
</script>

<div class='w-full h-full bg-base-300 skeleton flex justify-center items-center'>
  <div id='loading' class="h-fit w-fit bg-base-200 px-4 py-8 rounded-4xl">
    <div class="h-[60px] text-neutral font-semibold text-6xl box-content p-2.5 flex">
      <p>loading</p>
      <div class="relative overflow-hidden after:content-none after:absolute after:inset-0 after:z-20">
        {#each words as word}
          <span id='loading-word' class='block h-full pl-5 text-primary animate-(--loading-spin)'>{word}</span>
        {/each}
        <span class='h-[150%] content-[""] absolute inset-0 z-20 bg-linear-to-t from-(--color-base-200) from-0% via-[#ef444400] via-90% to-(--color-base-200) to-100%'></span>
      </div>
    </div>
  </div>
</div>

<style>
  #loading-word {
    animation: spin_4991 4s infinite;
  }

  @keyframes spin_4991 {
    10% {
      -webkit-transform: translateY(-102%);
      transform: translateY(-102%);
    }

    25% {
      -webkit-transform: translateY(-100%);
      transform: translateY(-100%);
    }

    35% {
      -webkit-transform: translateY(-202%);
      transform: translateY(-202%);
    }

    50% {
      -webkit-transform: translateY(-200%);
      transform: translateY(-200%);
    }

    60% {
      -webkit-transform: translateY(-302%);
      transform: translateY(-302%);
    }

    75% {
      -webkit-transform: translateY(-300%);
      transform: translateY(-300%);
    }

    85% {
      -webkit-transform: translateY(-402%);
      transform: translateY(-402%);
    }

    100% {
      -webkit-transform: translateY(-400%);
      transform: translateY(-400%);
    }
  }
</style>
