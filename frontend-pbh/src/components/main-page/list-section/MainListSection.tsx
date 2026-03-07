'use client'
import ProductCard from '@/components/ui/product-card/ProductCard'
import ProductSkeleton from '@/components/ui/product-card/ProductSkeleton'
import Section from '@/components/ui/Section'
import { useGetCategoriesQuery } from '@/state/category/categoryApiSlice'
import { useGetProductsQuery } from '@/state/product/productApiSlice'
import { IMainListSection } from '@/types/interfacesProps'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function MainListSection(props: IMainListSection) {
	const {
		data: products,
		isLoading: isProdLoading,
		isError: isProdError,
	} = useGetProductsQuery()
	const {
		data: categories,
		isLoading: isCatLoading,
		isError: isCatError,
	} = useGetCategoriesQuery()

	const isLoading = isProdLoading || isCatLoading
	const isError = isProdError || isCatError

	const filteredProducts = products?.filter(product => {
		switch (props.filterType) {
			case 'new':
				return product.isNew
			case 'deals':
				return product.isDiscounted
			case 'season':
				return product.isSeasonal
			default:
				return product.categoryName === props.title
		}
	})

	const displayedProducts = filteredProducts?.slice(0, 4) || []

	return (
		<>
			{displayedProducts.length > 0 && (
				<Section>
					<div className='flex justify-between items-center'>
						<h1 className='font-bold'>
							{props.highlightedPart ? (
								<>
									<span className='text-primary'>{props.highlightedPart}</span>{' '}
									{props.title.replace(props.highlightedPart, '')}
								</>
							) : (
								props.title
							)}
						</h1>
						<Link
							href={props.linkHref}
							className='flex justify-baseline items-center font-medium text-transparent-text hover:text-secondary transition-all duration-300 group'
						>
							{props.linkLabel}
							<ChevronRight
								strokeWidth={2}
								className='transition-transform duration-300 group-hover:translate-x-1'
							/>
						</Link>
					</div>

					{isError ? (
						<h3 className='py-3 text-center text-red-500'>
							Помилка завантаження продуктів.
						</h3>
					) : (
						<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6'>
							{isLoading
								? [...Array(4)].map((_, index) => (
										<ProductSkeleton key={index} />
									))
								: displayedProducts.map(product => (
										<ProductCard
											key={product.id}
											product={product}
											categories={categories!}
											isLoading={isLoading}
										/>
									))}
						</div>
					)}
				</Section>
			)}
		</>
	)
}
