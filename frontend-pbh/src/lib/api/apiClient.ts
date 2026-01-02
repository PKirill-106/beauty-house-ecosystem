'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { setupInterceptors } from './authRefresh'

export function ApiProvider() {
	const { data: session, update } = useSession()

	useEffect(() => {
		if (!session) return

		setupInterceptors(() => Promise.resolve(session), update)
	}, [session, update])

	return null
}
