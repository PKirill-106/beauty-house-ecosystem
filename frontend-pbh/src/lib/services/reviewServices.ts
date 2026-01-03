'use server'

import { ICreateReview } from '@/types/interfacesApi'
import { api, publicApi } from '../api/axios'

export async function getAllReviews(productId: string) {
	const { data } = await publicApi
		.get(`/Review/all/${productId}`)
		.catch(error => {
			throw new Error('Failed to fetch reviews: ', error)
		})

	return data.data
}

export async function createReview(reviewData: ICreateReview) {
	const { data } = await api
		.post('/Review/create', JSON.stringify(reviewData))
		.catch(error => {
			throw new Error('Failed to create review: ', error)
		})

	return data.data
}

export async function deleteReview(reviewId: string) {
	await api.delete(`/Review/${reviewId}`).catch(error => {
		throw new Error('Failed to delete review: ', error)
	})

	return true
}
