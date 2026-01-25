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
	style?: string
	isFooter?: boolean
}
export interface ICategoryItem {
	catName: ICategory['name']
	subCatList: ICategory[] | null
	showSubCat?: boolean
}
