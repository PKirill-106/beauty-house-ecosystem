import {
	addProductToCart,
	getAllProductsFromCart,
	migrateProductToCart,
	removeManyProductFromCart,
	removeProductFromCart,
	updateProductInCart,
} from '@/lib/services/cartServices'
import { ICartItem } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
	reducerPath: 'cartApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Cart'],
	endpoints: builder => ({
		getCartProducts: builder.query<ICartItem[], void>({
			queryFn: async () => getAllProductsFromCart(),
			providesTags: ['Cart'],
		}),
		addCartProducts: builder.mutation<boolean, Partial<ICartItem>>({
			queryFn: async productData => addProductToCart(productData),
			invalidatesTags: ['Cart'],
		}),
		updateCartProducts: builder.mutation<boolean, Partial<ICartItem>>({
			queryFn: async productData => updateProductInCart(productData),
			invalidatesTags: ['Cart'],
		}),
		syncCartProducts: builder.mutation<boolean, ICartItem[]>({
			queryFn: async cartItems => migrateProductToCart(cartItems),
			invalidatesTags: ['Cart'],
		}),
		removeCartProduct: builder.mutation<boolean, ICartItem['productId']>({
			queryFn: async itemId => removeProductFromCart(itemId),
			invalidatesTags: ['Cart'],
		}),
		clearCart: builder.mutation<boolean, ICartItem['productId'][]>({
			queryFn: async itemIds => removeManyProductFromCart(itemIds),
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
