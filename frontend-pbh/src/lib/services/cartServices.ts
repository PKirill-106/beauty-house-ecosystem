'use server'
import { ICartItem, ResponseType } from '@/types/interfacesApi'
import { api } from '../api/axios'
import { apiWrapper } from '../utils/api/helpers'

export async function getAllProductsFromCart() {
	return apiWrapper(async () => {
		const res: ResponseType<ICartItem[]> = await api.get(
			'/CartItem/GetAllCartProducts'
		)

		return res.data.data
	})
}

export async function addProductToCart(productData: Partial<ICartItem>) {
	return apiWrapper(async () => {
		const res: ResponseType<ICartItem[]> = await api.post(
			'/CartItem/AddProductToCart',
			JSON.stringify(productData)
		)

		return res.data.data
	})
}

export async function updateProductInCart(productData: Partial<ICartItem>) {
	return apiWrapper(async () => {
		const res: ResponseType<ICartItem[]> = await api.put(
			'/CartItem/UpdateCartItem',
			JSON.stringify(productData)
		)

		return res.data.data
	})
}

export async function migrateProductToCart(cartItems: ICartItem[]) {
	return apiWrapper(async () => {
		const res: ResponseType<ICartItem[]> = await api.put(
			'/CartItem/ActualizeCart',
			JSON.stringify(cartItems)
		)

		return res.data.data
	})
}

export async function removeProductFromCart(itemId: string) {
	return apiWrapper(async () => {
		const res: ResponseType<number> = await api.delete(
			`/CartItem/DeleteProductFromCart?itemId=${itemId}`
		)

		return res.data.data
	})
}

export async function removeManyProductFromCart(itemIds: string[]) {
	return apiWrapper(async () => {
		const res: ResponseType<number> = await api.delete('/CartItem/DeleteMany', {
			data: JSON.stringify(itemIds),
		})

		return res.data.data
	})
}
