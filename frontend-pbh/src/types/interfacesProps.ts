import { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import {
	IBanner,
	ICategory,
	IProduct,
	IProductColor,
	IProductVariant,
} from './interfacesApi'

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
	highlightedPart?: string
	filterType: 'new' | 'deals' | 'season' | 'default'
	linkHref: string
	linkLabel: string
}
export interface IProductCard {
	product: IProduct
	isLoading: boolean
}
export interface IProductPrice {
	product: IProduct
	firstAvailableVariant: IProductVariant
}
export interface ISkeletonBanner {
	className?: string
}
export interface ISection {
	children: ReactNode
	className?: string
	layoutStyle?: string
}
export interface IFavoriteButton {
	productId: string
	heartClassName: string
	buttonClassName: string
}
export interface ICartButton {
	productId: string
	initialVariantId: string
	unitsInStock: number
}
export type CatalogPageProps = {
	params: Promise<{ slug?: string[] }>
	searchParams: Promise<{
		sort?: string
		sezon?: string
		akciya?: string
		novinki?: string
		page?: string
		color?: string
	}>
}
export interface IPaginationControlsProps {
	totalPages: number
}
export interface IProductGrid {
	products: IProduct[]
	categories: ICategory[]
	type?: 'favorites'
}
export interface IProductFilters {
	categories: ICategory[]
	activeCategory: string
	activeSubcategory: string
}
export interface IFilterSelectGroup {
	categories: ICategory[]
	activeCategory: string
	activeSubcategory: string
}
export interface IFilterCheckbox {
	text: string
}
