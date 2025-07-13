import { beforeNavigate, goto } from '$app/navigation';
import { page } from '$app/state';

type Transition = (
	node: HTMLElement,
	params: any,
	options: { direction: 'in' | 'out' | 'both' }
) => {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	css?: (t: number, u: number) => string;
	tick?: (t: number, u: number) => void;
};

type TransitionState = {
	pending: number;
	status: boolean;
};

let navDest = $state('');

export let transition = $state<TransitionState>({
	pending: 0,
	status: false
});

export function enablePageTransitions() {
	beforeNavigate((nav) => {
		console.log(
			`beforeNavigate: ${page.url.toString()} -> ${nav.to?.url.toString()}. transition status: ${transition.status}`
		);
		if (
			nav.to === null ||
			nav.to?.url.host !== page.url.host ||
			nav.to?.url.toString() === page.url.toString() ||
			transition.status
		) {
			console.log('no transition needed, navigating normally');
			// if the current page does not request to wait for transition, then dont do anything,
			// and let the nav happen normally.
			navDest = '';
			return;
		}

		console.log(`blocking nav to ${nav.to?.url.toString()}`);
		// DO NOT CHANGE THE ORDER OF THE FOLLOWING THREE STATEMENTS. The timing is crucial to prevent stalling.
		transition.status = true;
		nav.cancel();
		navDest = nav.to?.url.toString() || '/';
	});

	$effect.root(() => {
		$effect(() => {
			console.log(`unfinished transitions: ${transition.pending}, navDest: ${navDest}`);
			if (transition.pending === 0 && navDest !== '') {
				console.log(`transitions finished... navigating to ${navDest}`);
				// if there are no running transitions, then we can navigate to the new page.
				// this is done to prevent the page from navigating before the transition is done.
				goto(navDest).then(() => {
					transition.status = false;
				});
			}
		});

		return () => true;
	});
}

export function pageTransition(transitionFunc: Transition): Transition {
	return (element: HTMLElement, params: unknown, options: { direction: 'in' | 'out' | 'both' }) => {
		const original = transitionFunc(element, params, options);
		let started = false;

		transition.pending++;

		let wrap = <T, U extends (t: number, u: number) => T>(animFunc: U): U => {
			return ((t: number, u: number) => {
				if (t !== 0 && t !== 1 && !started) {
					started = true;
				}
				if (!started) {
					console.log(`starting transition: t=${t}, u=${u}`);
				} else if ((t === 0 || t === 1) && started) {
					console.log(`ending transition: t=${t}, u=${u}`);
					transition.pending--;
				}
				return animFunc(t, u);
			}) as U;
		};

		return {
			delay: original.delay || undefined,
			duration: original.duration || undefined,
			easing: original.easing || undefined,
			css: original.css ? wrap(original.css) : undefined,
			tick: original.tick ? wrap(original.tick) : undefined
		};
	};
}
