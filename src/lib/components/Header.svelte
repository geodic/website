<script lang="ts">
	import { Avatar, Button, NavigationMenu } from 'bits-ui';

	import MenuStatic from 'virtual:icons/line-md/menu';
	import Menu from 'virtual:icons/line-md/close-to-menu-transition';
	import Close from 'virtual:icons/line-md/menu-to-close-transition';
	import SunStatic from 'virtual:icons/line-md/sunny-filled-loop';
	import MoonStatic from 'virtual:icons/line-md/moon-filled-alt-loop';
	import Sun from 'virtual:icons/line-md/moon-filled-alt-to-sunny-filled-loop-transition';
	import Moon from 'virtual:icons/line-md/sunny-filled-loop-to-moon-filled-alt-loop-transition';
	import Chevron from 'virtual:icons/line-md/chevron-up';

	import { delayValue } from '$lib/ts/tailwind-transition.svelte';

	import { theme } from '$lib/ts/theme.svelte';

	let { class: className = '', ...restProps } = $props();

	let menuOpen = $state(false);
	let menuInteracted = $state(false);
	let themeInteracted = $state(false);
	let scrolled = $state(false);
	let delayedScrolled = $state(false);
	let delayedScrolledTimeout = setTimeout(() => false, 0);

	function handleScroll() {
		menuOpen = false;
		scrolled = window.scrollY > 60;
		if (!scrolled) {
			clearTimeout(delayedScrolledTimeout);
			delayedScrolledTimeout = setTimeout(() => {
				delayedScrolled = false;
			}, 200);
		} else {
			clearTimeout(delayedScrolledTimeout);
			delayedScrolled = true;
		}
	}

	$effect(() => {
		handleScroll();
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

{#snippet navLink(href: string, name: string)}
	<NavigationMenu.Item class="overflow-hidden">
		<NavigationMenu.Link
			{href}
			class="peer text-background group-hover:text-secondary-contrast hover:text-background font-info pointer-events-auto"
		>
			{name}
		</NavigationMenu.Link>
		<div
			class="bg-background relative bottom-1 h-0.5 w-full -translate-x-[100%] transition-transform duration-300 ease-in-out peer-hover:translate-x-0"
		></div>
	</NavigationMenu.Item>
{/snippet}

<!-- class:inset-x-12={!scrolled} class:left-12={scrolled} -->
<header
	class={`bg-primary fixed top-4 left-12 flex items-center gap-4 rounded-full px-3 shadow-2xl ${scrolled ? 'w-auto' : 'w-[calc(100%_-_6rem)]'} h-10 ${menuOpen ? '' : scrolled ? 'sm:shadow-black' : 'shadow-black'} duration-200 ${menuOpen ? '' : scrolled ? 'sm:dark:shadow-white' : 'dark:shadow-white'}`}
	{...restProps}
>
	<div class="@container flex flex-1 items-center" class:hidden={delayedScrolled}>
		<NavigationMenu.Root class="w-full max-w-90 pr-12 pl-6 text-lg @max-[15.5rem]:hidden">
			<NavigationMenu.List
				class="group pointer-events-none flex items-center justify-between duration-250 ease-linear"
			>
				{@render navLink('/contact', 'contact')}
				{@render navLink('/blog', 'blog')}
				{@render navLink('/projects', 'projects')}
			</NavigationMenu.List>
		</NavigationMenu.Root>
		<Button.Root
			onclick={() => {
				menuOpen = !menuOpen;
				menuInteracted = true;
			}}
			{...restProps}
			class="text-background size-5 border-none bg-transparent @min-[15.5rem]:hidden"
		>
			{#if !menuInteracted}
				<MenuStatic />
			{:else if !menuOpen}
				<Menu />
			{:else}
				<Close />
			{/if}
		</Button.Root>
	</div>
	<div class="font-heading flex flex-0 items-center justify-center text-xl">
		<Button.Root class="text-background flex gap-2 border-none bg-transparent" href="/">
			<Avatar.Root delayMs={200} class="size-6 overflow-hidden rounded-full">
				<Avatar.Image src="$assets/web/images/avatar.png" alt="@geodic" />
				<Avatar.Fallback class="border-muted border">G</Avatar.Fallback>
			</Avatar.Root>
			<div class:hidden={delayedScrolled}>geodic</div>
		</Button.Root>
	</div>
	<div class="relative flex size-5 flex-1 items-center justify-end">
		<Button.Root
			onclick={() => {
				theme.isDark = !theme.isDark;
				themeInteracted = true;
			}}
			class={`text-background absolute ${delayedScrolled ? 'z-0' : 'z-1'} inset-y-0 right-0 size-5 border-none bg-transparent ${delayedScrolled ? 'opacity-0' : ''}`}
		>
			{#if !themeInteracted}
				{#if theme.isDark}
					<SunStatic />
				{:else}
					<MoonStatic />
				{/if}
			{:else if theme.isDark}
				<Sun />
			{:else}
				<Moon />
			{/if}
		</Button.Root>
		<Button.Root
			onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			class={`text-background absolute ${!delayedScrolled ? 'z-0' : 'z-1'} inset-y-0 right-0 size-5 border-none bg-transparent ${!delayedScrolled ? 'opacity-0' : ''}`}
		>
			<Chevron />
		</Button.Root>
	</div>
</header>

<header
	class="bg-primary fixed inset-x-8 top-16 flex h-10 items-center gap-6 rounded-full px-3 shadow-2xl duration-200"
	class:opacity-0={!menuOpen}
>
	<NavigationMenu.Root class="w-full px-6 text-lg">
		<NavigationMenu.List
			class="text-background hover:text-secondary-contrast pointer-events-none flex items-center justify-between duration-250 ease-linear"
		>
			{@render navLink('/contact', 'contact')}
			{@render navLink('/blog', 'blog')}
			{@render navLink('/projects', 'projects')}
		</NavigationMenu.List>
	</NavigationMenu.Root>
</header>
