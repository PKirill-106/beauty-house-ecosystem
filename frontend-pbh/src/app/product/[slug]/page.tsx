import ProductTop from '@/components/product-page/ProductTop'
import { ProductProvider } from '@/providers/ProductProvider'

export default function ProductPage() {
	return (
		<>
			<ProductProvider>
				<ProductTop />
			</ProductProvider>
		</>
	)
}
