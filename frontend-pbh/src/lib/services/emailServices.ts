'use server'

import { publicApi } from '../api/axios'

export async function codeRequest(email: string) {
	const { data } = await publicApi
		.post('/EmailSender/request-confirmation-code', JSON.stringify(email))
		.catch(error => {
			throw new Error('[codeRequest] Error:', error)
		})

	return data.data
}

export async function confirmEmail(email: string, code: string, token: string) {
	const { data } = await publicApi
		.post('/EmailSender/confirm-email', JSON.stringify({ email, code, token }))
		.catch(error => {
			throw new Error('[confirmEmail] Error:', error)
		})

	return data.data
}
