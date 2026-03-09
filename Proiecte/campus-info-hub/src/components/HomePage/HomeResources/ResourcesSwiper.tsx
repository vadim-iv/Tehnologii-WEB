'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import { IResource } from '@/types/resource.types'

import { CategoryBtn } from './CategoryBtn'
import { SlideCard } from './SlideCard'
import { SwiperPagination } from './SwiperPagination'

interface IResourceSwiperProps {
	resources: IResource[]
}

type category = 'Toate' | 'Studiu' | 'Evenimente' | 'Masă'

const categoryToType: Record<category, string | null> = {
	Toate: null,
	Studiu: 'study',
	Evenimente: 'event',
	Masă: 'food'
}

export function ResourcesSwiper({ resources }: IResourceSwiperProps) {
	const swiperRef = useRef<SwiperRef>(null)

	const [activeCategory, setActiveCategory] = useState<category>('Toate')
	const [snapCount, setSnapCount] = useState(0)
	const [activeSnap, setActiveSnap] = useState(0)
	const [slidesPerGroup, setSlidesPerGroup] = useState(0)

	console.log(snapCount, activeSnap, slidesPerGroup);
	



	const [isBeginning, setIsBeginning] = useState(true)
	const [isEnd, setIsEnd] = useState(false)

	const mappedType = categoryToType[activeCategory]
	const displayedResources = mappedType ? resources.filter(r => r.type === mappedType) : resources

	return (
		<div className='mt-3 w-full'>
			<div className='flex items-center gap-1 justify-center sm:flex-row flex-col'>
				<CategoryBtn
					onClick={() => setActiveCategory('Toate')}
					label='Toate'
					isActive={activeCategory === 'Toate'}
				/>
				<CategoryBtn
					onClick={() => setActiveCategory('Studiu')}
					label='Studiu'
					isActive={activeCategory === 'Studiu'}
				/>
				<CategoryBtn
					onClick={() => setActiveCategory('Masă')}
					label='Masă'
					isActive={activeCategory === 'Masă'}
				/>
				<CategoryBtn
					onClick={() => setActiveCategory('Evenimente')}
					label='Evenimente'
					isActive={activeCategory === 'Evenimente'}
				/>
			</div>

			<div className='flex w-full gap-3 items-center'>
				<button
					className={`${isBeginning && 'opacity-50'} lg:block hidden cursor-pointer hover:opacity-70 transition-opacity duration-300`}
					onClick={() => swiperRef.current?.swiper.slidePrev()}
				>
					<ChevronLeft className='size-2 text-dark-blue' />
				</button>
				<Swiper
					autoplay={{
						delay: 7000
					}}
					speed={700}
					key={activeCategory}
					ref={swiperRef}
					modules={[A11y, Autoplay]}
					spaceBetween={32}
					slidesPerView={4}
					slidesPerGroup={4}
					breakpoints={{
						320: { slidesPerView: 1, slidesPerGroup: 1 },
						580: { slidesPerView: 2, slidesPerGroup: 2 },
						768: { slidesPerView: 3, slidesPerGroup: 3 },
						1280: { slidesPerView: 4, slidesPerGroup: 4 }
					}}
					onSlideChange={swiper => {
						setIsBeginning(swiper.isBeginning)
						setIsEnd(swiper.isEnd)
						setActiveSnap(swiper.snapIndex)
						setSlidesPerGroup(swiper.params.slidesPerGroup as number)
					}}
					onAfterInit={swiper => {
						setIsBeginning(swiper.isBeginning)
						setIsEnd(swiper.isEnd)
						setSnapCount(swiper.snapGrid.length)
						setActiveSnap(swiper.snapIndex)
						setSlidesPerGroup(swiper.params.slidesPerGroup as number)
					}}
					onBreakpoint={swiper => {
						swiper.update()
						setIsBeginning(swiper.isBeginning)
						setIsEnd(swiper.isEnd)
						setSnapCount(swiper.snapGrid.length)
						setActiveSnap(swiper.snapIndex)
						setSlidesPerGroup(swiper.params.slidesPerGroup as number)
					}}
					className='mt-3'
				>
					{displayedResources.map(resource => (
						<SwiperSlide
							key={resource.id}
							className='h-auto!'
						>
							<SlideCard resource={resource} />
						</SwiperSlide>
					))}
				</Swiper>
				<button
					className={`${isEnd && 'opacity-50'} lg:block hidden cursor-pointer hover:opacity-70 transition-opacity duration-300`}
					onClick={() => swiperRef.current?.swiper.slideNext()}
				>
					<ChevronRight className='size-2 text-dark-blue' />
				</button>
			</div>
			<div className='sm:flex gap-0.5 justify-center items-center mt-2 hidden'>
				<SwiperPagination
					totalPages={snapCount}
					slidesPerGroup={slidesPerGroup}
					activeIndex={activeSnap}
					swiperRef={swiperRef}
				/>
			</div>
		</div>
	)
}
