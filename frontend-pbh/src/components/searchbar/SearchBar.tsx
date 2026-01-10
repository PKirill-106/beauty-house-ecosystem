'use client'
import { useGetProductsQuery } from '@/state/product/productApiSlice'
import { IProduct } from '@/types/interfacesApi'
import { CircleX, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
	const { data: products, isLoading } = useGetProductsQuery()

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

	return (
		<div className='flex flex-col flex-1'>
			<search className={styles.searchBar}>
				<Input
					ref={inputRef}
					value={searchValue}
					onChange={e => {
						e.preventDefault()
						setSearchValue(e.target.value)
					}}
					onFocus={() => setIsOpen(true)}
					placeholder='Пошук'
					type='search'
					className={styles['search-input']}
				/>
				{searchValue && (
					<CircleX onClick={handleClear} className={styles['clear-icon']} />
				)}
				<Search className={styles['search-icon']} />
			</search>

			{searchValue && isLoading ? (
				<div className='absolute top-14 md:top-18 lg:top-20 xl:top-20 left-1/2 -translate-x-1/2 w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white mt-1 rounded-md shadow-lg max-h-60 z-10'>
					{[...Array(3)].map(() => (
						<div className='flex p-2'>
							<div className='mr-1 md:mr-2 lg:mr-3 xl:mr-4'>
								<Skeleton className='aspect-square w-14 rounded-sm' />
							</div>
							<Skeleton className='w-full h-4 rounded-sm' />
						</div>
					))}
				</div>
			) : (
				isOpen && (
					<div
						ref={resultRef}
						className='absolute top-14 md:top-18 lg:top-20 xl:top-20 left-1/2 -translate-x-1/2 w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto z-10'
					>
						{searchedProducts.map(product => (
							<Link
								href={`/product/${product.slug}`}
								key={product.id}
								className='flex items-center p-2 hover:bg-gray-200 duration-100 transition-all cursor-pointer'
							>
								<div className='relative w-14 mr-1 md:mr-2 lg:mr-3 xl:mr-4 shrink-0'>
									<Image
										src={
											product?.productImages?.[0]?.filePath ??
											'/image-unavailable.svg'
										}
										alt={product.name}
										width={267}
										height={267}
										className='w-full aspect-square object-cover rounded-sm'
									/>
								</div>
								{product.name}
							</Link>
						))}
					</div>
				)
			)}
		</div>
	)
}
