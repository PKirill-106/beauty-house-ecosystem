'use client'
import { ICategoryList } from '@/types/interfacesProps'
import CategoryItem from './CategoryItem'
import { useGetCategoriesQuery } from '@/state/category/categoryApiSlice'
import { getSubcategories } from '@/lib/utils/helpers'
import { Skeleton } from './skeleton'

export default function CategoryList(props: ICategoryList) {
	const { data: categories, isLoading, isError } = useGetCategoriesQuery()

	if (!categories && !isLoading && !isError) {
		return <p>Категорії відсутні</p>
	} else if (isError) {
		return <p>Сталася Помилка</p>
	}

	return (
		<ul className={props.style}>
			{isLoading
				? [...Array(6)].map((_, id) => (
						<Skeleton key={id} className='w-full h-4 bg-neutral-800' />
					))
				: categories
						.filter(category => category.parentCategoryId == null)
						.map(category => (
							<CategoryItem
								key={category.id}
								category={category}
								subCatList={getSubcategories(categories!, category.id)}
								showSubCat={props.showSubCat}
							/>
						))}
		</ul>
	)
}
