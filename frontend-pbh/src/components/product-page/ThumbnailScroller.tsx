import 'swiper/swiper.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import Thumbnail from './Thumbnail'
import { IThumbnailScroller } from '@/types/interfacesProps'

export default function ThumbnailScroller({
	images,
	productName,
	selectedImageIndex,
	onSelect,
	setSwiperRef,
}: IThumbnailScroller) {
	return (
		<Swiper
			className='p-2! '
			onSwiper={setSwiperRef}
			spaceBetween={8}
			slidesPerView={Math.min(5, images.length)}
			centeredSlides={false}
			slideToClickedSlide={true}
			onSlideChange={swiper => onSelect(swiper.activeIndex)}
		>
			{images.map((img, i) => (
				<SwiperSlide key={i}>
					<Thumbnail
						img={img.filePath}
						index={i}
						productName={productName}
						selectedImageIndex={selectedImageIndex}
						onClick={() => onSelect(i)}
						isModal={false}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
