import { Skeleton } from '../skeleton'

export default function ProductSkeleton() {
	return (
		<div className='flex flex-col gap-2 md:gap-3 lg:gap-4'>
			<Skeleton className='aspect-square' />
			<div className='flex flex-col gap-2 justify-between'>
				<Skeleton className='rounded-full h-4 w-2/3' />
				<Skeleton className='rounded-full h-2 w-2/4' />
				<Skeleton className='rounded-full h-6 w-1/4' />
			</div>
		</div>
	)
}
