import { Calendar } from 'lucide-react'

import { Hero } from '../Hero'
import { BgIcon } from '../ui/BgIcon'

export function EventsHero() {
	return (
		<Hero
			height='75vh'
			overlayOpacity={80}
			imageUrl='/events-hero.jpg'
		>
			<div className='flex flex-col items-center mt-4.5 px-section-x'>
				<BgIcon
					icon={Calendar}
					iconColor='white'
					bgColor='white'
					bgOpacity={10}
					iconSize={2}
					className='p-1 rounded-2xl'
				/>

				<h1 className='font-bold sm:text-5xl text-4xl text-white text-center mt-1.5'>Evenimente</h1>
				<p className='text-white text-center font-light sm:text-[1.25rem] text-base mt-1 max-w-40 w-full'>
					Află despre evenimentele și activitățile care au loc în campusul nostru, de la conferințe și workshop-uri la festivaluri și întâlniri sociale.
				</p>
			</div>
		</Hero>
	)
}
