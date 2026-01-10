import { IProduct } from '@/types/interfacesApi'
import { useEffect, useRef, useState } from 'react'

export default function useSearch(products: IProduct[] | undefined) {
	const inputRef = useRef<HTMLInputElement>(null)
	const resultRef = useRef<HTMLInputElement>(null)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>('')
	const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		if (searchValue.trim()) {
			timeoutRef.current = setTimeout(() => {
				const filteredProducts = products
					?.filter(product =>
						product.name.toLowerCase().includes(searchValue.toLowerCase())
					)
					.slice(0, 10)

				setSearchedProducts(filteredProducts || [])
			}, 400)
		} else {
			setSearchedProducts([])
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [searchValue])

	useEffect(() => {
		if (!isOpen) return

		const handleClickOutside = (e: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(e.target as Node) &&
				resultRef.current &&
				!resultRef.current.contains(e.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isOpen])

	const handleClear = () => {
		setSearchValue('')
		inputRef.current?.focus()
	}

	return {
		inputRef,
		resultRef,
		isOpen,
		setIsOpen,
		searchValue,
		setSearchValue,
		searchedProducts,
		handleClear,
	}
}
