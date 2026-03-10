'use client'

import { useGetCategoriesQuery } from '@/state/category/categoryApiSlice'
import { useGetProductsQuery } from '@/state/product/productApiSlice'
import { ICategory, IProduct } from '@/types/interfacesApi'
import transliterate from '@sindresorhus/transliterate'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
} from 'react'
const slugify = require('slugify')

interface FilterContextType {
	getSlug: (text: string) => string
	getIsChecked: (text: string) => boolean
	toggleFilter: (text: string) => void
	activeCategory: ICategory | undefined
	filteredProducts: IProduct[] | undefined
	paginatedProducts: IProduct[]
	categories: ICategory[]
	isLoading: boolean
	PRODUCTS_PER_PAGE: number
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

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

	const PRODUCTS_PER_PAGE = 24

	const getSlug = useCallback((text: string) => {
		return slugify(transliterate(text))
	}, [])

	const getIsChecked = useCallback(
		(text: string) => {
			const id = getSlug(text)
			return searchParams.get(id) === 'true'
		},
		[searchParams, getSlug],
	)

	const toggleFilter = useCallback(
		(text: string) => {
			const id = getSlug(text)
			const params = new URLSearchParams(searchParams.toString())

			if (params.get(id) === 'true') {
				params.delete(id)
			} else {
				params.set(id, 'true')
			}

			params.delete('page')

			router.push(`${pathname}?${params.toString()}`, { scroll: false })
		},
		[getSlug, pathname, router, searchParams],
	)

	const splitPath = pathname.split('/')

	const activeCategorySlug =
		splitPath.length > 0 ? splitPath[splitPath.length - 1] : null

	const activeCategory = categories?.find(c => c.slug === activeCategorySlug)

	const filteredProducts = useMemo(() => {
		if (!products) return []
		let result = [...products]

		//Select filters
		if (activeCategory) {
			result = result.filter(p => p.categoryId === activeCategory.id)
		}

		//Color filters
		const color = searchParams.get('color')
		if (color) {
			result = result.filter(p => p.colors.some(c => c.name === color))
		}

		// Checkbox filters
		if (searchParams.get('sezon') === 'true')
			result = result.filter(p => p.isSeasonal)
		if (searchParams.get('akciya') === 'true')
			result = result.filter(p => p.isDiscounted)
		if (searchParams.get('novinki') === 'true')
			result = result.filter(p => p.isNew)

		// Sorting
		if (searchParams.get('sort') === 'price-asc') {
			result.sort(
				(a, b) => a.productVariants[0].price - b.productVariants[0].price,
			)
		} else if (searchParams.get('sort') === 'price-desc') {
			result.sort(
				(a, b) => b.productVariants[0].price - a.productVariants[0].price,
			)
		}

		return result
	}, [products, categories, activeCategory, searchParams, getSlug])

	return (
		<FilterContext.Provider
			value={{
				getSlug,
				getIsChecked,
				toggleFilter,
				activeCategory,
				filteredProducts,
				paginatedProducts: filteredProducts,
				categories: categories!,
				isLoading,
				PRODUCTS_PER_PAGE,
			}}
		>
			{children}
		</FilterContext.Provider>
	)
}

export const useFilters = () => {
	const context = useContext(FilterContext)
	if (!context) throw new Error('useFilters must be used within FilterProvider')
	return context
}
