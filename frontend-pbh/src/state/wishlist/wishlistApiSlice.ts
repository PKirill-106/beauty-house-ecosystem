import {
	addProductToWishList,
	getAllProductsFromWishList,
	removeProductFromWishList,
	updateWishList,
} from '@/lib/services/wishlistService'
import { apiWrapper } from '@/lib/utils/api/helpers'
import { IProduct } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const wishlistApi = createApi({
	reducerPath: 'wishlistApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Wishlist'],
	endpoints: builder => ({
		getWishlistProducts: builder.query<IProduct[], void>({
			queryFn: async () => apiWrapper(() => getAllProductsFromWishList()),
			providesTags: ['Wishlist'],
		}),
		addWishlistProduct: builder.mutation<IProduct[], IProduct['id']>({
			queryFn: async productId =>
				apiWrapper(() => addProductToWishList(productId)),
			invalidatesTags: ['Wishlist'],
		}),
		updateWishListProducts: builder.mutation<IProduct[], string[]>({
			queryFn: async wishlistItemIds =>
				apiWrapper(() => updateWishList(wishlistItemIds)),
			invalidatesTags: ['Wishlist'],
		}),
		removeWishListProduct: builder.mutation<IProduct[], string>({
			queryFn: async wishlistItemId =>
				apiWrapper(() => removeProductFromWishList(wishlistItemId)),
			invalidatesTags: ['Wishlist'],
		}),
	}),
})

export const {
	useGetWishlistProductsQuery,
	useAddWishlistProductMutation,
	useUpdateWishListProductsMutation,
	useRemoveWishListProductMutation,
} = wishlistApi
