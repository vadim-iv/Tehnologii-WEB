import Image from 'next/image'

interface IHeroProps {
	height: 'screen' | '75vh'
	imageUrl: string
	overlayOpacity: 90 | 80 | 70 | 60 | 50 | 40 | 30 | 20 | 10
	children?: React.ReactNode
}

const HEIGHT_CLASS: Record<IHeroProps['height'], string> = {
	screen: 'h-screen',
	'75vh': 'h-[75vh]'
}

const OPACITY_CLASS: Record<IHeroProps['overlayOpacity'], string> = {
	90: 'opacity-90',
	80: 'opacity-80',
	70: 'opacity-70',
	60: 'opacity-60',
	50: 'opacity-50',
	40: 'opacity-40',
	30: 'opacity-30',
	20: 'opacity-20',
	10: 'opacity-10'
}

export function Hero({ height, imageUrl, overlayOpacity, children }: IHeroProps) {
	return (
		<div className={`relative ${HEIGHT_CLASS[height]} w-full`}>
			<Image
				src={imageUrl}
				alt='Hero image'
				width={1920}
				height={1080}
				className='object-cover w-full h-full'
			/>
			<div className={`absolute z-10 inset-0 bg-dark-blue ${OPACITY_CLASS[overlayOpacity]}`} />
			<div className='absolute z-20 inset-0 flex items-center justify-center'>{children}</div>
		</div>
	)
}
