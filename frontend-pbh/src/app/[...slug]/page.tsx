import CatalogClient from '@/components/catalog-page/CatalogClient'
import { FilterProvider } from '../../providers/FilterProvider'

export default function CatalogPage() {
	return (
		<FilterProvider>
			<CatalogClient />
		</FilterProvider>
	)
}
