'use server'

import { IProduct, ResponseType } from '@/types/interfacesApi'
import { api } from '../api/axios'
import { apiWrapper } from '../utils/api/helpers'

export async function getAllProductsFromWishList() {
	return apiWrapper(async () => {
		const res: ResponseType<IProduct[]> = await api.get(
			'/WhisList/GetAllProductsFromWishList'
		)

		return res.data.data
	})
}

export async function addProductToWishList(productId: string) {
	return apiWrapper(async () => {
		const res: ResponseType<number> = await api.post(
			`/WhisList/AddProductToWishList?productId=${productId}`
		)

		return res.data.data
	})
}

export async function updateWishList(wishlistItemIds: string[]) {
	return apiWrapper(async () => {
		const res: ResponseType<number> = await api.put(
			'/WhisList/UpdateWishList',
			JSON.stringify(wishlistItemIds)
		)

		return res.data.data
	})
}

export async function removeProductFromWishList(wishlistItemId: string) {
	return apiWrapper(async () => {
		const res: ResponseType<number> = await api.delete(
			`/WhisList/RemoveWishList?whishListItemId=${wishlistItemId}`
		)

		return res.data.data
	})
}
