<script lang="ts">
	import { toggle, getTheme } from '#scripts/colour_scheme';
	import { onMount } from 'svelte';

	// Define props
	let {
		routes,
		buttonAlign
	}: {
		routes: Array<{ route: string; text?: string; img?: string; align: string }>;
		buttonAlign: string;
	} = $props(); // A object with route (the url), html (injects it directly) and an align parameter

	// Navigate function
	function navigate(href: string) {
		window.location.href = href;
	}

	// Function to make life easier (i guess)
	function getThemeImagePath() {
		return getTheme() == 'dark' ? 'images/dark_mode.svg' : 'images/light_mode.svg';
	}

	// Toggle wrapper
	function toggleWrapper() {
		toggle();
		colourSchemeImage = getThemeImagePath();
	}

	// Colour scheme + image stuff
	let colourSchemeImage: string | null = $state(null);
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

	// eslint rules
	/* eslint svelte/require-each-key: "off" */
</script>

<!-- Clour scheme button Snippet -->
{#snippet button()}
	<button
		class="colourSchemeButton navbar-item"
		onclick={toggleWrapper}
		aria-label="toggle colour scheme"
	>
		<img class="colourButtonImage" src={colourSchemeImage} alt="" />
	</button>
{/snippet}

<!-- Route button snippet-->
{#snippet routeSnippet(route: { route: string; text?: string; img?: string; align: string })}
	<button class="route navbar-item" onclick={() => navigate(route.route)}>
		{#if route.img}
			<img src={route.img} alt="" />
		{:else if route.text}
			<p>{route.text}</p>
		{:else}
			<p style:color="red">Error</p>
		{/if}
	</button>
{/snippet}

<div class="navbar">
	<div class="left">
		{#if buttonAlign === 'left'}
			{@render button()}
		{/if}
		{#each routes as route}
			{#if route.align === 'left'}
				{@render routeSnippet(route)}
			{/if}
		{/each}
	</div>

	<div class="right">
		{#each routes as route}
			{#if route.align === 'right'}
				{@render routeSnippet(route)}
			{/if}
		{/each}
		{#if buttonAlign === 'right'}
			{@render button()}
		{/if}
	</div>
</div>

<!-- Styles -->
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
		.right {
			margin-left: auto;
		}
		.left {
			margin-right: auto;
		}
		.left,
		.right {
			display: flex;
			align-items: center;
			width: auto;
			img {
				height: 3em;
			}
			img.colourButtonImage {
				width: 30px;
				height: 30px;
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
		}
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
