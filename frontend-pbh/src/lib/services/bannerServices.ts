'use server'

import { revalidatePath } from 'next/cache'
import { api, publicApi } from '../api/axios'

export async function getBannerImages() {
	const { data } = await publicApi
		.get('/Banner/GetBannerImages')
		.catch(error => {
			throw new Error('Failed to fetch banners: ', error)
		})

	return data.data
}

export async function updateBanner(formData: FormData) {
	const { data } = await api
		.put('/Banner/UpdateBanner', formData)
		.catch(error => {
			throw new Error('Failed to update banners: ', error)
		})

	revalidatePath(`/admin/banners/`)
	return data.data
}
