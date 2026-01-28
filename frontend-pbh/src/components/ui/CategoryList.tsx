'use client'
import { getSubcategories } from '@/lib/utils/helpers'
import { useGetCategoriesQuery } from '@/state/category/categoryApiSlice'
import { ICategoryList } from '@/types/interfacesProps'
import CategoryItem from './CategoryItem'
import { Skeleton } from './skeleton'
import { ICategory } from '@/types/interfacesApi'

export default function CategoryList(props: ICategoryList) {
	const { data: categories, isLoading, isError } = useGetCategoriesQuery()

	if (!categories && !isLoading && !isError) {
		return <p>Категорії відсутні</p>
	} else if (isError) {
		return <p>Категорій не знайдено</p>
	}

	const sort = (a: ICategory, b: ICategory) => {
		if (a.description < b.description) {
			return -1
		} else if (a.description > b.description) {
			return 1
		}

		return 0
	}

	return (
		<ul className={props.style}>
			{isLoading
				? [...Array(6)].map((_, id) => (
						<Skeleton key={id} className='w-full h-4 bg-neutral-800' />
					))
				: categories
						.filter(category => category.parentCategoryId == null)
						.sort((a, b) => sort(a, b))
						.map(category => (
							<CategoryItem
								key={category.id}
								category={category}
								categories={categories}
								subCatList={getSubcategories(categories!, category.id)}
								level={0}
								showSubCat={props.showSubCat}
								subCatStyle={props.subCatStyle}
							/>
						))}
		</ul>
	)
}
