import { Instagram } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { pagesList } from './staticPagesList'
import CategoryList from '@/components/ui/CategoryList'
import Logo from '@/components/ui/Logo'

export default function Footer() {
	const year: number = new Date().getFullYear()

	const footerContacts = [
		{
			href: 'tel:+380935412030',
			text: '093 541 20 30',
		},
		{
			href: 'mailto:m.in.m.nails@gmail.com',
			text: 'beauty.house.cv@gmail.com',
		},
	]

	return (
		<section className='bg-foreground text-background section p-8'>
			<div className='container'>
				<div className='flex flex-wrap md:grid-cols-3 gap-4 md:gap-8 justify-between'>
					<div className='flex flex-col flex-1 gap-6'>
						<Logo type='light' height={60} width={60} />
						<span>Пн-Пт: з 10:00 до 19:00</span>
						<div className='flex flex-col gap-3'>
							{footerContacts.map(data => (
								<a key={data.href} href={data.href} className=''>
									<div className='flex items-center justify-center border rounded-full p-2 hover-active-text transition'>
										<span>{data.text}</span>
									</div>
								</a>
							))}
						</div>

						<div className='flex items-center gap-4 md:gap-6'>
							<Link
								className='link-size hover:scale-120 active:scale-120 duration-300 transition-all cursor-pointer'
								href='https://www.instagram.com/professional_cv/'
								target='_blank'
							>
								<Instagram />
							</Link>

							<Link
								className='link-size link-hover'
								href='https://t.me/+0AhVcNR2ThNiZDBi?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGndzohimQYU6Jpi2dCZqwxZf7zqt0AckIVIL-QClw0nlZ2-yc4faeHD6LhTBA_aem_Dy9qV_u03I1hnjGvHT3fzw'
								target='_blank'
							>
								<Image
									src='/telegram.svg'
									alt=''
									width={20}
									height={20}
									className='invert'
								/>
							</Link>
						</div>
						<Image
							src='/payment-logos.svg'
							alt=''
							width={310}
							height={50}
							className='object-cover rounded-md'
						/>
					</div>
					<div className='flex-1 hidden md:block'>
						<h3 className='font-bold'>Каталог</h3>
						<CategoryList
							style='flex flex-col gap-5 py-4 font-light text-sm md:text-base lg:text-lg xl:text-xl'
							isFooter={true}
						/>
					</div>
					<div className='flex-1'>
						<h3 className='font-bold'>Про Beauty House</h3>
						<ul className='flex flex-col gap-5 py-4 font-light text-sm md:text-base lg:text-lg xl:text-xl'>
							{pagesList.map(page => (
								<li key={page.link} className='li-hover'>
									<Link href={page.link}>{page.name}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<p className='text-xs lg:text-sm xl:text-base mt-15'>
					© {year} “Beauty House Professional” — український салон-магазин
					товарів для б'юті індустрії в Україні
				</p>
			</div>
		</section>
	)
}
