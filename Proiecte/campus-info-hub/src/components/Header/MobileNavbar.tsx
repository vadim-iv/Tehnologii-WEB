'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import { useEffect, useState } from 'react'

import { PAGES } from '@/config/pages.config'

export function MobileNavbar() {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		const original = document.body.style.overflow
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = original
		}
		return () => {
			document.body.style.overflow = original
		}
	}, [isOpen])

	return (
		<div className='flex items-center md:hidden'>
			<Menu
				className='text-dark-blue size-1.75 cursor-pointer'
				onClick={() => setIsOpen(true)}
			/>

			<div
				className={`${isOpen ? 'translate-x-0' : 'translate-x-full'} border border-gray-300/50 transition-transform duration-300 fixed top-0 right-0 bottom-0 bg-white max-w-25 w-full z-500`}
			>
				<div className='p-1.5'>
					<X
						className='cursor-pointer text-dark-blue size-1.75 justify-self-end'
						onClick={() => setIsOpen(false)}
					/>

					<div className='flex flex-col gap-3 mt-6 text-3xl font-light text-center'>
						{PAGES.getNavLinks().map((link, index) => (
							<Link
								onClick={() => {
									if (!!match(link.href)(pathname) === false) setIsOpen(false)
								}}
								key={index}
								href={link.href}
								className=' text-dark-text'
							>
								{!!match(link.href)(pathname) ? `| ${link.text} |` : link.text}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
