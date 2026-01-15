'use server'

import { ISeason, ISeasonId, ResponseType } from '@/types/interfacesApi'
import { revalidatePath } from 'next/cache'
import { api } from '../api/axios'
import { apiWrapper } from '../utils/api/helpers'

export async function getAllSeasons() {
	return apiWrapper(async () => {
		const res: ResponseType<ISeason[]> = await api.get('/Season/GetAll')

		return res.data.data
	})
}

export async function getSeasonById(id: string) {
	return apiWrapper(async () => {
		const res: ResponseType<ISeason> = await api.get(`/Season/GetById?id=${id}`)

		return res.data.data
	})
}

export async function getSeasonBySlug(slug: string) {
	return apiWrapper(async () => {
		const res: ResponseType<ISeason> = await api.get(`/Season/${slug}`)

		return res.data.data
	})
}

export async function createSeason(seasonData: Omit<ISeasonId, 'id' | 'slug'>) {
	await api.post('/Season/Create', JSON.stringify(seasonData))

	revalidatePath('/admin/seasons')
	return true
}

export async function updateSeason(seasonData: ISeasonId) {
	await api.put('/Season/Update', seasonData)

	revalidatePath('/admin/seasons')
	return true
}
