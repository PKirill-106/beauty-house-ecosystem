import FilterCheckboxGroup from './FilterCheckboxGroup'
import FilterSelectGroup from './FilterSelectGroup'

export default function ProductFilters() {
	return (
		<div className='mb-6'>
			<FilterCheckboxGroup />
			<FilterSelectGroup />
		</div>
	)
}
