'use server'

import { IProduct } from '@/types/interfacesApi'
import { revalidatePath } from 'next/cache'
import { api } from '../api/axios'

export async function getProducts() {
	const { data } = await api.get('/Product/GetAll').catch(error => {
		throw new Error('Failed to fetch products: ', error)
	})

	return data.data
}

export async function getProductBySlug(slug: string) {
	const { data } = await api.get(`/Product/${slug}`).catch(error => {
		throw new Error('Failed to fetch product by slug: ', error)
	})

	return data.data
}

export async function createProduct(
	formData: FormData,
	slug: string | undefined
) {
	const { data } = await api.post('/Product/Create', formData).catch(error => {
		throw new Error('Failed to create product: ', error)
	})

	revalidatePath(`/admin/products/${slug}`)
	return data.data
}

export async function updateProduct(
	formData: FormData,
	slug: string | undefined
) {
	const { data } = await api.put('/Product/Update', formData).catch(error => {
		throw new Error('Failed to update product: ', error)
	})

	revalidatePath(`/admin/products/${slug}`)
	return data.data
}

export async function deleteProduct(
	productId: IProduct['id'],
	slug: string | undefined
) {
	const { data } = await api
		.delete(`Product/Delete?id=${productId}`, {
			data: JSON.stringify(productId),
		})
		.catch(error => {
			throw new Error('Failed to delete product: ', error)
		})

	revalidatePath(`/admin/products/${slug}`)
	return data.data
}

export async function getAllColors() {
	const { data } = await api.get('/Product/GetAllColors').catch(error => {
		throw new Error('Failed to fetch colors: ', error)
	})

	return data.data
}
