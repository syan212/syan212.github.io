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
			html: `<div class='Home' style='display: flex; align-content: center; justify-content: center;'>
					<img src='images/favicon.svg' width=35 height=35 style='margin-right: 5px;'>
					<p>hello</p>
				   </div>`,
			align: 'left'
		},
		{ route: 'https://example.com', html: '<p>Example.com</p>', align: 'left' }
	]}
	buttonAlign="right"
/>

{#if children}
	{@render children?.()}
{:else}
	<p>Something has gone wrong!!</p>
{/if}
