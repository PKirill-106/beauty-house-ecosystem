import BannerSection from '@/components/main-page/banner/BannerSection'
import MainListSection from '@/components/main-page/list-section/MainListSection'
import { getAllCategories } from '@/lib/services/categoryServices'

export default async function Home() {
	const res = await getAllCategories()
	if (!res || 'error' in res) return
	const categories = res.data

	const parentCat = categories.filter(cat => !cat.parentCategoryId)

	return (
		<>
			<BannerSection />
			<MainListSection
				title='Новинки'
				filterType='new'
				linkHref='/catalog?Novinki=true'
				linkLabel='Переглянути всі'
			/>
			<MainListSection
				title='Знижки'
				filterType='deals'
				linkHref='/catalogAktsiya=true'
				linkLabel='Переглянути всі'
			/>
			{parentCat.map(c => (
				<MainListSection
					key={c.id}
					title={c.name}
					filterType='default'
					linkHref={`/catalog/${c.slug}`}
					linkLabel='Переглянути всі'
				/>
			))}
		</>
	)
}
