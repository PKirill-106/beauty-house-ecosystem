import { IProductCard } from '@/types/interfacesProps'
import ProductSkeleton from './ProductSkeleton'
import Link from 'next/link'
import Image from 'next/image'
import ProductPrice from '../ProductPrice'
import { motion } from 'motion/react'
import { animateProductCardImage } from '@/lib/utils/animations'
import FavoriteButton from './FavoriteButton'
import CartButton from './CartButton'

export default function ProductCard(props: IProductCard) {
	const firstImage = props.product.productImages?.[0]

	const firstAvailableVariant = props.product.productVariants
		.filter(v => v.isStock)
		.sort((a, b) => a.price - b.price)[0]

	if (!firstAvailableVariant.isStock) {
		return <p className='caption'>Продукт недоступний</p>
	}

	const productUrl = `/product/${props.product.slug}`

	const isAvailable =
		props.product.productVariants.some(v => v.isStock) ||
		(props.product.productVariants.length === 1 &&
			props.product.productVariants[0].isStock === false)

	return (
		<>
			{props.isLoading ? (
				<ProductSkeleton />
			) : (
				<motion.div
					initial='initial'
					whileHover='animate'
					exit='initial'
					className={`relative flex flex-col gap-2 md:gap-3 transition-all duration-300`}
				>
					<Link href={productUrl} className='mb-1'>
						<motion.div
							variants={animateProductCardImage}
							className='relative w-full aspect-square overflow-hidden'
						>
							<Image
								src={firstImage?.filePath || '/image-unavailable.svg'}
								alt={props.product.name}
								fill
								priority
								className='object-cover'
							/>
						</motion.div>
					</Link>
					<div className='flex flex-col gap-1 md:gap-2'>
						<div className='flex flex-col md:gap-1'>
							<Link href={productUrl}>
								<h3 className='line-clamp-1'>{props.product.name}</h3>
							</Link>
							<span className='caption'>{props.product.categoryName}</span>
						</div>
						<div className='flex items-center justify-between'>
							<ProductPrice
								product={props.product}
								firstAvailableVariant={firstAvailableVariant}
							/>
							<div>
								<FavoriteButton
									productId={props.product.id}
									heartClassName='link-size hover-active-text'
									buttonClassName='p-2 md:p-3 lg:p-4'
								/>
								<CartButton
									productId={props.product.id}
									initialVariantId={firstAvailableVariant.id}
									unitsInStock={firstAvailableVariant.unitsInStock}
								/>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</>
	)
}
