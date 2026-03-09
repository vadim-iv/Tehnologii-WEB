import { BookOpen, ChevronDown } from 'lucide-react'
import { Hero } from '../Hero'
import { BgIcon } from '../ui/BgIcon'
import Link from 'next/link'
import { PAGES } from '@/config/pages.config'

export function LibraryHero() {
	return (
		<Hero
			height="75vh"
			overlayOpacity={80}
			imageUrl='/library-hero.jpg'
		>
			<div className='flex flex-col items-center mt-4.5 px-section-x'>
                <BgIcon 
                    icon={BookOpen}
                    iconColor="white"
                    bgColor="white"
                    bgOpacity={10}
                    iconSize={2}
                    className='p-1 rounded-2xl'
                />

                <h1 className='font-bold sm:text-5xl text-4xl text-white text-center mt-1.5'>Spații de Studiu</h1>
                <p className='text-white text-center font-light sm:text-[1.25rem] text-base mt-1 max-w-40 w-full'>Poarta ta către cunoaștere, cu peste 100.000 de cărți, resurse digitale și spații moderne de studiu.</p>

                <Link className='flex items-center gap-0.25 mt-1.5 transition-opacity duration-300 hover:opacity-70' href={`${PAGES.LIBRARY}#schedule`}>
                    <p className='text-base font-light text-white'>Vezi programul</p>
                    <ChevronDown className='text-white size-[1.125rem]'/>
                </Link>
            </div>
		</Hero>
	)
}
