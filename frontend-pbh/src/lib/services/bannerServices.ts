'use server'

import { IBanner, ResponseType } from '@/types/interfacesApi'
import { revalidatePath } from 'next/cache'
import { api } from '../api/axios'
import { apiWrapper } from '../utils/api/helpers'

export async function getBannerImages() {
	return apiWrapper(async () => {
		const res: ResponseType<IBanner[]> = await api.get(
			'/Banner/GetBannerImages'
		)

		return res.data.data
	})
}

export async function updateBanners(formData: FormData) {
	return apiWrapper(async () => {
		const res: ResponseType<number> = await api.put(
			'/Banner/UpdateBanner',
			formData
		)

		revalidatePath(`/admin/banners/`)
		return res.data.data
	})
}
