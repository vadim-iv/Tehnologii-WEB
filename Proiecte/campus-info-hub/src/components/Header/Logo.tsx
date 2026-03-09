import { GraduationCap } from 'lucide-react'
import Link from 'next/link'

import { BgIcon } from '../ui/BgIcon'
import { PAGES } from '@/config/pages.config'

export function Logo() {
	return (
		<Link
			href={ PAGES.HOME }
			className='flex items-center gap-0.5 select-none'
		>
			<BgIcon
				icon={GraduationCap}
				iconColor='white'
				bgColor='dark-blue'
				iconSize={1.5}
				className='p-0.5 rounded-xl'
			/>
			<span className='text-xl font-bold text-dark-text'>Campus Info Hub</span>
		</Link>
	)
}
