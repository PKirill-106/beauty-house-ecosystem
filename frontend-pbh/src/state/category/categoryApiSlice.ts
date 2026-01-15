import {
	createCategory,
	deleteCategory,
	getAllCategories,
	updateCategory,
} from '@/lib/services/categoryServices'
import { ICategory, IDeleteCategory } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Categories'],
	endpoints: builder => ({
		getCategories: builder.query<ICategory[], void>({
			queryFn: async () => getAllCategories(),
			providesTags: ['Categories'],
		}),
		createCategory: builder.mutation<boolean, FormData>({
			queryFn: async formData => createCategory(formData),
			invalidatesTags: ['Categories'],
		}),
		updateCategory: builder.mutation<boolean, FormData>({
			queryFn: async formData => updateCategory(formData),
			invalidatesTags: ['Categories'],
		}),
		deleteProduct: builder.mutation<boolean, IDeleteCategory>({
			queryFn: async categoryDeleteData => deleteCategory(categoryDeleteData),
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
