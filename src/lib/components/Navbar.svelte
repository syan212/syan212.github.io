<script lang="ts">
	import { toggle, getTheme } from '$lib/ts/colour_scheme';

	// Define props
	let { routes }: { routes: Array<{ route: string; html: string }> } = $props();
	// A object with route (the url) and label (the text to be shown)

	// Navigate function
	function navigate(href: string) {
		window.location.href = href;
	}
</script>

<div class="navbar">
	{#each routes as route}
		<button class="route navbar-item" onclick={() => navigate(route.route)}>
			{@html route.html}
		</button>
	{/each}
	<button class="colourSchemeButton navbar-item" onclick={toggle} aria-label="toggle colour scheme"
	></button>
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
		width: 10em;
		height: 3em;
		margin: 5px;
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
