'use server'

import { ICategory, IDeleteCategory, ResponseType } from '@/types/interfacesApi'
import { revalidatePath } from 'next/cache'
import { api } from '../api/axios'
import { apiWrapper } from '../utils/api/helpers'

export async function getAllCategories() {
	return apiWrapper(async () => {
		const res: ResponseType<ICategory[]> = await api.get('/Category/GetAll')

		return res.data.data
	})
}

export async function createCategory(formData: FormData) {
	return apiWrapper(async () => {
		await api.post('/Category/Create', formData)

		revalidatePath(`/admin/products`)
		return true
	})
}

export async function updateCategory(formData: FormData) {
	return apiWrapper(async () => {
		await api.put('/Category/Update', formData)

		revalidatePath(`/admin/products`)
		return true
	})
}

export async function deleteCategory(categoryDeleteData: IDeleteCategory) {
	return apiWrapper(async () => {
		await api.delete('/Category/Delete', {
			data: JSON.stringify(categoryDeleteData),
		})
		revalidatePath(`/admin/products`)
		return true
	})
}
