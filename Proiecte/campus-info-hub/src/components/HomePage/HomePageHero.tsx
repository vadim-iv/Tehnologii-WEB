import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import { Hero } from '../Hero'

export function HomePageHero() {
	return (
		<Hero
			height='screen'
			overlayOpacity={80}
			imageUrl='/home-hero.jpg'
		>
			<div className='flex items-center flex-col max-w-3xl pt-4.5 px-section-x'>
				<h1 className='font-bold text-white sm:text-5xl text-4xl text-center'>Viața ta de student, organizată.</h1>
				<p className='mt-1.5 font-normal text-white/90 sm:text-lg text-base text-center'>
					Accesează tot ce ai nevoie într-un singur loc - de la resursele bibliotecii până la
					calendarele de evenimente și opțiunile de luat masa.
				</p>

				<div className='flex sm:items-center gap-1 mt-2 sm:flex-row flex-col items-stretch'>
					<Button
						variant='white'
						className='h-3.5 px-2 rounded-2xl gap-0.25 group'
					>
						<span className='text-base font-semibold '>Explorează resursele</span>
						<ArrowRight className='size-1.25 group-hover:translate-x-0.25 transition-transform duration-300' />
					</Button>

					<Button
						variant='transparent'
						className='h-3.5 px-2 rounded-2xl'
					>
						<span className='text-base font-semibold'>Află mai mult</span>
					</Button>
				</div>
			</div>
		</Hero>
	)
}
