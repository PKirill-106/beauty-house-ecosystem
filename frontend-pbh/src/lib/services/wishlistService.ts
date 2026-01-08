'use server'

import { api } from '../api/axios'

export async function getAllProductsFromWishList() {
	const { data } = await api
		.get('/WhisList/GetAllProductsFromWishList')
		.catch(error => {
			throw new Error('Failed to fetch wishlist: ', error)
		})

	return data.data
}

export async function addProductToWishList(productId: string) {
	const { data } = await api
		.post(`/WhisList/AddProductToWishList?productId=${productId}`)
		.catch(error => {
			throw new Error('Failed to add to wishlist: ', error)
		})

	return data.data
}

export async function updateWishList(wishlistItemIds: string[]) {
	const { data } = await api
		.put('/WhisList/UpdateWishList', JSON.stringify(wishlistItemIds))
		.catch(error => {
			throw new Error('Failed to update wishlist: ', error)
		})

	return data.data
}

export async function removeProductFromWishList(wishlistItemId: string) {
	const { data } = await api
		.delete(`/WhisList/RemoveWishList?whishListItemId=${wishlistItemId}`)
		.catch(error => {
			throw new Error('Failed to remove product from wishlist: ', error)
		})

	return data.data
}
