'use client'
import { getSubcategories, sortCat } from '@/lib/utils/helpers'
import { useGetCategoriesQuery } from '@/state/category/categoryApiSlice'
import { ICategoryList } from '@/types/interfacesProps'
import CategoryItem from './CategoryItem'
import { Skeleton } from './skeleton'

export default function CategoryList(props: ICategoryList) {
	const { data: categories, isLoading, isError } = useGetCategoriesQuery()

	if (!categories && !isLoading && !isError) {
		return <p>Категорії відсутні</p>
	} else if (isError) {
		return <p>Категорій не знайдено</p>
	}

	return (
		<ul className={props.style}>
			{isLoading
				? [...Array(6)].map((_, id) => (
						<Skeleton key={id} className='w-full h-4 bg-neutral-800' />
					))
				: categories
						.filter(category => category.parentCategoryId == null)
						.sort((a, b) => sortCat(a, b))
						.map((category, index) => (
							<CategoryItem
								key={category.id}
								category={category}
								categories={categories}
								subCatList={getSubcategories(categories!, category.id)}
								level={0}
								index={index}
								lastIndex={
									categories.filter(cat => cat.parentCategoryId == null)
										.length - 1
								}
								showSubCat={props.showSubCat}
								subCatStyle={props.subCatStyle}
							/>
						))}
		</ul>
	)
}
