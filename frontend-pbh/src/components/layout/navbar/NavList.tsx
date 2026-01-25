import MyTooltip from '../MyTooltip'
import { navlinkData } from './navlink-data'

export default function NavList() {
	return (
		<ul className='hidden md:flex items-center justify-end gap-5 lg:gap-6'>
			{navlinkData.map(el => (
				<li key={el.tip}>
					<MyTooltip element={el.icon} tip={el.tip} />
				</li>
			))}
		</ul>
	)
}
