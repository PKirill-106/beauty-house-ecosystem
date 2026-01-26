'use client'
import { ICategoryItem } from '@/types/interfacesProps'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function CategoryItem(props: ICategoryItem) {
	const [isOpen, setIsOpen] = useState(false)

	const showSubcategories =
		props.showSubCat && props.subCatList && props.subCatList.length > 0

	return (
		<div className='space-y-2'>
			<div className='flex items-center justify-between'>
				<Link
					href={`/catalog/${props.category.slug}`}
					className='group flex items-center justify-between w-full hover-active-text'
				>
					{props.category.name}
					{showSubcategories && (
						<ChevronDown className='hidden md:inline group-hover:rotate-90 transition-all duration-300 ease-out' />
					)}
				</Link>

				{showSubcategories && (
					<button onClick={() => setIsOpen(!isOpen)} className='m-2 md:hidden'>
						<ChevronRight
							className={`hover:rotate-90 transition-all duration-300 ease-out ${isOpen ? 'rotate-90' : ''}`}
						/>
					</button>
				)}
			</div>

			{showSubcategories && isOpen && (
				<div className='flex'>
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
				</div>
			)}
		</div>
	)
}
