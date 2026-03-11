'use client'
import { useFilters } from '@/providers/FilterProvider'
import ProductFilters from './ProductFilters'
import ProductGrid from './ProductGrid'
import PaginationControls from './PaginationControls'
import Section from '../ui/Section'

export default function CatalogClient() {
	const { activeCategory, totalPages } = useFilters()

	return (
		<>
			{' '}
			<Section>
				<h2 className='mb-6'>{activeCategory?.name || 'Каталог'}</h2>
				<ProductFilters />
			</Section>
			<ProductGrid />
			<PaginationControls totalPages={totalPages} />
		</>
	)
}
