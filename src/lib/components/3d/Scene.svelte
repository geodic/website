<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { interactivity, CameraControls, type CameraControlsRef } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import noisejs from 'noisejs';
	// @ts-ignore
	const Noise: typeof noisejs = noisejs.Noise;

	import Orb from './Orb.svelte';
	import DoubleOrb from './DoubleOrb.svelte';
	import Renderer from './Renderer.svelte';

	let camera: CameraControlsRef;

	// Initialize the noise generator with a random seed
	const noise = new Noise(Math.random());

	// --- Orb Positions ---
	// Store initial positions to use as a base for movement
	const initialPositions = {
		doubleOrb1: [8, 4, 0],
		doubleOrb2: [-7.5, 3, 0],
		doubleOrb3: [-9, -4, 0],
		doubleOrb4: [-14.7, -6, 0],
		doubleOrb5: [2, 4, 0],
		doubleOrb6: [14.5, 0, 0],
		doubleOrb7: [-14.7, -0.5, 0],
		orb1: [8, -2.5, 0],
		orb2: [-2, -3, 0],
		orb3: [-14, 5, 0],
		orb4: [3, -5, 0],
		orb5: [12, -5, 0],
		orb6: [-2, 3, 0]
	};
	// Create reactive state for the current positions
	const positions = $state(JSON.parse(JSON.stringify(initialPositions)));

	// Add reactive light position state
	const initialLightPosition = [0, 10, 10] as [number, number, number];
	const lightPosition = $state<[number, number, number]>([...initialLightPosition]);

	// --- Mouse Move Camera Control ---
	onMount(() => {
		document.addEventListener('mousemove', (event) => {
			if (!camera) return;
			const x = (event.pageX / window.innerWidth - 0.5) * 0.4;
			const y = -(event.pageY / window.innerHeight - 0.5) * 0.4;
			camera.setTarget(x, y, 0, true);
		});
	});

	let time = 0;
	// --- Perlin Noise Movement Loop ---
	useTask((delta) => {
		time += delta * 0.1; // Slow down the effect
		const amplitude = 1; // How far the orbs move

		// update orbs
		for (const key in positions) {
			const initialPos = initialPositions[key as keyof typeof initialPositions];
			const currentPos = positions[key as keyof typeof positions];

			// Use the initial position as a unique seed for each orb's noise calculation
			const offsetX = noise.perlin2(time, initialPos[0]);
			const offsetY = noise.perlin2(time, initialPos[1]);

			currentPos[0] = initialPos[0] + offsetX * amplitude;
			currentPos[1] = initialPos[1] + offsetY * amplitude;
		}

		// update light position with noise
		const lx = noise.perlin2(time, initialLightPosition[0]);
		const ly = noise.perlin2(time, initialLightPosition[1]);
		const lz = noise.perlin2(time, initialLightPosition[2]);
		lightPosition[0] = initialLightPosition[0] + lx * amplitude;
		lightPosition[1] = initialLightPosition[1] + ly * amplitude;
		lightPosition[2] = initialLightPosition[2] + lz * amplitude;
	});

	interactivity();
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 15]}>
	<CameraControls bind:ref={camera} />
</T.PerspectiveCamera>

<T.DirectionalLight position={lightPosition} intensity={5} />

<!-- <Orb position={[8, 4, 0]} />
<Orb position={[9, 3.5, 0]} /> -->

<DoubleOrb position={positions.doubleOrb1} rotation={[0, 0, 30 * DEG2RAD]} />

<DoubleOrb position={positions.doubleOrb2} rotation={[0, 0, -20 * DEG2RAD]} />

<DoubleOrb position={positions.doubleOrb3} rotation={[0, 0, 20 * DEG2RAD]} />

<DoubleOrb position={positions.doubleOrb4} rotation={[0, 0, -45 * DEG2RAD]} />

<DoubleOrb position={positions.doubleOrb5} rotation={[0, 0, 45 * DEG2RAD]} />

<DoubleOrb position={positions.doubleOrb6} rotation={[0, 0, 90 * DEG2RAD]} />

<DoubleOrb position={positions.doubleOrb7} rotation={[0, 0, 90 * DEG2RAD]} />

<Orb position={positions.orb1} />

<Orb position={positions.orb2} />

<Orb position={positions.orb3} />

<Orb position={positions.orb4} />

<Orb position={positions.orb5} />

<Orb position={positions.orb6} />

<Renderer />
