// ponytail: structural Env typing — no @cloudflare/workers-types dependency
interface Env {
	ASSETS: { fetch: (request: Request) => Promise<Response> };
}

const BLOG_HOST = 'blog.radapls.com';
const APEX = 'radapls.com';

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		// Match on the Host header (not url.hostname): wrangler dev normalizes
		// request.url to the custom domain, hiding the real host
		const host = (request.headers.get('host') ?? url.hostname).replace(/:\d+$/, '');

		// blog.radapls.com/* → serve the /blog/* slice of the same build
		if (host === BLOG_HOST) {
			url.pathname = `/blog${url.pathname}`.replace('//', '/');
			return env.ASSETS.fetch(new Request(url, request));
		}

		// radapls.com/blog/* → 301 to the canonical subdomain.
		// https-only: production custom domains are always https, while wrangler
		// dev serves plain http with the host faked as the apex — skipping the
		// redirect locally keeps /blog browsable in the browser
		if (
			url.protocol === 'https:' &&
			host === APEX &&
			(url.pathname === '/blog' || url.pathname.startsWith('/blog/'))
		) {
			url.host = BLOG_HOST;
			url.pathname = url.pathname.slice('/blog'.length) || '/';
			return Response.redirect(url.toString(), 301);
		}

		return env.ASSETS.fetch(request);
	},
};
