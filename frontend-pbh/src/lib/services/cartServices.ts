'use server'

import { ICartItem } from '@/types/interfacesApi'
import { api } from '../api/axios'

export async function getAllProductsFromCart() {
	const { data } = await api
		.get('/CartItem/GetAllCartProducts')
		.catch(error => {
			throw new Error('Failed to fetch products from cart: ', error)
		})

	return data.data
}

export async function addProductToCart(productData: Partial<ICartItem>) {
	const { data } = await api
		.post('/CartItem/AddProductToCart', JSON.stringify(productData))
		.catch(error => {
			throw new Error('Failed to add product to cart: ', error)
		})

	return data.data
}

export async function updateProductInCart(productData: Partial<ICartItem>) {
	const { data } = await api
		.put('/CartItem/UpdateCartItem', JSON.stringify(productData))
		.catch(error => {
			throw new Error('Failed to update products from cart: ', error)
		})

	return data.data
}

export async function migrateProductToCart(cartItems: ICartItem[]) {
	const { data } = await api
		.put('/CartItem/ActualizeCart', JSON.stringify(cartItems))
		.catch(error => {
			throw new Error('Failed to migrate cart: ', error)
		})

	return data.data
}

export async function removeProductFromCart(itemId: string) {
	const { data } = await api
		.delete(`/CartItem/DeleteProductFromCart?itemId=${itemId}`)
		.catch(error => {
			throw new Error('Failed to remove item from cart: ', error)
		})

	return data.data
}

export async function removeManyProductFromCart(itemIds: string[]) {
	const { data } = await api
		.delete('/CartItem/DeleteMany', { data: JSON.stringify(itemIds) })
		.catch(error => {
			throw new Error('Failed to remove list of items from cart: ', error)
		})

	return data.data
}
