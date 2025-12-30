import { ILogo } from '@/types/interfacesProps'
import Image from 'next/image'

export default function Logo(props: ILogo) {
	return (
		<div className=''>
			<Image
				src={
					props.type === 'dark'
						? './logo/full-logo.svg'
						: './logo/full-logo-white.svg'
				}
				alt='beauty house logo'
				width={240}
				height={145}
				className='hidden md:flex object-contain md:w-60 md:h-14 lg:w-60 lg:h-16 xl:w-76 xl:h-18'
			/>
			<Image
				src={
					props.type === 'dark'
						? './logo/small-logo.svg'
						: './logo/small-logo.svg'
				}
				alt='beauty house logo'
				width={props.width}
				height={props.height}
				className='md:hidden'
			/>
		</div>
	)
}
