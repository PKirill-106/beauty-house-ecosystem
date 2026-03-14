import Section from '../ui/Section'
import ImageContainer from './ImageContainer'
import ProductSummary from './ProductSummary'

export default function ProductTop() {
	return (
		<Section className='flex flex-col md:grid md:grid-cols-2 md:gap-4 lg:gap-6'>
			<ImageContainer />
			<ProductSummary />
		</Section>
	)
}
