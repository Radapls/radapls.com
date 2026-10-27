import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const experience = defineCollection({
	loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/experience' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			variant: z.string(),
			description: z.string(),
			kind: z.enum(['work', 'education']).optional(),
			gif: image().optional(),
			video: z.string().optional(),
		}),
});

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			cover: image().optional(),
			type: z.enum(['post', 'poem']).optional(),
			tags: z.array(z.string()).optional(),
			lang: z.enum(['en', 'es', 'pt-br']).optional(),
		}),
});

export const collections = { experience, blog };
