import Footer from '@/components/layout/footer/Footer'
import Navbar from '@/components/layout/navbar/Navbar'
import { ApiProvider } from '@/lib/api/apiClient'
import { authOptions } from '@/lib/auth'
import CartProvider from '@/providers/CartProvider'
import ClientProvider from '@/providers/ClientProvider'
import { FavoritesProvider } from '@/providers/FavoritesProvider'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Montserrat, Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin', 'cyrillic'],
})

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	metadataBase: new URL('https://localhost:3000/'),
	title: 'Beauty House — Твоя професійна техніка для б’юті-сфери',
	description:
		'Найкращі девайси та обладнання для справжніх про! Тут знайдеш усе: від фенів та машинок до меблів для салонів. Працюй з комфортом разом з Beauty House.',
	keywords: [
		// UA
		'техніка для салонів краси',
		'перукарське обладнання',
		'все для майстрів манікюру',
		'професійні фени купити',
		'лампи для манікюру',
		'обладнання для б’юті майстрів',
		// RU
		'профессиональная техника для красоты',
		'магазин для бьюти мастеров',
		'оборудование для парикмахеров',
		'купить технику для салона красоты',
		// EN
		'beauty house',
		'beauty tools shop',
		'hairdresser equipment',
	],
	openGraph: {
		title: 'Beauty House - Магазин професійної техніки',
		description:
			'Оснащуй своє робоче місце по-красоті! Тільки перевірені бренди та гарантія на все.',
		url: 'https://beautyhouse.com.ua/',
		siteName: 'Beauty House',
		locale: 'uk_UA',
		type: 'website',
	},
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authOptions)

	return (
		<html lang='uk_UA'>
			<head>
				<link
					rel='icon'
					href='@/icon.svg'
					type='image/<generated>'
					sizes='<generated>'
				/>
			</head>
			<body className={`${montserrat.variable} ${roboto.variable} antialiased`}>
				<ClientProvider session={session}>
					<CartProvider>
						<FavoritesProvider>
							<ApiProvider />
							<Toaster position='top-center' />
							<div className='min-h-screen flex flex-col'>
								<Navbar />
								<main className='main-section'>{children}</main>
								<Footer />
							</div>
						</FavoritesProvider>
					</CartProvider>
				</ClientProvider>
			</body>
		</html>
	)
}
