import { IGetProfileLink, ITriggerAnimation } from '@/types/interfacesProps'

export const apiWrapper = async <T>(
	fn: () => Promise<T>
): Promise<
	{ data: T } | { error: { status: string | number; message: string } }
> => {
	try {
		const data = await fn()

		return { data }
	} catch (err: any) {
		const message =
			err?.response?.data?.message || err?.message || 'Unknown error'

		const status = err?.response?.status || 'CUSTOM_ERROR'

		const error = {
			error: {
				status,
				message,
			},
		}
		console.error(error.error)

		return error
	}
}
export const getProfileLink = ({ role, status }: IGetProfileLink) => {
	let profileHref = '/sign-in'
	if (status === 'authenticated') {
		profileHref = role === 'Admin' ? '/admin' : '/profile?tab=profile'
	}

	return profileHref
}
export const triggerAnimation = ({ setCount }: ITriggerAnimation) => {
	setCount(prev => prev + 1)
	setTimeout(() => {
		setCount(prev => prev - 1)
	}, 1500)
}
