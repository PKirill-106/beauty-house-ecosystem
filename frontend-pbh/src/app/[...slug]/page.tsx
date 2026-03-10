import CatalogClient from '@/components/catalog-page/CatalogClient'
import Section from '@/components/ui/Section'
import { FilterProvider } from '../../providers/FilterProvider'

export default function CatalogPage() {
	return (
		<Section>
			<FilterProvider>
				<CatalogClient />
			</FilterProvider>
		</Section>
	)
}
