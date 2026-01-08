import { productApi } from '@/state/product/productApiSlice'
import { configureStore } from '@reduxjs/toolkit'
import { bannerApi } from './banner/bannerApiSlice'
import { cartApi } from './cart/cartApiSlice'
import { categoryApi } from './category/categoryApiSlice'
import { discountApi } from './discount/discountApiSlice'
import { orderApi } from './order/orderApiSlice'
import { reviewApi } from './review/reviewApiSlice'
import { seasonApi } from './season/seasonApiSlice'
import { userApi } from './user/userApiSlice'
import { wishlistApi } from './wishlist/wishlistApiSlice'

export const store = configureStore({
	reducer: {
		[bannerApi.reducerPath]: bannerApi.reducer,
		[cartApi.reducerPath]: cartApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		[discountApi.reducerPath]: discountApi.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
		[productApi.reducerPath]: productApi.reducer,
		[reviewApi.reducerPath]: reviewApi.reducer,
		[seasonApi.reducerPath]: seasonApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[wishlistApi.reducerPath]: wishlistApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			bannerApi.middleware,
			cartApi.middleware,
			categoryApi.middleware,
			discountApi.middleware,
			orderApi.middleware,
			productApi.middleware,
			reviewApi.middleware,
			seasonApi.middleware,
			userApi.middleware,
			wishlistApi.middleware
		),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
