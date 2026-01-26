import { Easing, Variants } from 'motion/react'

const createCategoryVariants = (
	duration: number,
	ease: Easing = 'easeOut',
): Variants => ({
	invisible: { height: 0, opacity: 0 },
	visible: {
		height: 'auto',
		opacity: 1,
		transition: { duration, ease },
	},
})

export const mobileCategoryVariants = createCategoryVariants(0.3, 'easeOut')
export const desktopCategoryVariants = createCategoryVariants(0.2, 'easeInOut')
