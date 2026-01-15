'use server'

import { IProduct, IProductColor, ResponseType } from '@/types/interfacesApi'
import { revalidatePath } from 'next/cache'
import { api } from '../api/axios'
import { apiWrapper } from '../utils/api/helpers'

export async function getProducts() {
	return apiWrapper(async () => {
		const res: ResponseType<IProduct[]> = await api.get('/Product/GetAll')

		return res.data.data
	})
}

export async function getProductBySlug(slug: string) {
	return apiWrapper(async () => {
		const res: ResponseType<IProduct> = await api.get(`/Product/${slug}`)

		return res.data.data
	})
}

export async function createProduct(
	formData: FormData,
	slug: string | undefined
) {
	return apiWrapper(async () => {
		await api.post('/Product/Create', formData)

		revalidatePath(`/admin/products/${slug}`)
		return true
	})
}

export async function updateProduct(
	formData: FormData,
	slug: string | undefined
) {
	return apiWrapper(async () => {
		await api.put('/Product/Update', formData)

		revalidatePath(`/admin/products/${slug}`)
		return true
	})
}

export async function deleteProduct(
	productId: IProduct['id'],
	slug: string | undefined
) {
	return apiWrapper(async () => {
		await api.delete(`Product/Delete?id=${productId}`, {
			data: JSON.stringify(productId),
		})

		revalidatePath(`/admin/products/${slug}`)
		return true
	})
}

export async function getAllColors() {
	return apiWrapper(async () => {
		const res: ResponseType<IProductColor[]> = await api.get(
			'/Product/GetAllColors'
		)

		return res.data.data
	})
}
