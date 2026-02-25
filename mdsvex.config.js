import remarkGithub from 'remark-github';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		quotes: true,
		ellipses: true,
		dashes: 'oldschool'
	},

	remarkPlugins: [
		[
			remarkGithub,
			{
				// TODO: Replace with your own repository
				repository:
					'https://github.com/peaks-and-valleys/sveltekit-mdsvex-blog.git'
			}
		]
	],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		],
		[
			rehypeExternalLinks,
			{
				target: '_blank',
				rel: ['noopener', 'noreferrer', 'external']
			}
		]
	]
});

export default config;
