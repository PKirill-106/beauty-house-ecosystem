'use server'

import { ICreateReview, IReview, ResponseType } from '@/types/interfacesApi'
import { api } from '../api/axios'
import { apiWrapper } from '../utils/api/helpers'

export async function getAllReviews(productId: string) {
	return apiWrapper(async () => {
		const res: ResponseType<IReview[]> = await api.get(
			`/Review/all/${productId}`
		)

		return res.data.data
	})
}

export async function createReview(reviewData: ICreateReview) {
	return apiWrapper(async () => {
		await api.post('/Review/create', JSON.stringify(reviewData))

		return true
	})
}

export async function deleteReview(reviewId: string) {
	return apiWrapper(async () => {
		await api.delete(`/Review/${reviewId}`)

		return true
	})
}
