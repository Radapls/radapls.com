import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import critters from 'astro-critters';
import { defineConfig } from 'astro/config';

const isProd = import.meta.env.PROD;
const isDev = import.meta.env.DEV;
const SERVER_PORT = 8888;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}/`;
const PROD_URL = 'https://radapls.com';

let BASE_URL;
if (isProd) {
	BASE_URL = PROD_URL;
} else if (isDev) {
	BASE_URL = LOCALHOST_URL;
}

/**
 * This are the current configurations for the project
 * More info: https://astro.build/config
 */
export default defineConfig({
	image: {
		quality: 80,
	},
	site: BASE_URL,
	server: {
		port: SERVER_PORT,
		host: true,
	},
	prefetch: {
		prefetchAll: true,
	},
	integrations: [
		// /blog pages are canonical on blog.radapls.com — keep them out of this sitemap
		sitemap({ filter: (page) => !page.includes('/blog') }),
		mdx(),
		critters(),
	],
	redirects: {
		'/en': '/', '/es': '/', '/pt-br': '/',
		'/en/about': '/about', '/es/about': '/about', '/pt-br/about': '/about',
		'/en/credits': '/credits', '/es/credits': '/credits', '/pt-br/credits': '/credits',
		'/en/thanks': '/thanks', '/es/thanks': '/thanks', '/pt-br/thanks': '/thanks',
		'/en/experience': '/case-studies', '/es/experience': '/case-studies', '/pt-br/experience': '/case-studies',
		'/en/experience/[...id]': '/case-studies/[...id]',
		'/es/experience/[...id]': '/case-studies/[...id]',
		'/pt-br/experience/[...id]': '/case-studies/[...id]',
		'/en/projects/spark-ar': '/projects/spark-ar',
		'/es/projects/spark-ar': '/projects/spark-ar',
		'/pt-br/projects/spark-ar': '/projects/spark-ar',
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es', 'pt-br'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
});
