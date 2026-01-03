'use server'

import { ICreateOrder } from '@/types/interfacesApi'
import { api, publicApi } from '../api/axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllOrders() {
	const { data } = await api.get('/Order/all').catch(error => {
		throw new Error('Failed to fetch orders: ', error)
	})

	return data.data
}

export async function getMyOrders() {
	const { data } = await api.get('/Order/my').catch(error => {
		throw new Error('Failed to fetch my orders: ', error)
	})

	return data.data
}

export async function getMyOrderById(orderId: string) {
	const { data } = await api.get(`/Order/my${orderId}`).catch(error => {
		throw new Error('Failed to fetch my order by id: ', error)
	})

	return data.data
}

export async function createAuthOrder(orderData: Partial<ICreateOrder>) {
	const { data } = await api
		.post('/Order/create-authenticated', JSON.stringify(orderData))
		.catch(error => {
			throw new Error('Failed to create auth order: ', error)
		})

	return data.data
}

export async function createGuestOrder(orderData: Partial<ICreateOrder>) {
	const { data } = await publicApi
		.post('/Order/create-guest', JSON.stringify(orderData))
		.catch(error => {
			throw new Error('Failed to create guest order: ', error)
		})

	return data.data
}

export async function cancelOrder(orderId: string) {
	const { data } = await api
		.put(`/Order/cancel/${orderId}`, JSON.stringify(orderId))
		.catch(error => {
			throw new Error('Failed to cancel order: ', error)
		})

	return data.data
}

export async function updateOrderToPaid(orderNumber: string, token: string) {
	const { data } = await api.put(`/Order/paid/${orderNumber}`).catch(error => {
		throw new Error('Failed to set order as paid: ', error)
	})

	return data.data
}

export async function updateOrderStatusAsFailed(orderNumber: string) {
	const { data } = await api.put(`/Order/fail/${orderNumber}`).catch(error => {
		throw new Error('Failed to set order as failed: ', error)
	})

	return data.data
}

export async function updateOrder(orderId: string, status: string) {
	const { data } = await api
		.put(`/Order/change/${orderId}`, JSON.stringify(status))
		.catch(error => {
			throw new Error('Failed to change order status: ', error)
		})

	return data.data
}
