import { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import { ICategory } from './interfacesApi'

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
