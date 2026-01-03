'use server'

import { ISeasonId } from '@/types/interfacesApi'
import { revalidatePath } from 'next/cache'
import { api, publicApi } from '../api/axios'

export async function getAllSeasons() {
	const { data } = await publicApi.get('/Season/GetAll').catch(error => {
		throw new Error('Failed to fetch seasons: ', error)
	})

	return data.data
}

export async function getSeasonById(id: string) {
	const { data } = await publicApi
		.get(`/Season/GetById?id=${id}`)
		.catch(error => {
			throw new Error('Failed to fetch season by id: ', error)
		})

	return data.data
}

export async function getSeasonBySlug(slug: string) {
	const { data } = await publicApi.get(`/Season/${slug}`).catch(error => {
		throw new Error('Failed to fetch season by slug: ', error)
	})

	return data.data
}

export async function createSeason(seasonData: Omit<ISeasonId, 'id' | 'slug'>) {
	const { data } = await api
		.post('/Season/Create', JSON.stringify(seasonData))
		.catch(error => {
			throw new Error('Failed to create season: ', error)
		})

	revalidatePath('/admin/seasons')
	return data.data
}

export async function updateSeason(seasonData: ISeasonId) {
	const { data } = await api.put('/Season/Update', seasonData).catch(error => {
		throw new Error('Failed to update season: ', error)
	})

	revalidatePath('/admin/seasons')
	return data.data
}
