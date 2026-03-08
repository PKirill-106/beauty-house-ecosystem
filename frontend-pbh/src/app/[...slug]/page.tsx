import CatalogClient from '@/components/catalog-page/CatalogClient'
import Section from '@/components/ui/Section'
import { CatalogPageProps } from '@/types/interfacesProps'
import { FilterProvider } from '../../providers/FilterProvider'

export default function CatalogPage({
	params,
	searchParams,
}: CatalogPageProps) {
	return (
		<Section>
			<FilterProvider>
				<CatalogClient params={params} searchParams={searchParams} />
			</FilterProvider>
		</Section>
	)
}
