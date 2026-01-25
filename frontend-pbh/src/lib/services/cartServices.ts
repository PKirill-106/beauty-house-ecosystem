'use server'
import { ICartItem, ResponseType } from '@/types/interfacesApi'
import { api } from '../api/axios'
import { apiWrapper } from '../utils/api/apiHelpers'

export async function getAllProductsFromCart() {
	return apiWrapper(async () => {
		const res: ResponseType<ICartItem[]> = await api.get(
			'/CartItem/GetAllCartProducts',
		)

		return res.data.data
	})
}

export async function addProductToCart(productData: Partial<ICartItem>) {
	return apiWrapper(async () => {
		await api.post('/CartItem/AddProductToCart', JSON.stringify(productData))

		return true
	})
}

export async function updateProductInCart(productData: Partial<ICartItem>) {
	return apiWrapper(async () => {
		await api.put('/CartItem/UpdateCartItem', JSON.stringify(productData))

		return true
	})
}

export async function migrateProductToCart(cartItems: ICartItem[]) {
	return apiWrapper(async () => {
		await api.put('/CartItem/ActualizeCart', JSON.stringify(cartItems))

		return true
	})
}

export async function removeProductFromCart(itemId: string) {
	return apiWrapper(async () => {
		await api.delete(`/CartItem/DeleteProductFromCart?itemId=${itemId}`)

		return true
	})
}

export async function removeManyProductFromCart(itemIds: string[]) {
	return apiWrapper(async () => {
		await api.delete('/CartItem/DeleteMany', {
			data: JSON.stringify(itemIds),
		})

		return true
	})
}
