<script lang="ts">
	import type { PageProps } from './$types';
	import { tailwind as tailwindUnsafe } from '$lib/ts/tailwind-transition.svelte';
	import { pageTransition } from '$lib/ts/page-transition.svelte';
	import { Button } from 'bits-ui';

	const tailwind = pageTransition(tailwindUnsafe);

	let { data }: PageProps = $props();
</script>

{#each data.posts as post}
	<div transition:tailwind={{ in: 'opacity-100', out: 'opacity-0' }} class="flex justify-center">
		<Button.Root
			href={'/blog/' + post.meta.slug}
			class="bg-highlight sm:hover:bg-highlight text-primary flex h-fit w-[80%] flex-col gap-3 rounded-xl p-3 sm:w-[60%] sm:flex-row sm:bg-transparent"
		>
			<div class="hidden aspect-square overflow-hidden rounded-xl sm:block">
				<img src={post.thumbnail} alt={post.meta.title} class="h-full w-full object-cover" />
			</div>

			<div class="text-primary flex min-w-[90%] flex-col justify-center">
				<div class="font-heading text-xl sm:text-3xl">{post.meta.title}</div>
				<div class="text-info">{new Date(post.meta.date).toLocaleDateString()}</div>
				<div class="text-info">{post.meta.description}</div>
			</div>
		</Button.Root>
	</div>
{/each}
