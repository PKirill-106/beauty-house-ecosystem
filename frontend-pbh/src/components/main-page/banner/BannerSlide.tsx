'use client'
import { Button } from '@/components/ui/button'
import { IBannerSlide } from '@/types/interfacesProps'
import Link from 'next/link'
import { SwiperSlide } from 'swiper/react'

export default function BannerSlide(props: IBannerSlide) {
	return (
		<SwiperSlide key={props.banner.imageURL}>
			<div
				className='flex flex-col items-center justify-end w-full h-full text-white'
				style={{
					backgroundImage: `url(${props.banner.imageURL})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<div>
					{props.banner.buttonText ? (
						<div className='relative mb-15 md:mb-17 lg:md-20 text-center justify-baseline items-center space-y-4'>
							<div className='p-2 absolute inset-0 bg-black/25 blur-3xl rounded-lg -m-2' />
							<h2
								className='max-w-sm md:max-w-lg lg:max-w-xl relative z-10 text-white font-bold! px-4 py-2 pointer-events-none'
								style={{ fontFamily: 'var(--font-heading)' }}
							>
								{props.banner.text}
							</h2>
							<Link href={props.banner.pageURL} className='relative z-10'>
								<Button className='p-6 md:p-7 text-md md:text-lg'>
									{props.banner.buttonText}
								</Button>
							</Link>
						</div>
					) : (
						<div className='relative mb-15 md:mb-17 lg:md-20 text-center justify-baseline items-center space-y-4'>
							<div className='p-2 absolute inset-0 bg-black/25 blur-3xl rounded-lg -m-2' />
							<Link href={props.banner.pageURL}>
								<h2
									className='max-w-sm md:max-w-lg lg:max-w-xl relative z-10 text-white font-bold! px-4 py-2 hover:underline'
									style={{ fontFamily: 'var(--font-heading)' }}
								>
									{props.banner.text}
								</h2>
							</Link>
						</div>
					)}
				</div>
			</div>
		</SwiperSlide>
	)
}
