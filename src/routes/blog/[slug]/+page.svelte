<script lang="ts">
	import type { PageProps } from './$types';
	import { tailwind as tailwindUnsafe } from '$lib/ts/tailwind-transition.svelte';
	import { pageTransition } from '$lib/ts/page-transition.svelte';
	import { Separator } from 'bits-ui';

	const tailwind = pageTransition(tailwindUnsafe);

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="flex w-[90%] flex-1 flex-col items-center justify-start gap-3 sm:w-[70%]">
	<div class="overflow-hidden">
		<h1
			class="font-heading text-primary text-center text-4xl font-bold sm:text-5xl"
			transition:tailwind={{ in: 'translate-y-0', out: '-translate-y-[130%]' }}
		>
			{data.meta.title}
		</h1>
	</div>

	<time
		datetime={data.meta.date}
		class="font-info text-secondary text-sm"
		transition:tailwind={{ in: 'opacity-100', out: 'opacity-0' }}
		>Posted on: {new Date(data.meta.date).toLocaleDateString()}</time
	>

	<div class="flex gap-2" transition:tailwind={{ in: 'opacity-100', out: 'opacity-0' }}>
		{#each data.meta.tags as tag}
			<span
				class="font-info text-secondary-contrast bg-primary border-primary rounded-full px-1 text-sm"
				>&#35;{tag}</span
			>
		{/each}
	</div>

	<img
		src={data.thumbnail}
		alt={data.meta.title}
		class="h-auto w-[100%] rounded-lg sm:w-[80%]"
		transition:tailwind={{ in: 'opacity-100', out: 'opacity-0' }}
	/>

	<div class="h-fit w-full" transition:tailwind={{ in: 'opacity-100', out: 'opacity-0' }}>
		<Separator.Root class="bg-primary mt-2 mb-5 h-px w-full" />
	</div>

	<div
		class="markdown prose prose-zinc prose-md dark:prose-invert sm:prose-lg w-full max-w-none"
		transition:tailwind={{ in: 'opacity-100', out: 'opacity-0' }}
	>
		<data.content />
	</div>
</article>

<style lang="postcss">
	@reference "tailwindcss";

	.markdown :global {
		img {
			@apply rounded-lg;
		}
	}
</style>
