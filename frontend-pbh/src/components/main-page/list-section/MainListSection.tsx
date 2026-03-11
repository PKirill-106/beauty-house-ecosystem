'use client'
import ProductCard from '@/components/ui/product-card/ProductCard'
import ProductGrid from '@/components/ui/product-card/ProductGrid'
import ProductSkeleton from '@/components/ui/product-card/ProductSkeleton'
import Section from '@/components/ui/Section'
import { filteredMainProducts } from '@/lib/utils/helpers'
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

	const displayedProducts =
		filteredMainProducts(
			categories!,
			products!,
			props.filterType,
			props.title,
		)?.slice(0, 4) || []

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
						<ProductGrid
							isLoading={isLoading}
							displayedProducts={displayedProducts}
							skeletArrLength={4}
						/>
					)}
				</Section>
			)}
		</>
	)
}
