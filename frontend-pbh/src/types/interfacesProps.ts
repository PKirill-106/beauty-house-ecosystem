import { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import { IBanner, ICategory, IProduct } from './interfacesApi'

export interface ILogo {
	type: 'light' | 'dark'
	width: number
	height: number
}
export interface IMyTooltip {
	element: string | ReactNode
	tip: string
}
export interface ISearchInput {
	inputRef: RefObject<HTMLInputElement | null>
	setIsOpen: Dispatch<SetStateAction<boolean>>
	searchValue: string
	setSearchValue: Dispatch<SetStateAction<string>>
	handleClear: () => void
}
export interface ICounterWrapper {
	children: React.ReactNode
	type: 'favorites' | 'cart'
}
export interface IGetProfileLink {
	role: string | undefined
	status: string
}
export interface ITriggerAnimation {
	setCount: Dispatch<SetStateAction<number>>
}
export interface ICategoryList {
	showSubCat?: boolean
	style?: string
	subCatStyle?: string
}
export interface ICategoryItem {
	category: ICategory
	subCatList: ICategory[] | null
	level: number
	index: number
	lastIndex: number
	categories?: ICategory[] | null
	showSubCat?: boolean
	subCatStyle?: string
}
export interface IBannerSlide {
	banner: IBanner
}
export interface IMainListSection {
	title: string
	highlightedPart: string
	filterType: 'favorites' | 'cart' | 'default'
	linkHref: string
	linkLabel: string
}
export interface IProductCard {
	product: IProduct
	categories: ICategory[]
	isLoading: boolean
}
export interface IProductPrice {
	product: IProduct
}
export interface ISkeletonBanner {
	className?: string
}
