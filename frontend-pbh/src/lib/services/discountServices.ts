'use server'

import { IDiscount, ResponseType } from '@/types/interfacesApi'
import { revalidatePath } from 'next/cache'
import { api } from '../api/axios'
import { apiWrapper } from '../utils/api/apiHelpers'

export async function getAllDiscounts() {
	return apiWrapper(async () => {
		const res: ResponseType<IDiscount[]> = await api.get('/Discount/GetAll')

		return res.data.data
	})
}

export async function getDiscountById(id: string) {
	return apiWrapper(async () => {
		const res: ResponseType<IDiscount> = await api.get(`/Discount/${id}`)

		return res.data.data
	})
}

export async function createDiscount(
	discountData: Omit<IDiscount, 'id' | 'slug'>,
) {
	return apiWrapper(async () => {
		await api.post('/Discount/Create', JSON.stringify(discountData))

		revalidatePath(`/admin/discounts`)
		return true
	})
}

export async function updateDiscount(discountDate: Omit<IDiscount, 'slug'>) {
	return apiWrapper(async () => {
		await api.put('Discount/Update', JSON.stringify(discountDate))

		revalidatePath(`/admin/discounts`)
		return true
	})
}
