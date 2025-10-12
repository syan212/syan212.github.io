<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/global.scss';

	let { children } = $props();

	// COlour scheme code
	// Apply theme function
	function apply(mode: string) {
		const html = document.documentElement;
		html.classList.remove('light-mode', 'dark-mode');
		html.classList.add(mode === 'dark' ? 'dark-mode' : 'light-mode');
		localStorage.setItem('theme', mode);
	}

	let theme: string | null = $state(null);
	// This only runs in the browser
	if (typeof window !== 'undefined') {
		// Change theme according to storage or system preference
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = stored || (prefersDark ? 'dark' : 'light');

		// Toggle function
    	function toggle() {
			const next = theme === 'light' ? 'dark' : 'light';
			theme = next;
			apply(theme);
		}

		// Listen for changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', () => {
			toggle();
		});
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<p>{theme}</p>

{@render children?.()}
