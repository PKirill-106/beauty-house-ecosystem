import {
	addProductToCart,
	getAllProductsFromCart,
	migrateProductToCart,
	removeManyProductFromCart,
	removeProductFromCart,
	updateProductInCart,
} from '@/lib/services/cartServices'
import { apiWrapper } from '@/lib/utils/api/helpers'
import { ICartItem } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
	reducerPath: 'cartApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Cart'],
	endpoints: builder => ({
		getCartProducts: builder.query<ICartItem[], void>({
			queryFn: async () => apiWrapper(() => getAllProductsFromCart()),
			providesTags: ['Cart'],
		}),
		addCartProducts: builder.mutation<ICartItem[], Partial<ICartItem>>({
			queryFn: async productData =>
				apiWrapper(() => addProductToCart(productData)),
			invalidatesTags: ['Cart'],
		}),
		updateCartProducts: builder.mutation<ICartItem[], Partial<ICartItem>>({
			queryFn: async productData =>
				apiWrapper(() => updateProductInCart(productData)),
			invalidatesTags: ['Cart'],
		}),
		syncCartProducts: builder.mutation<ICartItem[], ICartItem[]>({
			queryFn: async cartItems =>
				apiWrapper(() => migrateProductToCart(cartItems)),
			invalidatesTags: ['Cart'],
		}),
		removeCartProduct: builder.mutation<ICartItem[], ICartItem['productId']>({
			queryFn: async itemId => apiWrapper(() => removeProductFromCart(itemId)),
			invalidatesTags: ['Cart'],
		}),
		clearCart: builder.mutation<ICartItem[], ICartItem['productId'][]>({
			queryFn: async itemIds =>
				apiWrapper(() => removeManyProductFromCart(itemIds)),
			invalidatesTags: ['Cart'],
		}),
	}),
})

export const {
	useGetCartProductsQuery,
	useAddCartProductsMutation,
	useUpdateCartProductsMutation,
	useSyncCartProductsMutation,
	useRemoveCartProductMutation,
	useClearCartMutation,
} = cartApi
