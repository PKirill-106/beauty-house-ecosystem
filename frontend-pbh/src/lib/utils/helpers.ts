import { ICategory } from '@/types/interfacesApi'
import { IGetProfileLink, ITriggerAnimation } from '@/types/interfacesProps'

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
