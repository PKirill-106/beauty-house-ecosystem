'use server'

import { IAuth, IUserInfo } from '@/types/interfacesApi'
import { revalidatePath } from 'next/cache'
import { api } from '../api/axios'

export async function signUpUser(userData: IAuth) {
	const { data } = await api
		.post('/User/Register', JSON.stringify(userData))
		.catch(error => {
			throw new Error(error)
		})

	return data.data
}

export async function signInUser(credentials: {
	email: string
	password: string
}) {
	const { data } = await api
		.post('/User/Login', JSON.stringify(credentials))
		.catch(error => {
			throw new Error(error)
		})

	return {
		email: credentials.email,
		accessToken: data.data.accessToken,
		refreshToken: data.data.refreshToken,
		expiresAt: data.data.expiresAt,
	}
}

export async function logout(accessToken: string, refreshToken: string) {
	const { data } = await api
		.post(
			'/User/Login',
			JSON.stringify({
				accessToken,
				refreshToken,
			})
		)
		.catch(error => {
			throw new Error(error)
		})

	return {
		success: true,
		message: data.message || 'Logged out successfully',
	}
}

export async function getUserInfo() {
	const { data } = await api.get('/User/UserInfo').catch(error => {
		throw new Error(error)
	})

	return data.data
}

export async function updateUserInfo(userData: Partial<IUserInfo>) {
	const { data } = await api
		.put('/User/UpdateInfo', JSON.stringify(userData))
		.catch(error => {
			throw new Error(error)
		})

	revalidatePath(`/profile`)
	return data.data
}

export async function refreshTokens(accessToken: string, refreshToken: string) {
	const { data } = await api
		.put('/User/RefreshToken', JSON.stringify({ accessToken, refreshToken }))
		.catch(error => {
			console.error('[refreshTokens] Error:', error)
			throw new Error(error)
		})

	return {
		accessToken: data.data.accessToken,
		refreshToken: data.data.refreshToken || refreshToken,
		expiresAt:
			data.data.expiresAt ||
			new Date(Date.now() + 15 * 60 * 1000).toISOString(),
	}
}
