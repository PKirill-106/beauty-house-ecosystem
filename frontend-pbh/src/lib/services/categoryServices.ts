'use server'

import { IDeleteCategory } from '@/types/interfacesApi'
import { revalidatePath } from 'next/cache'
import { api } from '../api/axios'

export async function getAllCategories() {
	const { data } = await api.get('/Category/GetAll').catch(error => {
		throw new Error('Failed to fetch categories: ', error)
	})

	return data.data
}

export async function createCategory(formData: FormData) {
	const { data } = await api.post('/Category/Create', formData).catch(error => {
		throw new Error('Failed to create category: ', error)
	})

	revalidatePath(`/admin/products`)
	return data.data
}

export async function updateCategory(formData: FormData) {
	const { data } = await api.put('/Category/Update', formData).catch(error => {
		throw new Error('Failed to update category', error)
	})

	revalidatePath(`/admin/products`)
	return data.data
}

export async function deleteCategory(categoryDeleteData: IDeleteCategory) {
	await api
		.delete('/Category/Delete', { data: JSON.stringify(categoryDeleteData) })
		.catch(error => {
			throw new Error('Failed to delete category', error)
		})

	revalidatePath(`/admin/products`)
	return true
}
