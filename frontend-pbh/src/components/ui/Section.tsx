import { ISection } from '@/types/interfacesProps'

export default function Section({
	children,
	className,
	layoutStyle,
}: ISection) {
	return (
		<section className={layoutStyle}>
			<div className={`section-container ${className}`}>{children}</div>
		</section>
	)
}
