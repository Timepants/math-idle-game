import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		 adapter: adapter(),
		   paths: {
		    base: process.env.NODE_ENV === "production" ? "/math-idle-game" : "",
			 },
		}
};

export default config;
