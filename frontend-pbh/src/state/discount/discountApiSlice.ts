import {
	createDiscount,
	getAllDiscounts,
	getDiscountById,
	updateDiscount,
} from '@/lib/services/discountServices'
import { IDiscount } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const discountApi = createApi({
	reducerPath: 'discountApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Discounts'],
	endpoints: builder => ({
		getDiscounts: builder.query<IDiscount[], void>({
			queryFn: async () => getAllDiscounts(),
			providesTags: ['Discounts'],
		}),
		getDiscountById: builder.query<IDiscount, IDiscount['id']>({
			queryFn: async id => getDiscountById(id),
			providesTags: ['Discounts'],
		}),
		createDiscount: builder.mutation<boolean, Omit<IDiscount, 'id' | 'slug'>>({
			queryFn: async discountData => createDiscount(discountData),
			invalidatesTags: ['Discounts'],
		}),
		updateDiscount: builder.mutation<boolean, Omit<IDiscount, 'slug'>>({
			queryFn: async discountData => updateDiscount(discountData),
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
