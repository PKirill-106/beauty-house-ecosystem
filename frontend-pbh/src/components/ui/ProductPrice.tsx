import { IProductPrice } from '@/types/interfacesProps'

export default function ProductPrice(props: IProductPrice) {
	const firstVariant = props.product.productVariants[0]

	if (!firstVariant) {
		return <p className='caption'>Продукт недоступний</p>
	}

	return (
		<>
			{props.product.isDiscounted ? (
				<div className='flex flex-col items-left'>
					<p className='line-through text-transparent-text'>
						{firstVariant.price} грн
					</p>
					<p className='price text-accent lg:min-w-37 xl:min-w-50'>
						{firstVariant.discountPrice} грн
					</p>
				</div>
			) : (
				<p className='price'>{firstVariant.price} грн</p>
			)}
		</>
	)
}
