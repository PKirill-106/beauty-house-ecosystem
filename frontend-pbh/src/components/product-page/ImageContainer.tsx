'use client'

import { useProduct } from '@/providers/ProductProvider'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Swiper as SwiperType } from 'swiper/types'
import MainImage from './MainImage'
import ThumbnailScroller from './ThumbnailScroller'
import ImageList from './ImageList'

const DynamicImageModal = dynamic(() => import('./ImageModal'), {
	ssr: false,
	loading: () => <h3>Завантаження...</h3>,
})

export default function ImageContainer() {
	const { product } = useProduct()
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const swiperRef = useRef<SwiperType | null>(null)

	const openModal = useCallback((index: number) => {
		setSelectedImageIndex(index)
		setIsModalOpen(true)
	}, [])

	const handlePrev = useCallback(() => {
		if (selectedImageIndex > 0) {
			const newIndex = selectedImageIndex - 1
			setSelectedImageIndex(newIndex)
			swiperRef.current?.slideTo(newIndex)
		}
	}, [selectedImageIndex, product])

	const handleNext = useCallback(() => {
		if (selectedImageIndex < (product?.productImages?.length ?? 0) - 1) {
			const newIndex = selectedImageIndex + 1
			setSelectedImageIndex(newIndex)
			swiperRef.current?.slideTo(newIndex)
		}
	}, [selectedImageIndex, product])

	const isImages = useMemo(
		() => product?.productImages?.length ?? 0 > 0,
		[product?.productImages],
	)

	if (!product) return

	return (
		<div className='flex flex-col col-span-1'>
			<div>
				<div className='md:sticky md:top-28 md:self-start flex flex-col gap-4 md:gap-3'>
					{isImages ? (
						<MainImage
							images={product.productImages}
							selectedImageIndex={selectedImageIndex}
							onClick={() => openModal(selectedImageIndex)}
							productName={product.name}
						/>
					) : (
						<div className='relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer'>
							<Image
								src='/image-unavailable.svg'
								alt='no images'
								fill
								priority
								className='object-cover'
							/>
						</div>
					)}

					{isImages ? (
						<ImageList
							product={product}
							selectedImageIndex={selectedImageIndex}
							setSelectedImageIndex={setSelectedImageIndex}
							handlePrev={handlePrev}
							handleNext={handleNext}
							setSwiperRef={swiper => (swiperRef.current = swiper)}
						/>
					) : (
						''
					)}
				</div>
			</div>

			<DynamicImageModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				images={product.productImages}
				productName={product.name}
				selectedImageIndex={selectedImageIndex}
				onSelect={setSelectedImageIndex}
				onPrev={handlePrev}
				onNext={handleNext}
			/>
		</div>
	)
}
