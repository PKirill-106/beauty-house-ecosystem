import { IProductCard } from '@/types/interfacesProps'
import ProductSkeleton from './ProductSkeleton'
import Link from 'next/link'
import Image from 'next/image'
import ProductPrice from '../ProductPrice'

export default function ProductCard(props: IProductCard) {
	const firstImage = props.product.productImages?.[0]

	const productUrl = `/product/${props.product.slug}`

	const isAvailable = props.product.productVariants.some(v => v.isStock)

	return (
		<>
			{props.isLoading ? (
				<ProductSkeleton />
			) : (
				<div
					className={`flex flex-col gap-2 md:gap-3 rounded-lg transition-all duration-300 ${
						!isAvailable ||
						(props.product.productVariants.length === 1 &&
							props.product.productVariants[0].isStock === false)
							? ''
							: 'hover:scale-105 hover:shadow-lg'
					}`}
				>
					<Link href={productUrl} className='mb-1'>
						<div className='relative w-full aspect-square'>
							<Image
								src={firstImage?.filePath || '/image-unavailable.svg'}
								alt={props.product.name}
								fill
								priority
								className='object-cover'
							/>
						</div>
					</Link>
					<div className='flex flex-col gap-1 md:gap-2'>
						<div className='flex flex-col md:gap-1'>
							<Link href={productUrl}>
								<h3 className='line-clamp-1'>{props.product.name}</h3>
							</Link>
							<span className='caption'>{props.product.categoryName}</span>
						</div>
						<ProductPrice product={props.product} />
					</div>
				</div>
			)}
		</>
	)
}
