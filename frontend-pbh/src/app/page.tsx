import BannerSection from '@/components/main-page/banner/BannerSection'
import MainListSection from '@/components/main-page/list-section/MainListSection'

export default function Home() {
	return (
		<>
			<BannerSection />
			<MainListSection
				title='Popular products'
				highlightedPart='Popular'
				filterType='default'
				linkHref='/products'
				linkLabel='See all popular products'
			/>
		</>
	)
}
