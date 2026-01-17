'use client'
import useSearch from '@/hooks/useSearch'
import { useGetProductsQuery } from '@/state/product/productApiSlice'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'
import SearchInput from './SearchInput'

export default function SearchBar() {
	const { data: products, isLoading } = useGetProductsQuery()

	const {
		inputRef,
		resultRef,
		isOpen,
		setIsOpen,
		searchValue,
		setSearchValue,
		searchedProducts,
		handleClear,
	} = useSearch(products)

	return (
		<div className='flex flex-col flex-3 md:flex-1'>
			<SearchInput
				inputRef={inputRef}
				setIsOpen={setIsOpen}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				handleClear={handleClear}
			/>

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
