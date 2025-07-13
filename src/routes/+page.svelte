<script lang="ts">
	import { tailwind as tailwindUnsafe } from '$lib/ts/tailwind-transition.svelte';
	import { pageTransition } from '$lib/ts/page-transition.svelte';

	const tailwind = pageTransition(tailwindUnsafe);

	let anecdotes = [
		'writing bugs faster than fixes',
		'productive is a flexible term right',
		'i swear this was easier in my head',
		'one more commit before i sleep...',
		'debugging at 2am builds character',
		'accidentally made it work again',
		"i'll fix it later",
		'sleep is for stable builds',
		'just one more side project',
		'temporarily working is still working',
		'this is fine. probably.',
		'the compiler didn’t say no',
		'trust me, it ran once',
		'i am the edge case',
		'still pretending this is productive'
	];
	let anecdote = anecdotes[Math.floor(Math.random() * anecdotes.length)];
</script>

<div class="overflow-hidden">
	<div
		class="font-heading text-4xl sm:text-5xl"
		transition:tailwind={{ in: 'translate-y-0', out: '-translate-y-[130%]' }}
	>
		Hey, its me, geodic
	</div>
</div>
<div class="overflow-hidden">
	<div
		class="font-info text-primary mt-2 mb-2 text-center text-lg sm:text-2xl"
		transition:tailwind={{ in: 'translate-y-0', out: '-translate-y-[130%]' }}
	>
		AI developer, backend engineer, & systems hacker
	</div>
</div>
<div class="overflow-hidden">
	<div
		class="font-info text-secondary text-base"
		transition:tailwind={{ in: 'translate-y-0', out: '-translate-y-[130%]' }}
	>
		{anecdote}
	</div>
</div>
