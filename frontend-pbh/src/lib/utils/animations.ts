import { Easing, Variants } from 'motion/react'

interface IAnimationParams {
	param: string
	initialValue: number | string
	finalValue: number | string
}

export const createVariants = (
	duration: number,
	params: IAnimationParams[] = [],
	ease: Easing = 'easeOut',
	delayChildren?: number | undefined,
): Variants => {
	const startState = params.reduce(
		(acc, p) => {
			acc[p.param] = p.initialValue
			return acc
		},
		{} as Record<string, number | string>,
	)

	const endState = params.reduce(
		(acc, p) => {
			acc[p.param] = p.finalValue
			return acc
		},
		{} as Record<string, number | string>,
	)

	return {
		initial: startState,
		animate: {
			...endState,
			transition: { duration, ease, delayChildren },
		},
	}
}

export const animateWidthAndHeight = createVariants(
	0.2,
	[
		{ param: 'height', initialValue: 0, finalValue: 'auto' },
		{ param: 'width', initialValue: 0, finalValue: 'auto' },
		{ param: 'opacity', initialValue: 0, finalValue: 1 },
	],
	'easeOut',
)

export const animateHeightWithChildren = createVariants(
	0.2,
	[
		{ param: 'height', initialValue: 0, finalValue: 'auto' },
		{ param: 'opacity', initialValue: 0, finalValue: 1 },
	],
	'easeInOut',
	0.1,
)

export const animateWidthAndHeightWithChildren = createVariants(
	0.2,
	[
		{ param: 'height', initialValue: 0, finalValue: 'auto' },
		{ param: 'width', initialValue: 0, finalValue: 'auto' },
		{ param: 'opacity', initialValue: 0, finalValue: 1 },
	],
	'easeInOut',
	0.1,
)
