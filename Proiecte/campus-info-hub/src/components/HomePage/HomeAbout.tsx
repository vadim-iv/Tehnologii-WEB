import { BookOpen, Calendar, Utensils } from 'lucide-react'
import Image from 'next/image'

import { BgIcon } from '../ui/BgIcon'

export function HomeAbout() {
	return (
		<div className='px-section-x mt-6 flex sm:gap-4 gap-2 items-stretch sm:flex-row flex-col-reverse'>
			<div className='flex-1 py-1'>
				<h2 className='text-dark-text font-bold text-3xl'>Bun venit la Campus Info Hub</h2>
				<p className='text-light-text font-normal text-base mt-2'>
					Suntem platforma ta centralizată, creată pentru a face viața din campus mai ușoară și mai
					conectată. Fie că ești în căutarea unui spațiu liniștit de studiu, îți planifici mesele
					sau descoperi evenimentele care urmează, noi te ajutăm.
				</p>
				<p className='text-light-text font-normal text-base mt-1.5'>
					Misiunea noastră este să îți îmbunătățim experiența universitară, oferindu-ți acces
					instant la toate resursele și informațiile de care ai nevoie pentru a reuși atât academic,
					cât și social.
				</p>
				<div className='mt-2 flex justify-around'>
					<div className='flex flex-col items-center'>
						<BgIcon
							icon={BookOpen}
							bgColor='dark-blue'
							bgOpacity={10}
							iconColor='dark-blue'
							iconSize={2}
							className='p-1 rounded-2xl'
						/>
						<p className='text-dark-text font-semibold text-base mt-0.75'>Bibliotecă</p>
					</div>
					<div className='flex flex-col items-center'>
						<BgIcon
							icon={Utensils}
							bgColor='dark-blue'
							bgOpacity={10}
							iconColor='dark-blue'
							iconSize={2}
							className='p-1 rounded-2xl'
						/>
						<p className='text-dark-text font-semibold text-base mt-0.75'>Cantină</p>
					</div>
					<div className='flex flex-col items-center'>
						<BgIcon
							icon={Calendar}
							bgColor='dark-blue'
							bgOpacity={10}
							iconColor='dark-blue'
							iconSize={2}
							className='p-1 rounded-2xl'
						/>
						<p className='text-dark-text font-semibold text-base mt-0.75'>Evenimente</p>
					</div>
				</div>
			</div>

			<div className='sm:flex-1 flex-[16rem] relative'>
				<Image
					src='/home-about.jpg'
					alt='Despre noi'
					fill
					className='rounded-2xl object-cover w-full h-full'
				/>
			</div>
		</div>
	)
}
