'use client'
import { ILogo } from '@/types/interfacesProps'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MyTooltip from '../layout/MyTooltip'

export default function Logo(props: ILogo) {
	const pathname = usePathname()

	const logoContent = (
		<div
			className={`${
				pathname === '/' ? '' : 'hover:scale-105 duration-300 transition-all'
			}`}
		>
			<Image
				src={
					props.type === 'dark'
						? '/logo/full-logo.svg'
						: '/logo/full-logo-white.svg'
				}
				alt='beauty house logo'
				width={240}
				height={145}
				className='hidden md:flex object-contain md:w-56 md:h-14 lg:w-60 lg:h-16 xl:w-73 xl:h-18'
			/>
			<Image
				src={
					props.type === 'dark'
						? '/logo/small-logo.svg'
						: '/logo/small-logo.svg'
				}
				alt='beauty house logo'
				width={props.width}
				height={props.height}
				className='md:hidden'
			/>
		</div>
	)

	if (pathname !== '/')
		return (
			<MyTooltip
				element={<Link href='/'>{logoContent}</Link>}
				tip='На Головну'
			/>
		)

	return logoContent
}
