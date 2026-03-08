import { IProductFilters } from '@/types/interfacesProps'
import FilterCheckboxGroup from './FilterCheckboxGroup'
import FilterSelectGroup from './FilterSelectGroup'

export default function ProductFilters({
	categories,
	activeCategory,
	activeSubcategory,
}: IProductFilters) {
	return (
		<div className='mb-6'>
			<FilterCheckboxGroup />
			<FilterSelectGroup
				categories={categories}
				activeCategory={activeCategory}
				activeSubcategory={activeSubcategory}
			/>
		</div>
	)
}
