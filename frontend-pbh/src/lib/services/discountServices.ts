'use server'

import { revalidatePath } from 'next/cache'
import { api, publicApi } from '../api/axios'
import { IDiscount } from '@/types/interfacesApi'

export async function getAllDiscounts() {
	const { data } = await publicApi.get('/Discount/GetAll').catch(error => {
		throw new Error('Failed to fetch discounts: ', error)
	})

	return data.data
}

export async function getDiscountById(id: string) {
	const { data } = await publicApi.get(`/Discount/${id}`).catch(error => {
		throw new Error('Failed to fetch discount by id: ', error)
	})

	return data.data
}

export async function createDiscount(
	discountDate: Omit<IDiscount, 'id' | 'slug'>
) {
	const { data } = await api
		.post('/Discount/Create', JSON.stringify(discountDate))
		.catch(error => {
			throw new Error('Failed to create discount: ', error)
		})

	revalidatePath(`/admin/discounts`)
	return data.data
}

export async function updateDiscount(discountDate: Omit<IDiscount, 'slug'>) {
	const { data } = await publicApi
		.put('Discount/Update', JSON.stringify(discountDate))
		.catch(error => {
			throw new Error('Failed to update discount: ', error)
		})

	revalidatePath(`/admin/discounts`)
	return data.data
}
