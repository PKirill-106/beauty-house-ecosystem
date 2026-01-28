'use client'
import {
	animateHeightWithChildren,
	animateWidthAndHeight,
	animateWidthAndHeightWithChildren,
} from '@/lib/utils/animations'
import { getCategoryPath, getSubcategories } from '@/lib/utils/helpers'
import { ICategoryItem } from '@/types/interfacesProps'
import { ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

export default function CategoryItem(props: ICategoryItem) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const isDesktop = useMediaQuery('(min-width: 768px)')

	const showSubcategories =
		props.showSubCat && props.subCatList && props.subCatList.length > 0

	return (
		<div
			onMouseLeave={() => isDesktop && props.level === 0 && setIsOpen(false)}
			className={`w-full relative md:flex ${props.level === 0 && props.showSubCat ? 'md:justify-center md:items-center' : 'md:flex-col'} `}
		>
			<div
				onMouseEnter={() => isDesktop && props.level === 0 && setIsOpen(true)}
				className={`flex items-center justify-center ${props.level === 0 ? 'gap-3' : 'w-full'}`}
			>
				<Link
					href={`/catalog/${getCategoryPath(
						props.category,
						props.categories || [],
					)}`}
					className={`group flex items-center justify-between w-full! ${props.level === 0 && 'hover-active-text'} `}
				>
					<span
						className={`${props.showSubCat && 'list-size font-semibold line-clamp-1'} ${props.level !== 0 && 'w-full hover-active-text'}`}
					>
						{props.category.name}
					</span>
					{showSubcategories && (
						<ChevronRight
							className={`link-size hidden md:inline hover-active-text shrink-0 ${props.level === 0 ? 'group-hover:rotate-90 transition-all duration-300 ease-out' : 'hidden!'} ${isOpen && 'rotate-90'}`}
						/>
					)}
				</Link>

				{showSubcategories && (
					<button
						onClick={() => setIsOpen(prev => !prev)}
						className={`m-2 ${props.level === 0 ? 'md:hidden' : 'hover-active-text'}`}
					>
						<ChevronRight
							className={`link-size transition-all duration-300 ease-out ${isOpen && 'rotate-90'}`}
						/>
					</button>
				)}
			</div>

			<AnimatePresence>
				{showSubcategories && isOpen && (
					<motion.div
						initial='initial'
						animate='animate'
						exit='initial'
						variants={
							isDesktop
								? props.level === 0
									? animateHeightWithChildren
									: animateWidthAndHeight
								: animateWidthAndHeightWithChildren
						}
						className={`${props.subCatStyle ?? ''}`}
					>
						<div
							className={`w-px bg-transparent-text py-5 ${props.level === 0 ? 'md:hidden' : ''}`}
						/>
						<ul>
							{props.subCatList!.map(sub => (
								<li
									key={sub.id}
									className='block px-2 pr-3 py-4 w-full transition-colors whitespace-nowrap'
								>
									<CategoryItem
										category={sub}
										subCatList={getSubcategories(props.categories!, sub.id)}
										categories={props.categories}
										level={props.level + 1}
										showSubCat={props.showSubCat}
										subCatStyle='flex min-w-full md:bg-neutral-100 rounded-md'
									/>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
