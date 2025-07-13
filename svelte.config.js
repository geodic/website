import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { importAssets } from 'svelte-preprocess-import-assets';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await createHighlighter({
				themes: ['poimandres'],
				langs: ['javascript', 'typescript']
			});
			await highlighter.loadLanguage('javascript', 'typescript');
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'poimandres' }));
			return `{@html \`${html}\` }`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex(mdsvexOptions),
		importAssets({
			sources: (defaultSources) => {
				return [
					...defaultSources,
					{
						tag: 'Avatar.Image',
						srcAttributes: ['src']
					},
					{
						tag: 'DotLottieSvelte',
						srcAttributes: ['src']
					}
				];
			}
		})
	],
	kit: {
		adapter: adapter(),
		alias: {
			$assets: 'src/assets'
		}
	},
	ssr: {
		noExternal: ['postprocessing']
	},
	extensions: ['.svelte', '.svx']
};

export default config;
