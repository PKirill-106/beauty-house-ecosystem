import { Heart, Instagram, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import Logo from '../../ui/Logo.tsx'
import MyTooltip from '../MyTooltip.tsx'
import SearchBar from '../../searchbar/SearchBar.tsx'

export default function Navbar() {
	return (
		<header className='container max-w-none flex gap-4 justify-between items-center'>
			<div className='flex-1'>
				<Logo type='dark' height={60} width={60} />
			</div>
			<SearchBar />
			<nav className='flex-1'>
				<ul className='flex items-center justify-end gap-6'>
					<li>
						<MyTooltip
							element={
								<Link
									href='https://www.instagram.com/professional_cv/'
									target='_blank'
								>
									<Instagram className='link-size link-hover' />
								</Link>
							}
							tip='Instagram'
						/>
					</li>
					<li>
						<MyTooltip
							element={
								<Link href='/profile'>
									<User className='link-size link-hover' />
								</Link>
							}
							tip='Мій Профіль'
						/>
					</li>
					<li>
						<MyTooltip
							element={
								<Link href='/favorites'>
									<Heart className='link-size link-hover' />
								</Link>
							}
							tip='Обране'
						/>
					</li>
					<li>
						<MyTooltip
							element={
								<Link href='/cart'>
									<ShoppingBag className='link-size link-hover' />
								</Link>
							}
							tip='Кошик'
						/>
					</li>
				</ul>
			</nav>
		</header>
	)
}
