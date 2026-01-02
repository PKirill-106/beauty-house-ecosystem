import { signOut } from 'next-auth/react'
import { refreshTokens } from '../services/userServices'
import { api } from './axios'

let isRefreshing = false
let subscribers: ((token: string) => void)[] = []

function onRefreshed(token: string) {
	subscribers.forEach(cb => cb(token))
	subscribers = []
}

function addSubscriber(cb: (token: string) => void) {
	subscribers.push(cb)
}

export function setupInterceptors(
	getSession: () => Promise<any>,
	updateSession: (data: any) => Promise<any>
) {
	api.interceptors.request.use(async config => {
		const session = await getSession()

		if (session?.user?.accessToken) {
			config.headers.Authorization = `Bearer ${session.user.accessToken}`
		}

		return config
	})

	api.interceptors.response.use(
		res => res,
		async error => {
			const originalRequest = error.config

			if (error.response?.status !== 401 || originalRequest._retry) {
				return Promise.reject(error)
			}

			originalRequest._retry = true

			if (isRefreshing) {
				return new Promise(resolve => {
					addSubscriber(token => {
						originalRequest.headers.Authorization = `Bearer ${token}`
						resolve(api(originalRequest))
					})
				})
			}

			isRefreshing = true

			try {
				const session = await getSession()
				const refreshed = await refreshTokens(
					session.user.accessToken,
					session.user.refreshToken
				)

				await updateSession({
					accessToken: refreshed.accessToken,
					refreshToken: refreshed.refreshToken,
					expiresAt: refreshed.expiresAt,
				})

				onRefreshed(refreshed.accessToken)

				originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`
				return api(originalRequest)
			} catch (e) {
				await signOut({ redirect: true })
				return Promise.reject(e)
			} finally {
				isRefreshing = false
			}
		}
	)
}
