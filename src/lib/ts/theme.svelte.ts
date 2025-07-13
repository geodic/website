import { browser } from '$app/environment';

export const theme = $state({
	systemDark: false,
	isDark: false
});

if (browser) {
	theme.systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	theme.isDark = document.documentElement.classList.toggle(
		'dark',
		localStorage.theme === 'dark' || (!('theme' in localStorage) && theme.systemDark)
	);
}

$effect.root(() => {
	$effect(() => {
		localStorage.theme = theme.isDark ? 'dark' : 'light';
		if (
			(theme.systemDark && localStorage.theme == 'dark') ||
			(!theme.systemDark && localStorage.theme == 'light')
		) {
			localStorage.removeItem('theme');
		}
		document.documentElement.classList.toggle('dark', theme.isDark);
	});

	return () => true;
});
