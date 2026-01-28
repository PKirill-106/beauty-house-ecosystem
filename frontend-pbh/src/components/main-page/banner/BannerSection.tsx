'use client'
import { useGetBannersQuery } from '@/state/banner/bannerApiSlice'
import { useRef } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperClass } from 'swiper/react'
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
		<section className='relative mt-6 w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-md'>
			<Swiper
				modules={[Pagination, Autoplay]}
				pagination={{ clickable: true }}
				autoplay={{ delay: 4000, disableOnInteraction: false }}
				loop
				onSwiper={swiper => (swiperRef.current = swiper)}
				className='w-full h-90 md:h-125'
				onMouseEnter={() => swiperRef.current?.autoplay.stop()}
				onMouseLeave={() => swiperRef.current?.autoplay.start()}
			>
				{banners.map(banner => (
					<BannerSlide key={banner.imageURL} banner={banner} />
				))}
			</Swiper>
		</section>
	)
}
