import { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'

export interface ILogo {
	type: 'light' | 'dark'
	width: number
	height: number
}
export interface IMyTooltip {
	element: string | ReactNode
	tip: string
}
export interface IBurgerMenu {
	menuRef: RefObject<HTMLInputElement | null>
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
export interface ISearchInput {
	inputRef: RefObject<HTMLInputElement | null>
	setIsOpen: Dispatch<SetStateAction<boolean>>
	searchValue: string
	setSearchValue: Dispatch<SetStateAction<string>>
	handleClear: () => void
}
export interface INavCounterWrapper {
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
