'use client'
import { Button } from '@/components/ui/button'
import useClickoutside from '@/hooks/useClickOutside'
import { getProfileLink } from '@/lib/utils/api/helpers'
import { Heart, Menu, User, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import CounterWrapper from './CounterWrapper'

export default function BurgerMenu() {
	const { data: session, status } = useSession()

	const { isOpen, setIsOpen, ref: menuRef } = useClickoutside()

	const profileLink = getProfileLink({
		role: session?.user.role,
		status: status,
	})

	return (
		<div className='flex justify-end'>
			<Menu
				className='link-size link-hover m-2'
				onClick={() => setIsOpen(!isOpen)}
			/>
			<div
				ref={menuRef}
				className={`fixed z-100 top-0 right-0 w-3/4 max-w-xs h-screen bg-white shadow-lg transform transition-transform duration-300 md:hidden ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className='p-5 flex flex-col gap-6'>
					<button onClick={() => setIsOpen(false)} className='self-end pr-2'>
						<X className='h-6 w-6' />
					</button>
					<hr />
					<Link href='/catalog'>
						<Button
							variant='outline'
							className='w-full hover:bg-button hover:text-button-text active:bg-button active:text-button-text'
						>
							Всі категорії
						</Button>
					</Link>
					<hr />
					<div className='flex flex-col gap-8'>
						<Link
							href={profileLink}
							className='flex items-center gap-3 active:underline hover-active-text group'
						>
							<User className='link-size link-hover' />
							<span>Мій профіль</span>
						</Link>
						<CounterWrapper type='favorites'>
							<div className='flex items-center gap-3 active:underline hover-active-text group'>
								<Heart className='link-size link-hover' />
								<span>Збережене</span>
							</div>
						</CounterWrapper>
					</div>
				</div>
			</div>
		</div>
	)
}
