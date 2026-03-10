'use client'
import { useFilters } from '@/providers/FilterProvider'
import ProductFilters from './ProductFilters'
import ProductGrid from './ProductGrid'

export default function CatalogClient() {
	const { categories, paginatedProducts, activeCategory } = useFilters()
console.log(categories, paginatedProducts, activeCategory)
	return (
		<>
			<h2 className='mb-6'>{activeCategory?.name || 'Каталог'}</h2>

			<ProductFilters />

			<ProductGrid categories={categories} products={paginatedProducts} />

			{/* <PaginationControls totalPages={totalPages} /> */}
		</>
	)
}
