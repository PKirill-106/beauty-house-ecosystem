import { IProductGrid } from '@/types/interfacesProps'
import ProductCard from './ProductCard'
import ProductSkeleton from './ProductSkeleton'

export default function ProductGrid(props: IProductGrid) {
	return (
		<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6'>
			{props.isLoading
				? [...Array(props.skeletArrLength)].map((_, index) => (
						<ProductSkeleton key={index} />
					))
				: props.displayedProducts.map(product => (
						<ProductCard
							key={product.id}
							product={product}
							isLoading={props.isLoading}
						/>
					))}
		</div>
	)
}
