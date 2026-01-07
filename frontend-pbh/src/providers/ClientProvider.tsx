'use client'

import { store } from '@/state/store'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'

export default function ClientProvider({
	children,
	session,
}: {
	children: React.ReactNode
	session: any
}) {
	return (
		<Provider store={store}>
			<SessionProvider session={session}>{children}</SessionProvider>
		</Provider>
	)
}
