'use client'

import { PAGES } from '@/config/pages.config';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

function NavLink({ href, text }: { href: string; text: string }) {
	const pathname = usePathname()
	return (
		<Link
			className={`
                ${!!match(href)(pathname) ? ' bg-dark-blue text-white' : 'bg-white hover:bg-dark-blue/10 text-light-text'} 
                text-base px-1.25 transition-colors duration-300 rounded-2xl inline-flex items-center
            `}
			href={href}
		>
			{text}
		</Link>
	)
}

export function Navbar() {
	return <div className='md:flex hidden gap-0.25 items-stretch'>
        {
            PAGES.getNavLinks().map((link, index) => (
                <NavLink key={index} href={link.href} text={link.text} />
            ))
        }
    </div>
}
