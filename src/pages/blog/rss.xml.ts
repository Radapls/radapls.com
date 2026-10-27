import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { BLOG_URL } from 'src/consts';

export async function GET() {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	return rss({
		title: 'Juan Felipe Rada — Blog',
		description: 'Writing on frontend development and design.',
		site: BLOG_URL,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/${post.id}/`,
		})),
	});
}
