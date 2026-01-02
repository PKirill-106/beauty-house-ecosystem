import { ReactNode } from 'react'

export interface ILogo {
	type: 'light' | 'dark'
	width: number
	height: number
}
export interface IMyTooltip {
	element: string | ReactNode
	tip: string
}
