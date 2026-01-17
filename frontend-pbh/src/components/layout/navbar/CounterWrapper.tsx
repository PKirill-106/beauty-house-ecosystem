'use client'

import { useCart } from '@/providers/CartProvider'
import { useFavorites } from '@/providers/FavoritesProvider'
import { ICounterWrapper } from '@/types/interfacesProps'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'

export default function CounterWrapper({ children, type }: ICounterWrapper) {
	const { favorites } = useFavorites()
	const { cartProducts } = useCart()

	const products = type === 'favorites' ? favorites : cartProducts

	let link = ''
	if (type === 'favorites') {
		link = '/favorites'
	} else if (type === 'cart') {
		link = '/cart'
	}

	return (
		<Link href={link} className='relative'>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				transition={{ duration: 0.3 }}
			>
				{children}
			</motion.div>

			<AnimatePresence>
				{products!.length > 0 && (
					<motion.div
						key='count'
						className='absolute -bottom-3 left-3 md:left-auto md:-bottom-2 md:-right-2 bg-primary text-white text-[10px] md:text-xs rounded-full w-4 md:w-5 h-4 md:h-5 flex items-center justify-center'
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 20 }}
					>
						{products?.length}
					</motion.div>
				)}
			</AnimatePresence>
		</Link>
	)
}
