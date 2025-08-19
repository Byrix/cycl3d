<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
  import Navbar from '$lib/ui/Navbar.svelte';

	let { children } = $props();
  // let darkMode = $state(false);

  // export function getDarkMode() { return darkMode }
  // export function setDakeMode(newValue: boolean) { darkMode = newValue }
  // export function toggleDarkMode() { darkMode = !darkMode }
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<main class='h-full w-full max-h-[93.5vh]'>
  {@render children?.()}
</main>
