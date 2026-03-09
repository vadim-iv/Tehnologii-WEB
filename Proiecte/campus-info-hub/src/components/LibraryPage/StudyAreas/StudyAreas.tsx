import { Coffee, Users, Volume2 } from 'lucide-react'
import Image from 'next/image'

import { AreaCard } from './AreaCard'

export function StudyAreas() {
	return (
		<div className='bg-dim-white mt-6 py-4 px-section-x'>
			<h2 className='text-dark-text font-bold text-3xl text-center'>Spații de studiu</h2>
			<p className='text-light-text font-normal text-base mt-1 text-center'>
				Descoperă sălile de lectură, studiourile de grup și facilitățile moderne pentru un studiu
				eficient.
			</p>

			<div className='grid md:grid-cols-3 grid-cols-1 gap-2 mt-3'>
				<AreaCard
					icon={Volume2}
					title='Zone de studiu în liniște'
					description='Un loc ideal pentru a te concentra și a te odihni într-un mediu liniștit.'
				/>
				<AreaCard
					icon={Users}
					title='Săli de studiu în grup'
					description='Perfect pentru proiecte de grup, discuții și colaborare cu colegii.'
				/>
				<AreaCard
					icon={Coffee}
					title='Lounge pentru lectură relaxată'
					description='Un spațiu confortabil pentru a te bucura de lectură și a te relaxa între sesiuni de studiu.'
				/>
			</div>

			<div className='flex gap-2 mt-3 sm:flex-row flex-col'>
				<div className='flex-1 h-18 rounded-2xl overflow-hidden'>
					<Image
						src='/study-area1.jpg'
						alt='Study Area 1'
						width={600}
						height={450}
						className='w-full h-full object-cover'
					/>
				</div>
				<div className='flex-1 h-18 rounded-2xl overflow-hidden'>
					<Image
						src='/study-area2.jpg'
						alt='Study Area 2'
						width={600}
						height={450}
						className='w-full h-full object-cover'
					/>
				</div>
			</div>
		</div>
	)
}
