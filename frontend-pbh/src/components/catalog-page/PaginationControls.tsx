'use client'
import { useFilters } from '@/providers/FilterProvider'
import { IPaginationControlsProps } from '@/types/interfacesProps'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Section from '../ui/Section'

export default function PaginationControls({
	totalPages,
}: IPaginationControlsProps) {
	const { pageRange, createPageLink, currentPage } = useFilters()

	return (
		<Section className='flex justify-center py-0'>
			<div className='flex space-x-2 items-center'>
				{/* Prev button */}
				{currentPage > 1 ? (
					<Link
						href={createPageLink(currentPage - 1)}
						className='flex items-center hover:text-primary li-hover'
					>
						<ChevronLeft className='h-7 w-7 md:h-6 md:w-6' />
					</Link>
				) : (
					<div className='flex items-center text-transparent-text'>
						<ChevronLeft className='h-7 w-7 md:h-6 md:w-6' />
					</div>
				)}

				{/* Page numbers */}
				{pageRange.map(page => (
					<Link
						key={page}
						href={createPageLink(page)}
						className={`w-8 h-8 flex items-center justify-center border rounded text-sm transition ${
							page === currentPage
								? 'bg-primary text-white'
								: 'hover:border-primary border-transparent-text'
						}`}
					>
						{page}
					</Link>
				))}

				{/* Next button */}
				{currentPage < totalPages ? (
					<Link
						href={createPageLink(currentPage + 1)}
						className='flex items-center hover:text-primary li-hover'
					>
						<ChevronRight className='h-7 w-7 md:h-6 md:w-6' />
					</Link>
				) : (
					<div className='flex items-center text-transparent-text'>
						<ChevronRight className='h-7 w-7 md:h-6 md:w-6' />
					</div>
				)}
			</div>
		</Section>
	)
}
