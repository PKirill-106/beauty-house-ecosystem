'use client'
import {
	desktopCategoryVariants,
	mobileCategoryVariants,
} from '@/lib/utils/animations'
import { ICategoryItem } from '@/types/interfacesProps'
import { ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

export default function CategoryItem(props: ICategoryItem) {
	const [isOpen, setIsOpen] = useState(false)

	const isDesktop = useMediaQuery('(min-width: 768px)')

	const showSubcategories =
		props.showSubCat && props.subCatList && props.subCatList.length > 0

	return (
		<div onMouseLeave={() => isDesktop && setIsOpen(false)}>
			<div
				onMouseEnter={() => isDesktop && setIsOpen(true)}
				className='flex items-center justify-between'
			>
				<Link
					href={`/catalog/${props.category.slug}`}
					className='group flex items-center justify-between w-full hover-active-text'
				>
					{props.category.name}
					{showSubcategories && (
						<ChevronRight className='hidden md:inline group-hover:rotate-90 transition-all duration-300 ease-out' />
					)}
				</Link>

				{showSubcategories && (
					<button
						onClick={() => setIsOpen(prev => !prev)}
						className='m-2 md:hidden'
					>
						<ChevronRight
							className={`hover:rotate-90 transition-all duration-300 ease-out ${isOpen ? 'rotate-90' : ''}`}
						/>
					</button>
				)}
			</div>

			<AnimatePresence>
				{showSubcategories && isOpen && (
					<motion.div
						initial='invisible'
						animate='visible'
						exit='invisible'
						variants={
							isDesktop ? desktopCategoryVariants : mobileCategoryVariants
						}
						className={`${props.subCatStyle ?? ''} overflow-hidden`}
					>
						<div className='md:hidden w-px bg-transparent-text py-5' />
						<ul>
							{props.subCatList!.map(sub => (
								<li key={sub.id}>
									<Link
										href={`/catalog/${props.category.slug}/${sub.slug}`}
										className='block px-2 pr-3 py-2 hover-active-text transition-colors whitespace-nowrap'
									>
										{sub.name}
									</Link>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
