'use client'
import ProductCard from '@/components/ui/product-card/ProductCard'
import ProductSkeleton from '@/components/ui/product-card/ProductSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
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

	const displayedProducts = products?.slice(0, 7) || []

	return (
		<section className='section-container'>
			<h1>
				{props.highlightedPart ? (
					<>
						<span className='text-accent font-bold'>
							{props.highlightedPart}
						</span>{' '}
						{props.title.replace(props.highlightedPart, '')}
					</>
				) : (
					props.title
				)}
			</h1>

			{isError ? (
				<h3 className='py-3 text-center text-red-500'>
					Помилка завантаження продуктів.
				</h3>
			) : (
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6'>
					{isLoading
						? [...Array(7)].map((_, index) => <ProductSkeleton key={index} />)
						: displayedProducts.map(product => (
								<ProductCard
									key={product.id}
									product={product}
									categories={categories!}
									isLoading={isLoading}
								/>
							))}

					<Link
						href={props.linkHref}
						className='bg-foreground text-white rounded-lg flex items-center justify-center text-center font-semibold hover:bg-accent hover:scale-105 hover:shadow-lg transition-all duration-300 px-4 py-6 text-sm'
					>
						<h3 className='flex flex-col items-center'>
							{props.linkLabel} <div className='my-4' /> <ChevronRight />
						</h3>
					</Link>
				</div>
			)}
		</section>
	)
}
