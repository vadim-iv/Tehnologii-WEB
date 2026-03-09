import { SwiperRef } from 'swiper/react'

interface ISwiperPaginationProps {
	totalPages: number
	slidesPerGroup: number
	activeIndex: number
	swiperRef: React.RefObject<SwiperRef | null>
}

export function SwiperPagination({
	totalPages,
	slidesPerGroup,
	activeIndex,
	swiperRef
}: ISwiperPaginationProps) {
	return (
		<>
			{Array.from({ length: totalPages }).map((_, index) => (
				<button
					key={index}
					onClick={() => swiperRef.current?.swiper.slideTo(index * slidesPerGroup)}
					className={`
						w-1 h-1 rounded-full transition-[colors_transform] duration-300 cursor-pointer
						${activeIndex === index ? 'bg-dark-blue text-white w-1.5' : 'bg-gray-200 hover:bg-gray-300'}
						`}
				/>
			))}
		</>
	)
}
