import CategoryList from '@/components/ui/CategoryList.tsx'
import SearchBar from '../../searchbar/SearchBar.tsx'
import Logo from '../../ui/Logo.tsx'
import BurgerMenu from './BurgerMenu.tsx'
import NavList from './NavList.tsx'

export default function Navbar() {
	return (
		<header className='container max-w-none'>
			<div className='flex gap-4 justify-between items-center'>
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
			</div>
			<CategoryList
				showSubCat={true}
				style='absolute right-0 left-0 hidden md:flex md:items-stretch md:gap-4 md:justify-between bg-neutral-100 p-4 mt-4'
				subCatStyle='md:absolute md:top-full md:left-0 md:z-10 flex flex-col justify-between min-w-full bg-neutral-100 p-2 rounded-md overflow-hidden'
			/>
		</header>
	)
}
