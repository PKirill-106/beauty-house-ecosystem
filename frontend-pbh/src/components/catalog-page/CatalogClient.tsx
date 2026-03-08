'use client'
import { useGetCategoriesQuery } from '@/state/category/categoryApiSlice'
import { useGetProductsQuery } from '@/state/product/productApiSlice'
import { CatalogPageProps } from '@/types/interfacesProps'
import { use } from 'react'
import PaginationControls from './PaginationControls'
import ProductFilters from './ProductFilters'
import ProductGrid from './ProductGrid'

export default function CatalogClient({
	params,
	searchParams,
}: CatalogPageProps) {
	const resolvedParams = use(params)
	const resolvedSearchParams = use(searchParams)

	const {
		data: products,
		isLoading: isProdLoading,
		isError: isProdError,
	} = useGetProductsQuery()
	const {
		data: categories,
		isLoading: isCatLoading,
		isError: isCatError,
	} = useGetCategoriesQuery()

	const isLoading = isProdLoading || isCatLoading
	const isError = isProdError || isCatError

	if (!products || !categories || isError) return

	const slug = resolvedParams.slug || []
	const categorySlug = slug[0] || null
	const subcategorySlug = slug[1] || null

	const activeCategory = categories!.find(
		(cat: any) => cat.slug === categorySlug && !cat.parentCategoryId,
	)
	const activeSubcategory = categories.find(
		(cat: any) => cat.slug === subcategorySlug && cat.parentCategoryId,
	)

	let filteredProducts = [...products]
	if (activeSubcategory) {
		filteredProducts = products.filter(
			(p: any) => p.categoryId === activeSubcategory.id,
		)
	} else if (activeCategory) {
		const subIds = categories
			.filter((c: any) => c.parentCategoryId === activeCategory.id)
			.map((c: any) => c.id)
		filteredProducts = products.filter(
			(p: any) =>
				p.categoryId === activeCategory.id || subIds.includes(p.categoryId),
		)
	}

	const PRODUCTS_PER_PAGE = 12
	const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
	const paginatedProducts = filteredProducts.slice(0, PRODUCTS_PER_PAGE)

	return (
		<>
			<h2 className='mb-6'>
				{activeSubcategory?.name || activeCategory?.name || 'Каталог'}
			</h2>

			<ProductFilters
				categories={categories}
				activeCategory={categorySlug!}
				activeSubcategory={subcategorySlug!}
			/>

			<ProductGrid categories={categories} products={paginatedProducts} />

			<PaginationControls totalPages={totalPages} />
		</>
	)
}
