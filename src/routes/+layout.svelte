<script lang="ts">
	import '../app.css';

	import { page } from '$app/state';
	import { enablePageTransitions, transition } from '$lib/ts/page-transition.svelte';

	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/3d/Scene.svelte';

	import Header from '$lib/components/Header.svelte';
	import { WebGLRenderer } from 'three';
	import type { Attachment } from 'svelte/attachments';

	let { children } = $props();
	let canvas: Attachment<HTMLCanvasElement> = (canvas) => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let w: number, h: number;
		let animationFrameId: number;
		let imageData: ImageData;
		let buffer32: Uint32Array;
		let len: number;

		const noise = () => {
			if (!ctx) return;
			const light = 0xffffffff;
			const dark = 0xff000000;

			for (let i = 0; i < len; i++) {
				buffer32[i] = Math.random() < 0.5 ? light : dark;
			}
			ctx.putImageData(imageData, 0, 0);
		};

		const loop = () => {
			noise();
			animationFrameId = requestAnimationFrame(loop);
		};

		const setup = () => {
			w = canvas.width = window.innerWidth;
			h = canvas.height = window.innerHeight;

			imageData = ctx.createImageData(w, h);
			buffer32 = new Uint32Array(imageData.data.buffer);
			len = buffer32.length;

			if (animationFrameId) cancelAnimationFrame(animationFrameId);
			loop();
		};

		window.addEventListener('resize', setup);
		setup();

		return () => {
			window.removeEventListener('resize', setup);
			cancelAnimationFrame(animationFrameId);
		};
	};
	let show3D = $derived(page.url.pathname === '/');

	enablePageTransitions();

	function createRenderer(canvas: HTMLCanvasElement) {
		const renderer = new WebGLRenderer({
			canvas,
			antialias: true
		});

		renderer.setClearColor(0x000000, 0);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.shadowMap.enabled = true;

		return renderer;
	}
</script>

<div class="text-primary bg-background relative z-0 min-h-dvh min-w-full overflow-hidden">
	<div class="fixed inset-0 z-[-2] h-dvh w-dvw transition-opacity" class:opacity-0={!show3D}>
		<Canvas {createRenderer}>
			<Scene />
		</Canvas>
	</div>
	<canvas {@attach canvas} class="fixed inset-0 z-[-1] h-dvh w-dvw opacity-4"></canvas>
	<Header />
	<main
		class="text-primary mt-30 mb-26 flex min-h-[calc(100dvh_-_14rem)] min-w-full flex-col items-center justify-center"
	>
		{#if !transition.status}
			{@render children()}
		{/if}
	</main>
</div>
