<script lang="ts">
	// Imports
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/global.scss';
	import { toggle } from '$lib/ts/colour_scheme';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();

	// Listen for changes
	if (typeof window !== 'undefined') {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', () => {
			toggle();
		});
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar
	routes={[
		{
			route: '/',
			html: "<div class='Home' style='display: flex; align-content: center;'><img src='/src/lib/assets/favicon.svg' width=40 height=40><p>hello</p></div>"
		},
		{ route: 'https://example.com', html: '<p>Example.com</p>' }
	]}
/>

{@render children?.()}
