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
import { ICreateOrder, IOrder } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Orders', 'MyOrders', 'Order'],
	endpoints: builder => ({
		getOrders: builder.query<IOrder[], void>({
			queryFn: async () => getAllOrders(),
		}),
		getMyOrders: builder.query<IOrder[], void>({
			queryFn: async () => getMyOrders(),
		}),
		getMyOrderById: builder.query<IOrder, IOrder['id']>({
			queryFn: async orderId => getMyOrderById(orderId),
		}),
		createAuthOrder: builder.mutation<boolean, Partial<ICreateOrder>>({
			queryFn: async orderData => createAuthOrder(orderData),
		}),
		createGuestOrder: builder.mutation<boolean, Partial<ICreateOrder>>({
			queryFn: async orderData => createGuestOrder(orderData),
		}),
		cancelOrder: builder.mutation<boolean, IOrder['id']>({
			queryFn: async orderId => cancelOrder(orderId),
		}),
		setOrderStatusAsPaid: builder.mutation<boolean, IOrder['orderNumber']>({
			queryFn: async orderNumber => updateOrderToPaid(orderNumber),
		}),
		updateOrderStatus: builder.mutation<
			boolean,
			{ orderId: IOrder['id']; status: IOrder['status'] }
		>({
			queryFn: async ({ orderId, status }) => updateOrder(orderId, status),
		}),
	}),
})
