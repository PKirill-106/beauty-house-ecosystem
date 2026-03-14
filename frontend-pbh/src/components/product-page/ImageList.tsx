import { IImageList } from '@/types/interfacesProps'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import ThumbnailScroller from './ThumbnailScroller'

export default function ImageList({
	product,
	selectedImageIndex,
	setSelectedImageIndex,
	handlePrev,
	handleNext,
	setSwiperRef,
}: IImageList) {
	const imagesCount = product.productImages?.length ?? 0

	return (
		<div className='relative flex gap-1 xl:gap-2 justify-between items-center'>
			<button
				onClick={handlePrev}
				disabled={selectedImageIndex === 0}
				className={`shrink-0 disabled:opacity-30 ${
					selectedImageIndex !== 0 ? 'hover-active-text' : ''
				}`}
			>
				<CircleArrowLeft className='link-size' />
			</button>

			<ThumbnailScroller
				images={product.productImages}
				productName={product.name}
				selectedImageIndex={selectedImageIndex}
				onSelect={setSelectedImageIndex}
				setSwiperRef={setSwiperRef}
			/>

			<button
				onClick={handleNext}
				disabled={selectedImageIndex >= (imagesCount ?? 0) - 1}
				className={`shrink-0 disabled:opacity-30 ${
					selectedImageIndex < (imagesCount ?? 0) - 1 ? 'hover-active-text' : ''
				}`}
			>
				<CircleArrowRight className='link-size' />
			</button>
		</div>
	)
}
