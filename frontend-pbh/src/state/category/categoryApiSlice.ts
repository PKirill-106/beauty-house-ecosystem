import {
	createCategory,
	deleteCategory,
	getAllCategories,
	updateCategory,
} from '@/lib/services/categoryServices'
import { apiWrapper } from '@/lib/utils/api/helpers'
import { ICategory, IDeleteCategory } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Categories'],
	endpoints: builder => ({
		getCategories: builder.query<ICategory[], void>({
			queryFn: async () => apiWrapper(() => getAllCategories()),
			providesTags: ['Categories'],
		}),
		createCategory: builder.mutation<ICategory, FormData>({
			queryFn: async formData => apiWrapper(() => createCategory(formData)),
			invalidatesTags: ['Categories'],
		}),
		updateCategory: builder.mutation<ICategory, FormData>({
			queryFn: async formData => apiWrapper(() => updateCategory(formData)),
			invalidatesTags: ['Categories'],
		}),
		deleteProduct: builder.mutation<boolean, IDeleteCategory>({
			queryFn: async categoryDeleteData =>
				apiWrapper(() => deleteCategory(categoryDeleteData)),
			invalidatesTags: ['Categories'],
		}),
	}),
})

export const {
	useGetCategoriesQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteProductMutation,
} = categoryApi
