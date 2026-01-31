'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetBannersQuery } from '@/state/banner/bannerApiSlice'
import { useRef } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import BannerSlide from './BannerSlide'

export default function BannerSection() {
	const { data: banners, isLoading, isError } = useGetBannersQuery()

	const swiperRef = useRef<SwiperClass | null>(null)

	if ((!banners && !isLoading && !isError) || banners == undefined) {
		return <p>Банери відсутні</p>
	} else if (isError) {
		return <p>Банерів не знайдено</p>
	}

	return (
		<section className='section-container'>
			{isLoading ? (
				<Skeleton className='w-full h-90 md:h-125 rounded-xl overflow-hidden shadow-md' />
			) : (
				<Swiper
					modules={[Pagination, Autoplay]}
					pagination={{ clickable: true }}
					autoplay={{ delay: 4000, disableOnInteraction: false }}
					loop
					onSwiper={swiper => (swiperRef.current = swiper)}
					className='w-full max-w-5xl h-90 md:h-125 mt-6 mx-auto rounded-xl overflow-hidden shadow-md'
					onMouseEnter={() => swiperRef.current?.autoplay.stop()}
					onMouseLeave={() => swiperRef.current?.autoplay.start()}
				>
					{banners.map(banner => (
						<SwiperSlide key={banner.imageURL} className='h-90 md:h-125'>
							<BannerSlide banner={banner} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</section>
	)
}
