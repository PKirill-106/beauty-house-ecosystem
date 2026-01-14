import {
	addProductToWishList,
	getAllProductsFromWishList,
	removeProductFromWishList,
	updateWishList,
} from '@/lib/services/wishlistService'
import { IProduct } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const wishlistApi = createApi({
	reducerPath: 'wishlistApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Wishlist'],
	endpoints: builder => ({
		getWishlistProducts: builder.query<IProduct[], void>({
			queryFn: async () => getAllProductsFromWishList(),
			providesTags: ['Wishlist'],
		}),
		addWishlistProduct: builder.mutation<number, IProduct['id']>({
			queryFn: async productId => addProductToWishList(productId),
			invalidatesTags: ['Wishlist'],
		}),
		updateWishListProducts: builder.mutation<number, string[]>({
			queryFn: async wishlistItemIds => updateWishList(wishlistItemIds),
			invalidatesTags: ['Wishlist'],
		}),
		removeWishListProduct: builder.mutation<number, string>({
			queryFn: async wishlistItemId =>
				removeProductFromWishList(wishlistItemId),
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
