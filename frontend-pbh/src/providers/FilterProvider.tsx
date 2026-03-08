'use client'

import transliterate from '@sindresorhus/transliterate'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, ReactNode, useCallback, useContext } from 'react'
const slugify = require('slugify')

interface FilterContextType {
	getSlug: (text: string) => string
	getIsChecked: (text: string) => boolean
	toggleFilter: (text: string) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

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

	const setQueryParam = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)
			params.delete('page')
			router.push(`${pathname}?${params.toString()}`, { scroll: false })
		},
		[pathname, router, searchParams],
	)

	const navigateToCategory = useCallback(
		(path: string) => {
			router.push(`/catalog/${path}`)
		},
		[router],
	)

	return (
		<FilterContext.Provider value={{ getSlug, getIsChecked, toggleFilter }}>
			{children}
		</FilterContext.Provider>
	)
}

export const useFilters = () => {
	const context = useContext(FilterContext)
	if (!context) throw new Error('useFilters must be used within FilterProvider')
	return context
}
