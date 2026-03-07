import { useCart } from '@/providers/CartProvider'
import { ICartButton } from '@/types/interfacesProps'
import { ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function CartButton({
	productId,
	initialVariantId,
	unitsInStock,
}: ICartButton) {
	const { cartProducts, isInCart, addToCart, removeFromCart } = useCart()
	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		isInCart(productId)
	}, [productId])

	const handleClick = async () => {
		if (isInCart(productId)) {
			const itemsToRemove = cartProducts.filter(
				item => item.productId === productId,
			)
			await Promise.all(
				itemsToRemove.map(item =>
					removeFromCart(item.id!, productId, item.productVariantId),
				),
			)
		} else {
			addToCart(productId, initialVariantId, 1, unitsInStock)
		}

		setAnimate(true)
		setTimeout(() => setAnimate(false), 300)
	}

	return (
		<button
			onClick={handleClick}
			className={`transition duration-200 cursor-pointer ${
				animate ? 'scale-120' : ''
			} ${unitsInStock > 0 ? '' : 'pointer-events-none'}`}
		>
			<ShoppingBag
				className={`link-size hover-active-text hover:text-secondary active:text-secondary ${
					isInCart(productId)
						? 'text-transparent-text hover:text-red-500'
						: 'text-primary'
				} ${unitsInStock > 0 ? '' : 'text-transparent-text'}`}
			/>
		</button>
	)
}
