<script lang="ts">
	import { toggle, getTheme } from '$lib/scripts/colour_scheme';
	import { onMount } from 'svelte';

	// Define props
	let { routes }: { routes: Array<{ route: string; html: string }> } = $props();
	// A object with route (the url) and html (injects it directly)

	// Navigate function
	function navigate(href: string) {
		window.location.href = href;
	}

	// Function to make life easier (i guess)
	function getThemeImagePath() {
		return getTheme() == 'dark' ? 'images/dark_mode.svg' : 'images/light_mode.svg';
	}

	// Colour scheme + image stuff
	let colourSchemeImage: string | null = $state(null);

	// Toggle wrapper
	function toggleWrapper() {
		toggle();
		colourSchemeImage = getThemeImagePath();
	}

	// Initialise the image
	onMount(() => {
		colourSchemeImage = getThemeImagePath();
		// Listen for changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', () => {
			// Set timeout to ensure the class is updated
			setTimeout(() => {
				colourSchemeImage = getThemeImagePath();
			}, 10);
		});
	});
</script>

<div class="navbar">
	{#each routes as route}
		<button class="route navbar-item" onclick={() => navigate(route.route)}>
			{@html route.html}
		</button>
	{/each}
	<button
		class="colourSchemeButton navbar-item"
		onclick={toggleWrapper}
		aria-label="toggle colour scheme"
	>
		<img src={colourSchemeImage} alt="" />
	</button>
</div>

<style lang="scss">
	@use '$lib/styles/colours' as *;
	.navbar {
		position: sticky;
		top: 1em;
		display: flex;
		align-items: center;
		height: 2.5em;
		width: auto;
		margin: 1em;
		padding: 1em;
		border-radius: 1em;
	}

	.navbar-item {
		width: fit-content;
		height: 4em;
		margin: 5px;
		padding-inline: 1em;
		padding-block: 0.5em;
		border: 0px;
		border-radius: 1em;
	}

	:global(html.dark-mode) {
		.navbar {
			background-color: $dark-navbar-bg;
			button {
				background-color: $dark-navbar-bg;
			}
			button:hover {
				background-color: $dark-navbar-hover;
			}
		}
	}

	:global(html.light-mode) {
		.navbar {
			background-color: $light-navbar-bg;
			button {
				background-color: $light-navbar-bg;
			}
			button:hover {
				background-color: $light-navbar-hover;
			}
		}
	}
</style>
