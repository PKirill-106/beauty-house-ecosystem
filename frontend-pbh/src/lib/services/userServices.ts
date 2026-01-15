'use server'

import {
	IAuth,
	IAuthResponse,
	IUserInfo,
	ResponseType,
} from '@/types/interfacesApi'
import { revalidatePath } from 'next/cache'
import { api } from '../api/axios'
import { apiWrapper } from '../utils/api/helpers'

export async function signUpUser(userData: IAuth) {
	return apiWrapper(async () => {
		await api.post('/User/Register', JSON.stringify(userData))

		return true
	})
}

export async function signInUser(credentials: {
	email: string
	password: string
}) {
	return apiWrapper(async () => {
		const res: ResponseType<Omit<IAuthResponse, 'email'>> = await api.post(
			'/User/Login',
			JSON.stringify(credentials)
		)

		return {
			email: credentials.email,
			accessToken: res.data.data.accessToken,
			refreshToken: res.data.data.refreshToken,
			expiresAt: res.data.data.expiresAt,
		}
	})
}

export async function logout(accessToken: string, refreshToken: string) {
	return apiWrapper(async () => {
		await api.post('/User/Login', JSON.stringify({ accessToken, refreshToken }))

		return true
	})
}

export async function getUserInfo() {
	return apiWrapper(async () => {
		const res: ResponseType<IUserInfo> = await api.get('/User/UserInfo')

		return res.data.data
	})
}

export async function updateUserInfo(userData: Partial<IUserInfo>) {
	return apiWrapper(async () => {
		await api.put('/User/UpdateInfo', JSON.stringify(userData))

		revalidatePath(`/profile`)
		return true
	})
}

export async function refreshTokens(accessToken: string, refreshToken: string) {
	return apiWrapper(async () => {
		const res: ResponseType<Omit<IAuthResponse, 'email'>> = await api.put(
			'/User/RefreshToken',
			JSON.stringify({ accessToken, refreshToken })
		)

		return {
			accessToken: res.data.data.accessToken,
			refreshToken: res.data.data.refreshToken || refreshToken,
			expiresAt:
				res.data.data.expiresAt ||
				new Date(Date.now() + 15 * 60 * 1000).toISOString(),
		}
	})
}
