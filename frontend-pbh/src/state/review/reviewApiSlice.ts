import {
	createReview,
	deleteReview,
	getAllReviews,
} from '@/lib/services/reviewServices'
import { apiWrapper } from '@/lib/utils/api/helpers'
import { ICreateReview, IProduct, IReview } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const reviewApi = createApi({
	reducerPath: 'reviewApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Reviews'],
	endpoints: builder => ({
		getReviews: builder.query<IReview[], IProduct['id']>({
			queryFn: async id => apiWrapper(() => getAllReviews(id)),
			providesTags: ['Reviews'],
		}),
		createReview: builder.mutation<IReview[], ICreateReview>({
			queryFn: async reviewData => apiWrapper(() => createReview(reviewData)),
			invalidatesTags: ['Reviews'],
		}),
		deleteReview: builder.mutation<boolean, IReview['id']>({
			queryFn: async reviewId => apiWrapper(() => deleteReview(reviewId)),
			invalidatesTags: ['Reviews'],
		}),
	}),
})

export const {
	useGetReviewsQuery,
	useCreateReviewMutation,
	useDeleteReviewMutation,
} = reviewApi
