'use client'
import NotFound from '@/app/not-found'
import { useGetProductsQuery } from '@/state/product/productApiSlice'
import { IProduct } from '@/types/interfacesApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, ReactNode, useContext, useMemo } from 'react'

interface ProductContextType {
	product: IProduct | undefined
	isLoading: boolean
	isError: boolean
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const { data: products, isLoading, isError } = useGetProductsQuery()

	const splitPath = pathname.split('/').filter(Boolean)

	const activeProduct = useMemo(() => {
		if (!products || splitPath.length === 0) return undefined

		const lastSegment = splitPath[splitPath.length - 1]
		if (lastSegment === 'product') return undefined

		return products.find(c => c.slug === lastSegment)
	}, [products, splitPath])

	if ((!isLoading && activeProduct === null) || !activeProduct) {
		NotFound()
	}

	return (
		<ProductContext.Provider
			value={{ product: activeProduct, isLoading, isError }}
		>
			{children}
		</ProductContext.Provider>
	)
}

export const useProduct = () => {
	const context = useContext(ProductContext)
	if (!context) throw new Error('useFilters must be used within FilterProvider')
	return context
}
