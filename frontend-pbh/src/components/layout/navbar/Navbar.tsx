import SearchBar from '../../searchbar/SearchBar.tsx'
import Logo from '../../ui/Logo.tsx'
import BurgerMenu from './BurgerMenu.tsx'
import NavList from './NavList.tsx'

export default function Navbar() {
	return (
		<header className='container max-w-none flex gap-4 justify-between items-center'>
			<div className='flex-1'>
				<Logo type='dark' height={60} width={60} />
			</div>
			<SearchBar />
			<nav className='flex-1'>
				<NavList />
				<div className='md:hidden'>
					<BurgerMenu />
				</div>
			</nav>
		</header>
	)
}
