'use client'
import { useFilters } from '@/providers/FilterProvider'
import { useGetAllColorsQuery } from '@/state/product/productApiSlice'
import { IFilterSelect } from '@/types/interfacesProps'
import { useMemo } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../select'

export default function FilterSelect(props: IFilterSelect) {
	const { data: colors, isLoading, isError } = useGetAllColorsQuery()
	const {
		searchParams,
		categories,
		activeChain,
		activeCategory,
		handleCategorySelect,
		toggleFilter,
		getSlug,
	} = useFilters()

	const options = useMemo(() => {
		switch (props.type) {
			case 'categories':
				if (!props.level || props.level === 0)
					return categories?.filter(c => !c.parentCategoryId) || []
				const parent = activeChain[props.level - 1]
				return parent
					? categories.filter(c => c.parentCategoryId === parent.id)
					: []
			case 'color':
				if (!colors || isLoading || isError) return []

				return colors.map(color => ({
					name: color.name,
					slug: getSlug(color.name),
				}))
			case 'sort':
				return [
					{ name: 'Рекомендовані', slug: 'price_base' },
					{ name: 'Від дешевих', slug: 'price_asc' },
					{ name: 'Від дорогих', slug: 'price_desc' },
				]
		}
	}, [props.type, categories, activeChain, props.level])

	const config = useMemo(() => {
		switch (props.type) {
			case 'categories':
				return {
					value: activeChain[props.level!]?.slug || '',
					handler: (slug: string) => {
						const currentCat = categories.find(c => c.slug === slug)
						handleCategorySelect(currentCat!)
					},
				}
			case 'color':
				return {
					value: searchParams.get('color') || '',
					handler: (val: string) => toggleFilter('color', val),
				}
			case 'sort':
				return {
					value: searchParams.get('sort') || '',
					handler: (val: string) => toggleFilter('sort', val),
				}
		}
	}, [props.type, activeChain, props.level, searchParams])

	if (props.type === 'categories' && options.length === 0 && activeCategory) {
		return null
	}

	return (
		<Select value={config?.value} onValueChange={config?.handler}>
			<SelectTrigger className='w-full md:min-w-45 md:max-w-fit'>
				<SelectValue placeholder={props.placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options!.map((item, id) => (
					<SelectItem key={id} value={item.slug}>
						{item.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
