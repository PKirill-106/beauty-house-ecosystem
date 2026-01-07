import { IProduct } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import {
	createProduct,
	deleteProduct,
	getAllColors,
	getProductBySlug,
	getProducts,
	updateProduct,
} from '../../lib/services/productServices'
import { apiWrapper } from '../../lib/utils/api/helpers'

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Products', 'Product', 'Colors'],
	endpoints: builder => ({
		getProducts: builder.query<IProduct[], void>({
			queryFn: async () => apiWrapper(() => getProducts()),
		}),
		getProductBySlug: builder.query<IProduct, IProduct['slug']>({
			queryFn: async slug => apiWrapper(() => getProductBySlug(slug)),
			providesTags: (_, __, slug) => [{ type: 'Product', id: slug }],
		}),
		createProduct: builder.mutation<
			IProduct,
			{ formData: FormData; slug: IProduct['slug'] }
		>({
			queryFn: async ({ formData, slug }) =>
				apiWrapper(() => createProduct(formData, slug)),
			invalidatesTags: ['Products'],
		}),
		updateProduct: builder.mutation<
			IProduct,
			{ formData: FormData; slug: IProduct['slug'] }
		>({
			queryFn: async ({ formData, slug }) =>
				apiWrapper(() => updateProduct(formData, slug)),
			invalidatesTags: ['Products'],
		}),
		deleteProduct: builder.mutation<
			void,
			{ id: IProduct['id']; slug: IProduct['slug'] }
		>({
			queryFn: async ({ id, slug }) =>
				apiWrapper(() => deleteProduct(id, slug)),
			invalidatesTags: ['Products'],
		}),
		getAllColors: builder.query<string[], void>({
			queryFn: async () => apiWrapper(() => getAllColors()),
			providesTags: ['Colors'],
		}),
	}),
})

export const {
	useGetProductsQuery,
	useGetProductBySlugQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useGetAllColorsQuery,
} = productApi
