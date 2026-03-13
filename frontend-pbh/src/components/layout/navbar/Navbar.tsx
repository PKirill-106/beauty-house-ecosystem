'use client'
import CategoryList from '@/components/ui/CategoryList.tsx'
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useMotionValueEvent,
	useScroll,
	useSpring,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import SearchBar from '../../searchbar/SearchBar.tsx'
import Logo from '../../ui/Logo.tsx'
import BurgerMenu from './BurgerMenu.tsx'
import NavList from './NavList.tsx'

export default function Navbar() {
	const sentinelRef = useRef<HTMLDivElement | null>(null)
	const [isSticky, setIsSticky] = useState(false)

	const isMobile = useMediaQuery('(max-width: 768px')

	const { scrollY } = useScroll()

	const headerHeight = 95

	const targetY = useMotionValue(0)

	const headerY = useSpring(targetY, {
		stiffness: 300,
		damping: 35,
		restDelta: 0.001,
	})

	useMotionValueEvent(scrollY, 'change', latest => {
		if (isMobile) return

		const previous = scrollY.getPrevious() ?? 0
		const diff = latest - previous

		if (Math.sign(diff) === 1) {
			targetY.set(-headerHeight)
		} else {
			targetY.set(0)
		}
	})

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsSticky(!entry.isIntersecting)
			},
			{ threshold: 0, rootMargin: '100px 0px 0px 0px' },
		)
		if (sentinelRef.current) observer.observe(sentinelRef.current)
		return () => observer.disconnect()
	}, [])

	const TopContent = (
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
	)

	const Categories = (
		<CategoryList
			showSubCat={true}
			style='absolute right-0 left-0 hidden md:flex md:items-stretch md:gap-4 md:justify-between bg-neutral-100 p-4'
			subCatStyle='md:absolute md:top-full md:z-10 flex flex-col justify-between min-w-full bg-neutral-100 p-2 rounded-md overflow-hidden'
		/>
	)

	return (
		<>
			<header
				ref={sentinelRef}
				className='section-container max-w-none md:mb-14'
			>
				{TopContent}
				{Categories}
			</header>

			<AnimatePresence>
				{isSticky && (
					<motion.header
						style={{ y: headerY }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed top-0 left-0 right-0 z-50 bg-white shadow-lg section-container max-w-none md:mb-0'
					>
						<div style={{ opacity: isSticky ? 1 : 0 }}>{TopContent}</div>
						{Categories}
					</motion.header>
				)}
			</AnimatePresence>
		</>
	)
}
