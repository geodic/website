import { linear } from 'svelte/easing';

function toMS(s: string): number {
	return parseFloat(s) * (/\ds$/.test(s) ? 1000 : 1);
}

function reflow(element?: HTMLElement) {
	if (element === undefined) {
		element = document.documentElement;
	}
	void element.offsetHeight;
}

export function tailwind<T extends 'in' | 'out' | 'both'>(
	node: HTMLElement,
	params: {
		from: T extends 'out' ? undefined : T extends 'both' ? undefined | string : string;
		in: T extends 'out' ? undefined : string;
		out: T extends 'in' ? undefined : string;
		delay?: number;
		duration?: number;
	},
	options: { direction: T }
) {
	const from = params.from || params.out;
	const style = getComputedStyle(node);
	const properties = style.getPropertyValue('transition-property');
	const delay = params.delay || toMS(style.getPropertyValue('transition-delay')) || 0;
	const duration = params.duration || toMS(style.getPropertyValue('transition-duration')) || 0;
	console.log(
		`tailwind transition: delay=${delay}ms, duration=${duration}ms, easing=linear, properties=${properties}`
	);
	let started = false;
	let setup = false;

	return {
		delay,
		duration,
		easing: linear,
		tick: (t: number) => {
			if (t !== 0 && t !== 1 && !started) {
				started = true;
			}
			if (t === 0 && !setup && options.direction !== 'out') {
				setup = true;
				node.style.transitionProperty = 'none';
				node.classList.add(...(from as string).split(' '));
				reflow(node);
				node.style.transitionProperty = properties;
				node.classList.remove(...(from as string).split(' '));
				node.classList.add(...(params.in as string).split(' '));
			} else if (t === 1 && !setup && options.direction !== 'in') {
				setup = true;
				node.classList.add(...(params.out as string).split(' '));
			} else if (t === 1 && started && options.direction !== 'out') {
				node.classList.remove(...(params.in as string).split(' '));
			}
		}
	};
}
