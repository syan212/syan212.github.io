<script lang="ts">
	// Imports
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/global.scss';
	import { toggle } from '$lib/scripts/colour_scheme';
	import Navbar from '$lib/components/Navbar.svelte';
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
				   </div>`
		},
		{ route: 'https://example.com', html: '<p>Example.com</p>' }
	]}
/>

{@render children?.()}
