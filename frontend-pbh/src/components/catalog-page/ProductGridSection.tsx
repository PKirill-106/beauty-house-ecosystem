'use client'

import { useFilters } from '@/providers/FilterProvider'
import ProductGrid from '../ui/product-card/ProductGrid'
import Section from '../ui/Section'

export default function ProductGridSection() {
	const { isLoading, paginatedProducts, PRODUCTS_PER_PAGE } = useFilters()
	return (
		<Section className='py-0'>
			<ProductGrid
				isLoading={isLoading}
				displayedProducts={paginatedProducts}
				skeletArrLength={PRODUCTS_PER_PAGE}
			/>
		</Section>
	)
}
