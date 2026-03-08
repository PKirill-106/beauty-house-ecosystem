import FilterCheckbox from '../ui/FilterCheckbox'

export default function FilterCheckboxGroup() {
	return (
		<div className='flex flex-col gap-2 mb-6'>
			<FilterCheckbox text='Сезон' />
			<FilterCheckbox text='Акція' />
			<FilterCheckbox text='Новинки' />
		</div>
	)
}
