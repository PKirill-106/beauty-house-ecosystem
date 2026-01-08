import {
	createDiscount,
	getAllDiscounts,
	getDiscountById,
	updateDiscount,
} from '@/lib/services/discountServices'
import { apiWrapper } from '@/lib/utils/api/helpers'
import { IDiscount } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const discountApi = createApi({
	reducerPath: 'discountApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Discounts'],
	endpoints: builder => ({
		getDiscounts: builder.query<IDiscount[], void>({
			queryFn: async () => apiWrapper(() => getAllDiscounts()),
			providesTags: ['Discounts'],
		}),
		getDiscountById: builder.query<IDiscount[], IDiscount['id']>({
			queryFn: async id => apiWrapper(() => getDiscountById(id)),
			providesTags: ['Discounts'],
		}),
		createDiscount: builder.mutation<
			IDiscount[],
			Omit<IDiscount, 'id' | 'slug'>
		>({
			queryFn: async discountData =>
				apiWrapper(() => createDiscount(discountData)),
			invalidatesTags: ['Discounts'],
		}),
		updateDiscount: builder.mutation<IDiscount[], Omit<IDiscount, 'slug'>>({
			queryFn: async discountData =>
				apiWrapper(() => updateDiscount(discountData)),
			invalidatesTags: ['Discounts'],
		}),
	}),
})

export const {
	useGetDiscountsQuery,
	useGetDiscountByIdQuery,
	useCreateDiscountMutation,
	useUpdateDiscountMutation,
} = discountApi
