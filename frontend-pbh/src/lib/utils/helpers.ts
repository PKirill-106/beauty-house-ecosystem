import { ICategory } from '@/types/interfacesApi'
import { IGetProfileLink, ITriggerAnimation } from '@/types/interfacesProps'

export const getProfileLink = ({ role, status }: IGetProfileLink) => {
	let profileHref = '/sign-in'
	if (status === 'authenticated') {
		profileHref = role === 'Admin' ? '/admin' : '/profile?tab=profile'
	}

	return profileHref
}
export const getSubcategories = (categories: ICategory[], parentId: string) => {
	return categories.filter(cat => cat.parentCategoryId === parentId)
}
export const triggerAnimation = ({ setCount }: ITriggerAnimation) => {
	setCount(prev => prev + 1)
	setTimeout(() => {
		setCount(prev => prev - 1)
	}, 1500)
}
