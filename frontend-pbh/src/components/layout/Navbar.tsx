import Logo from '../ui/Logo'

export default function Navbar() {
	return (
		<header className='flex p-4 md:p-0 gap-4'>
			<Logo type='dark' height={60} width={60} />
			<nav>Navbar</nav>
		</header>
	)
}
