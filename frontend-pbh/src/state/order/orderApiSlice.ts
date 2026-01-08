import {
	cancelOrder,
	createAuthOrder,
	createGuestOrder,
	getAllOrders,
	getMyOrderById,
	getMyOrders,
	updateOrder,
	updateOrderToPaid,
} from '@/lib/services/orderServices'
import { apiWrapper } from '@/lib/utils/api/helpers'
import { ICreateOrder, IOrder } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Orders', 'MyOrders', 'Order'],
	endpoints: builder => ({
		getOrders: builder.query<IOrder[], void>({
			queryFn: async () => apiWrapper(() => getAllOrders()),
		}),
		getMyOrders: builder.query<IOrder[], void>({
			queryFn: async () => apiWrapper(() => getMyOrders()),
		}),
		getMyOrderById: builder.query<IOrder[], IOrder['id']>({
			queryFn: async orderId => apiWrapper(() => getMyOrderById(orderId)),
		}),
		createAuthOrder: builder.mutation<IOrder[], Partial<ICreateOrder>>({
			queryFn: async orderData => apiWrapper(() => createAuthOrder(orderData)),
		}),
		createGuestOrder: builder.mutation<IOrder[], Partial<ICreateOrder>>({
			queryFn: async orderData => apiWrapper(() => createGuestOrder(orderData)),
		}),
		cancelOrder: builder.mutation<IOrder[], IOrder['id']>({
			queryFn: async orderId => apiWrapper(() => cancelOrder(orderId)),
		}),
		setOrderStatusAsPaid: builder.mutation<IOrder[], IOrder['orderNumber']>({
			queryFn: async orderNumber =>
				apiWrapper(() => updateOrderToPaid(orderNumber)),
		}),
		updateOrderStatus: builder.mutation<
			IOrder[],
			{ orderId: IOrder['id']; status: IOrder['status'] }
		>({
			queryFn: async ({ orderId, status }) =>
				apiWrapper(() => updateOrder(orderId, status)),
		}),
	}),
})
