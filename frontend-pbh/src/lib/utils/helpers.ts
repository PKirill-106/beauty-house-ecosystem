import { ICategory, IProduct } from '@/types/interfacesApi'
import {
	IGetProfileLink,
	IMainListSection,
	ITriggerAnimation,
} from '@/types/interfacesProps'

export const getProfileLink = ({ role, status }: IGetProfileLink) => {
	let profileHref = '/sign-in'
	if (status === 'authenticated') {
		profileHref = role === 'Admin' ? '/admin' : '/profile?tab=profile'
	}

	return profileHref
}
export const getSubcategories = (
	categories: ICategory[] | undefined,
	parentId: string,
) => {
	if (!categories) return []
	const subcategories = categories.filter(
		cat => cat.parentCategoryId === parentId,
	)
	return subcategories
}
export const getCategoryPath = (
	current: ICategory,
	allCategories: ICategory[],
) => {
	const path: string[] = []

	let category: ICategory | undefined = current

	while (category) {
		path.push(category.slug)
		if (!category.parentCategoryId) break

		category = allCategories.find(c => c.id === category?.parentCategoryId)
	}
	return path.reverse().join('/')
}
export const triggerAnimation = ({ setCount }: ITriggerAnimation) => {
	setCount(prev => prev + 1)
	setTimeout(() => {
		setCount(prev => prev - 1)
	}, 1500)
}
export const sortCat = (a: ICategory, b: ICategory) => {
	if (a.description < b.description) {
		return -1
	} else if (a.description > b.description) {
		return 1
	}

	return 0
}
const getParentCategoryMain = (
	categories: ICategory[],
	product: IProduct,
	title: string,
	parentCatId?: string,
): boolean => {
	const category = categories!.find(cat =>
		parentCatId ? cat.id === parentCatId : cat.id === product.categoryId,
	)
	if (category?.parentCategoryId) {
		return getParentCategoryMain(
			categories,
			product,
			title,
			category.parentCategoryId,
		)
	} else {
		if (category?.name === title) {
			return true
		} else {
			return false
		}
	}
}
export const filteredMainProducts = (
	categories: ICategory[],
	products: IProduct[],
	filterType: IMainListSection['filterType'],
	title: string,
) => {
	return products?.filter(product => {
		switch (filterType) {
			case 'new':
				return product.isNew
			case 'deals':
				return product.isDiscounted
			case 'season':
				return product.isSeasonal
			default:
				return getParentCategoryMain(categories, product, title)
		}
	})
}
