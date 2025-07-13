<script lang="ts">
	import { T } from '@threlte/core';

	interface Props {
		position?: [number, number, number];
		rotation?: [number, number, number];
	}

	let { position = [0, 0, 0], rotation = [0, 0, 0] }: Props = $props();
</script>

<T.Mesh {position} {rotation}>
	<T.IcosahedronGeometry args={[1, 5]} />
	<T.MeshPhysicalMaterial
		color={0x00ff00}
		transmission={1}
		opacity={1}
		metalness={0}
		roughness={0}
		ior={1.5}
		thickness={5}
		emissive={0x00ff00}
		emissiveIntensity={1}
	/>
</T.Mesh>
