import { Clock } from 'lucide-react'

import { BgIcon } from '@/components/ui/BgIcon'

import { HourText } from '../ui/HourText'
import Image from 'next/image'

export function CafeteriaHours() {
	return (
		<div className='mx-section-x mt-4 scroll-mt-8 p-2.5 shadow-md rounded-2xl border border-gray-300/20'>
			<div className='flex items-center gap-0.75'>
				<BgIcon
					icon={Clock}
					iconSize={1.5}
					iconColor='dark-blue'
					bgColor='dark-blue'
					bgOpacity={10}
					className='p-0.75 rounded-xl'
				/>
				<h2 className='text-3xl font-bold text-dark-text'>Ore de funcționare</h2>
			</div>

			<div className='mt-2 flex gap-1.5 sm:flex-row flex-col'>
				<div className='flex-1 border border-gray-300/50 rounded-2xl p-2'>
					<HourText
						title='Mic dejun'
						hours='08:00 - 10:00'
					/>
					<HourText
						title='Prânz'
						hours='12:00 - 14:00'
					/>
					<HourText
						title='Cină'
						hours='18:00 - 20:00'
					/>
					<HourText
						title='Gustări și cafea'
						hours='9:00 - 20:00'
					/>
				</div>

				<div className='flex-1 rounded-lg overflow-hidden'>
					<Image 
						src="/pancake.jpg"
						alt="Pancake"
						width={400}
						height={400}
						className='w-full h-full object-cover'
					/>
				</div>
			</div>
		</div>
	)
}
