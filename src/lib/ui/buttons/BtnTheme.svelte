<script lang="ts">
  import { Icon, Sun, Moon } from "svelte-hero-icons";
</script>

<label class='swap swap-rotate'>
  <input type="checkbox" class="theme-controller hidden" value="mocha" />

  <Icon src={Sun} class='swap-off size-10' />
  <Icon src={Moon} class='swap-on size-10' />
</label>