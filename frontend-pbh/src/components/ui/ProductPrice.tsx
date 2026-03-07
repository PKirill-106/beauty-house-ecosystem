import { IProductPrice } from '@/types/interfacesProps'

export default function ProductPrice(props: IProductPrice) {
	return (
		<>
			{props.product.isDiscounted ? (
				<div className='flex flex-col items-left'>
					<p className='line-through text-transparent-text'>
						{props.firstAvailableVariant.price} грн
					</p>
					<p className='price text-accent lg:min-w-37 xl:min-w-50'>
						{props.firstAvailableVariant.discountPrice} грн
					</p>
				</div>
			) : (
				<p className='price'>{props.firstAvailableVariant.price} грн</p>
			)}
		</>
	)
}
