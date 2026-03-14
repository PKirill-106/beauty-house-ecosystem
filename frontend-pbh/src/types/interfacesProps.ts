import { Dispatch, ReactNode, Ref, RefObject, SetStateAction } from 'react'
import { SwiperRef } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import {
	IBanner,
	ICategory,
	IProduct,
	IProductImage,
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

export interface IPaginationControlsProps {
	totalPages: number
}
export interface IFilterCheckbox {
	text: string
}
export interface IFilterSelect {
	placeholder: string
	level?: number
	type: 'categories' | 'color' | 'sort'
}
export interface IProductGrid {
	isLoading: boolean
	displayedProducts: IProduct[]
	skeletArrLength?: number
}
export interface IModal {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	isInput?: boolean
}
export interface IImageModal {
	isOpen: boolean
	onClose: () => void
	images: IProductImage[]
	productName: string
	selectedImageIndex: number
	onSelect: (i: number) => void
	onPrev: () => void
	onNext: () => void
}
export interface IMainImage {
	images: IProductImage[]
	selectedImageIndex: number
	onClick: () => void
	productName: string
}
export interface IThumbnail {
	img: string
	index: number
	productName: string
	selectedImageIndex: number
	onClick: () => void
	isModal: boolean
}
export interface IThumbnailScroller {
	images: IProductImage[]
	productName: string
	selectedImageIndex: number
	onSelect: (index: number) => void
	setSwiperRef: (swiper: SwiperType) => void
}
export interface IImageList {
	product: IProduct
	selectedImageIndex: number
	setSelectedImageIndex: (index: number) => void
	handlePrev: () => void
	handleNext: () => void
	setSwiperRef: (swiper: SwiperType) => void
}
