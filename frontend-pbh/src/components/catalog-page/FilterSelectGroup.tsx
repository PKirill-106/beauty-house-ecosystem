import { useFilters } from '@/providers/FilterProvider'
import FilterSelect from '../ui/catalog/FilterSelect'

export default function FilterSelectGroup() {
	const { categories, activeChain } = useFilters()

	return (
		<div className='flex flex-col gap-5'>
			<div className='flex flex-col md:flex-row md:items-center gap-5'>
				<FilterSelect placeholder='Категорія' level={0} type='categories' />

				{activeChain.map((cat, index) => {
					const hasChildren = categories.some(
						c => c.parentCategoryId === cat.id,
					)

					if (hasChildren) {
						return (
							<FilterSelect
								key={cat.id}
								placeholder='Підкатегорія'
								level={index + 1}
								type='categories'
							/>
						)
					}
					return null
				})}

				<div className='md:ml-auto'>
					<FilterSelect placeholder='Сортування' level={0} type='sort' />
				</div>
			</div>

			<FilterSelect placeholder='Колір' type='color' />
		</div>
	)
}
