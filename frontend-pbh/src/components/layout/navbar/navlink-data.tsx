import { Heart, ShoppingBag, User } from 'lucide-react'
import CounterWrapper from './CounterWrapper'
import Link from 'next/link'

const styles = 'link-size link-hover'

export const navlinkData = [
	{
		icon: (
			<CounterWrapper type='favorites'>
				<Heart className={styles} />
			</CounterWrapper>
		),
		tip: 'Обране',
	},
	{
		icon: (
			<CounterWrapper type='cart'>
				<ShoppingBag className={styles} />
			</CounterWrapper>
		),
		tip: 'Кошик',
	},
	{
		icon: (
			<Link href='/profile' className='link-hover'>
				<User className={styles} />
			</Link>
		),
		tip: 'Мій Профіль',
	},
]
