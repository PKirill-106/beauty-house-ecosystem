import {
	createReview,
	deleteReview,
	getAllReviews,
} from '@/lib/services/reviewServices'
import { ICreateReview, IProduct, IReview } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const reviewApi = createApi({
	reducerPath: 'reviewApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Reviews'],
	endpoints: builder => ({
		getReviews: builder.query<IReview[], IProduct['id']>({
			queryFn: async id => getAllReviews(id),
			providesTags: ['Reviews'],
		}),
		createReview: builder.mutation<boolean, ICreateReview>({
			queryFn: async reviewData => createReview(reviewData),
			invalidatesTags: ['Reviews'],
		}),
		deleteReview: builder.mutation<boolean, IReview['id']>({
			queryFn: async reviewId => deleteReview(reviewId),
			invalidatesTags: ['Reviews'],
		}),
	}),
})

export const {
	useGetReviewsQuery,
	useCreateReviewMutation,
	useDeleteReviewMutation,
} = reviewApi
