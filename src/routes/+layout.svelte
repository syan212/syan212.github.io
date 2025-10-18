<script lang="ts">
	// Imports
	import favicon from '#assets/favicon.svg';
	import '#styles/global.scss';
	import { toggle } from '#scripts/colour_scheme';
	import Navbar from '#parts/Navbar.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Listen for changes
	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', () => {
			toggle();
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar
	routes={[
		{
			route: '/',
			img: 'images/favicon.svg',
			align: 'left'
		},
		{ 
			route: '/about', 
			text: 'About', 
			align: 'left' 
		}
	]}
	buttonAlign="right"
/>

{#if children}
	{@render children?.()}
{:else}
	<p>Something has gone wrong!!</p>
{/if}
