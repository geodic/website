<script lang="ts">
	import { tailwind as tailwindUnsafe } from '$lib/ts/tailwind-transition.svelte';
	import { pageTransition } from '$lib/ts/page-transition.svelte';
	import { Separator } from 'bits-ui';

	const tailwind = pageTransition(tailwindUnsafe);
</script>

<div class="flex w-[70%] flex-col items-start justify-center">
	<div class="overflow-hidden">
		<div
			class="font-heading text-4xl sm:text-5xl"
			transition:tailwind={{ in: 'translate-y-0', out: '-translate-y-[130%]' }}
		>
			Hello
		</div>
	</div>
	<div class="w-full" transition:tailwind={{ in: 'opacity-100', out: 'opacity-0' }}>
		<Separator.Root class="bg-primary my-1 h-px w-full" />
	</div>
	<div
		class="text-primary flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 text-lg sm:text-2xl"
		transition:tailwind={{ in: 'opacity-100', out: 'opacity-0' }}
	>
		<div class="flex gap-5">
			<div class="font-heading">Email</div>
			<div
				class="font-info leading-normal"
				transition:tailwind={{ in: 'opacity-100', out: 'opacity-0' }}
			>
				hello@geodic.dev
			</div>
		</div>
		<div class="flex gap-5">
			<div class="font-heading">Email</div>
			<div class="font-info leading-normal">hello@geodic.dev</div>
		</div>
		<div class="max-w-10"></div>
	</div>
</div>
