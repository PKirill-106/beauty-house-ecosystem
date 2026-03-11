'use client'

import { getCategoryPath, getSubCategoryProducts } from '@/lib/utils/helpers'
import { useGetCategoriesQuery } from '@/state/category/categoryApiSlice'
import { useGetProductsQuery } from '@/state/product/productApiSlice'
import { ICategory, IProduct } from '@/types/interfacesApi'
import transliterate from '@sindresorhus/transliterate'
import {
	ReadonlyURLSearchParams,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
} from 'react'
const slugify = require('slugify')

interface FilterContextType {
	searchParams: ReadonlyURLSearchParams
	handleCategorySelect: (currentCat: ICategory) => void
	handleSelect: () => void
	getSlug: (text: string) => string
	getIsChecked: (text: string) => boolean
	toggleFilter: (key: string, value?: string) => void
	activeChain: ICategory[]
	activeCategory: ICategory | undefined
	filteredProducts: IProduct[] | undefined
	paginatedProducts: IProduct[]
	categories: ICategory[]
	isLoading: boolean
	totalPages: number
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
		return slugify(transliterate(text)).toLowerCase()
	}, [])

	const getIsChecked = useCallback(
		(text: string) => {
			const id = getSlug(text)
			return searchParams.get(id) === 'true'
		},
		[searchParams, getSlug],
	)

	const splitPath = pathname.split('/').filter(Boolean)

	const activeChain = useMemo(() => {
		if (!categories || splitPath.length === 0) return []

		const chain: ICategory[] = []
		let currentParentId: string | null = null

		for (const slug of splitPath) {
			if (slug === 'catalog') continue

			const found = categories.find(
				c =>
					c.slug === slug &&
					(c.parentCategoryId === currentParentId || !currentParentId),
			)

			if (found) {
				chain.push(found)
				currentParentId = found.id
			}
		}
		return chain
	}, [categories, splitPath])

	const activeCategory = useMemo(() => {
		if (!categories || splitPath.length === 0) return undefined

		const lastSegment = splitPath[splitPath.length - 1]
		if (lastSegment === 'catalog') return undefined

		return categories.find(c => c.slug === lastSegment)
	}, [categories, splitPath])

	const filteredProducts = useMemo(() => {
		if (!products || !categories || isLoading) return []
		let result = [...products]

		//Select filters
		if (activeCategory) {
			result = result.filter(p =>
				getSubCategoryProducts(categories, p, activeCategory.name),
			)
		}

		//Color filters
		const color = searchParams.get('color')
		if (color) {
			result = result.filter(p => p.colors.some(c => getSlug(c.name) === color))
		}

		// Checkbox filters
		if (searchParams.get('sezon') === 'true')
			result = result.filter(p => p.isSeasonal)
		if (searchParams.get('aktsiya') === 'true')
			result = result.filter(p => p.isDiscounted)
		if (searchParams.get('novinki') === 'true')
			result = result.filter(p => p.isNew)

		// Sorting
		if (searchParams.get('sort') === 'price_asc') {
			result.sort(
				(a, b) => a.productVariants[0].price - b.productVariants[0].price,
			)
		} else if (searchParams.get('sort') === 'price_desc') {
			result.sort(
				(a, b) => b.productVariants[0].price - a.productVariants[0].price,
			)
		}

		return result
	}, [products, categories, activeCategory, searchParams, getSlug])

	const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

	const handleCategorySelect = useCallback(
		(currentCat: ICategory) => {
			const newPath = `/catalog/${getCategoryPath(currentCat, categories!)}`
			router.push(newPath)
			console.log(newPath)
		},
		[activeChain, router],
	)

	const toggleFilter = useCallback(
		(key: string, value?: string) => {
			const id = getSlug(key)
			const params = new URLSearchParams(searchParams.toString())

			if (!value) {
				if (params.get(id) === 'true') {
					params.delete(id)
				} else {
					params.set(id, 'true')
				}
			} else {
				params.set(key, value)
			}

			params.delete('page')

			router.push(`${pathname}?${params.toString()}`, { scroll: false })
		},
		[getSlug, pathname, router, searchParams],
	)

	const handleSelect = () => {}

	return (
		<FilterContext.Provider
			value={{
				searchParams,
				handleCategorySelect,
				handleSelect,
				getSlug,
				getIsChecked,
				toggleFilter,
				activeChain,
				activeCategory,
				filteredProducts,
				paginatedProducts: filteredProducts,
				categories: categories!,
				isLoading,
				totalPages,
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
