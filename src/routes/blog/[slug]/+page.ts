import type { Post } from '$lib/ts/posts';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	try {
		const post: { default: Component; metadata: Post } = await import(
			`../../../posts/${params.slug}.svx`
		);
		const thumbnail: string = (await import(`$assets/blog/thumbnails/${params.slug}.jpg`)).default;

		return {
			content: post.default,
			thumbnail,
			meta: post.metadata
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
};
