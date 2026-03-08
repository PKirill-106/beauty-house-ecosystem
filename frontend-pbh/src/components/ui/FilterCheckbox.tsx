'use client'
import { useFilters } from '@/providers/FilterProvider'
import { IFilterCheckbox } from '@/types/interfacesProps'
import { Check } from 'lucide-react'

export default function FilterCheckbox(props: IFilterCheckbox) {
	const { getSlug, getIsChecked, toggleFilter } = useFilters()

	const id = getSlug(props.text)
	const isChecked = getIsChecked(props.text)

	return (
		<label
			htmlFor={id}
			className='flex gap-2 items-center active:text-primary duration-300 ease-out transition-all cursor-pointer pointer-events-none'
		>
			<div className='relative w-5 h-5 cursor-pointer pointer-events-auto'>
				<input
					id={id}
					type='checkbox'
					className={`appearance-none w-full h-full border border-transparent-text hover:border-primary rounded-xs li-hover peer checked:invisible active:bg-primary`}
					checked={isChecked}
					onChange={() => toggleFilter(props.text)}
				/>
				<Check
					className='absolute top-0 left-0 bg-primary text-white rounded-xs invisible peer-checked:visible pointer-events-auto active:bg-button active:text-button-text duration-300 ease-out transition-all'
					strokeWidth={3}
					size={20}
				/>
			</div>
			<p className='text-[18px] pointer-events-auto'>{props.text}</p>
		</label>
	)
}
