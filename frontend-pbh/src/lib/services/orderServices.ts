'use server'

import { ICreateOrder, IOrder, ResponseType } from '@/types/interfacesApi'
import { api } from '../api/axios'
import { apiWrapper } from '../utils/api/helpers'

export async function getAllOrders() {
	return apiWrapper(async () => {
		const res: ResponseType<IOrder[]> = await api.get('/Order/all')

		return res.data.data
	})
}

export async function getMyOrders() {
	return apiWrapper(async () => {
		const res: ResponseType<IOrder[]> = await api.get('/Order/my')

		return res.data.data
	})
}

export async function getMyOrderById(orderId: string) {
	return apiWrapper(async () => {
		const res: ResponseType<IOrder> = await api.get(`/Order/my${orderId}`)

		return res.data.data
	})
}

export async function createAuthOrder(orderData: Partial<ICreateOrder>) {
	return apiWrapper(async () => {
		await api.post('/Order/create-authenticated', JSON.stringify(orderData))

		return true
	})
}

export async function createGuestOrder(orderData: Partial<ICreateOrder>) {
	return apiWrapper(async () => {
		await api.post('/Order/create-guest', JSON.stringify(orderData))

		return true
	})
}

export async function cancelOrder(orderId: string) {
	return apiWrapper(async () => {
		await api.put(`/Order/cancel/${orderId}`, JSON.stringify(orderId))

		return true
	})
}

export async function updateOrderToPaid(orderNumber: string) {
	return apiWrapper(async () => {
		await api.put(`/Order/paid/${orderNumber}`)
		return true
	})
}

export async function updateOrderStatusAsFailed(orderNumber: string) {
	return apiWrapper(async () => {
		await api.put(`/Order/fail/${orderNumber}`)

		return true
	})
}

export async function updateOrder(orderId: string, status: string) {
	return apiWrapper(async () => {
		await api.put(`/Order/change/${orderId}`, JSON.stringify(status))

		return true
	})
}
