'use client'
import { ICategoryList } from '@/types/interfacesProps'
import CategoryItem from './CategoryItem'
import { useGetCategoriesQuery } from '@/state/category/categoryApiSlice'

export default function CategoryList(props: ICategoryList) {
	const { data: categories } = useGetCategoriesQuery()

	if (!categories) return <p>Категорії відсутні</p>

	return (
		<ul className={props.style}>
			{categories
				.filter(category => category.parentCategoryId == null)
				.map(category => (
					<CategoryItem key={category.id} />
				))}
		</ul>
	)
}
