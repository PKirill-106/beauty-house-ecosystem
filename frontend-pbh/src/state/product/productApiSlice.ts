import { IProduct, IProductColor } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import {
	createProduct,
	deleteProduct,
	getAllColors,
	getProductBySlug,
	getProducts,
	updateProduct,
} from '../../lib/services/productServices'
import { ErrorType } from '../../types/interfacesApi'

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fakeBaseQuery<ErrorType>(),
	tagTypes: ['Products', 'Product', 'Colors'],
	endpoints: builder => ({
		getProducts: builder.query<IProduct[], void>({
			queryFn: async () => getProducts(),
			providesTags: ['Products'],
		}),
		getProductBySlug: builder.query<IProduct, IProduct['slug']>({
			queryFn: async slug => getProductBySlug(slug),
			providesTags: (_, __, slug) => [{ type: 'Product', id: slug }],
		}),
		createProduct: builder.mutation<
			boolean,
			{ formData: FormData; slug: IProduct['slug'] }
		>({
			queryFn: async ({ formData, slug }) => createProduct(formData, slug),
			invalidatesTags: ['Products'],
		}),
		updateProduct: builder.mutation<
			boolean,
			{ formData: FormData; slug: IProduct['slug'] }
		>({
			queryFn: async ({ formData, slug }) => updateProduct(formData, slug),
			invalidatesTags: ['Products'],
		}),
		deleteProduct: builder.mutation<
			boolean,
			{ id: IProduct['id']; slug: IProduct['slug'] }
		>({
			queryFn: async ({ id, slug }) => deleteProduct(id, slug),
			invalidatesTags: ['Products'],
		}),
		getAllColors: builder.query<IProductColor[], void>({
			queryFn: async () => getAllColors(),
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
