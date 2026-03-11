'use client'
import { useFilters } from '@/providers/FilterProvider'
import Section from '../ui/Section'
import PaginationControls from './PaginationControls'
import ProductFilters from './ProductFilters'
import ProductGridSection from './ProductGridSection'

export default function CatalogClient() {
	const { activeCategory, totalPages } = useFilters()

	return (
		<>
			<Section className='py-0'>
				<h2 className='mb-6'>{activeCategory?.name || 'Каталог'}</h2>
				<ProductFilters />
			</Section>
			<ProductGridSection />
			<PaginationControls totalPages={totalPages} />
		</>
	)
}
