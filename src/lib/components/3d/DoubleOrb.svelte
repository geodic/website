<script lang="ts">
	import { T } from '@threlte/core';
	import Orb from './Orb.svelte';

	interface Props {
		position?: [number, number, number];
		rotation?: [number, number, number];
	}

	let { position = [0, 0, 0], rotation = [0, 0, 0] }: Props = $props();
</script>

<T.Group {position} {rotation}>
	<Orb />
	<Orb position={[1, 0, 0]} />
</T.Group>
