import { Utensils } from 'lucide-react'

import { Hero } from '../Hero'
import { BgIcon } from '../ui/BgIcon'

export function CafeteriaHero() {
	return (
		<Hero
			height='75vh'
			overlayOpacity={80}
			imageUrl='/cafeteria-hero.jpg'
		>
			<div className='flex flex-col items-center mt-4.5 px-section-x'>
				<BgIcon
					icon={Utensils}
					iconColor='white'
					bgColor='white'
					bgOpacity={10}
					iconSize={2}
					className='p-1 rounded-2xl'
				/>

				<h1 className='font-bold sm:text-5xl text-4xl text-white text-center mt-1.5'>Cantină</h1>
				<p className='text-white text-center font-light sm:text-[1.25rem] text-base mt-1 max-w-40 w-full'>
					Descoperă meniul zilnic, programul de funcționare și opțiunile delicioase ale cantinei
					noastre.
				</p>
			</div>
		</Hero>
	)
}
