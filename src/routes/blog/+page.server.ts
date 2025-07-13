import type { PageServerLoad } from './$types';
import type { Post } from '$lib/ts/posts';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/posts');
	const rawPosts: Post[] = await response.json();
	const posts = await Promise.all(
		rawPosts.map(async (post) => {
			const thumbnail: string = (await import(`$assets/blog/thumbnails/${post.slug}.jpg`)).default;

			return { meta: post, thumbnail };
		})
	);
	return { posts };
};
