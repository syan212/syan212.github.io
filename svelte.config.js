import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			fallback: '404.html'
		}),
		alias: {
			'#parts': 'src/lib/components',
			'#assets': 'src/lib/assets',
			'#scripts': 'src/lib/scripts',
			'#styles': 'src/lib/styles'
		},
		prerender: {
			handleHttpError: 'warn',
			entries: ['/', '/about']
		}
	}
};

export default config;
