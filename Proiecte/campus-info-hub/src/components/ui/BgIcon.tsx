import { LucideIcon } from 'lucide-react'

interface IBgIconProps {
	icon: LucideIcon
	iconColor: 'dark-blue' | 'light-blue' | 'white'
	bgColor: 'dark-blue' | 'light-blue' | 'white'
	bgOpacity?: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100
	iconSize: 1.25 | 1.5 | 2 | 2.5
	className?: string
}

const TEXT_CLASS: Record<IBgIconProps['iconColor'], string> = {
	'dark-blue': 'text-dark-blue',
	'light-blue': 'text-light-blue',
	white: 'text-white'
}

const BG_WITH_OPACITY: Record<
	IBgIconProps['bgColor'],
	Record<NonNullable<IBgIconProps['bgOpacity']>, string>
> = {
	'dark-blue': {
		10: 'bg-dark-blue/10',
		20: 'bg-dark-blue/20',
		30: 'bg-dark-blue/30',
		40: 'bg-dark-blue/40',
		50: 'bg-dark-blue/50',
		60: 'bg-dark-blue/60',
		70: 'bg-dark-blue/70',
		80: 'bg-dark-blue/80',
		90: 'bg-dark-blue/90',
		100: 'bg-dark-blue/100'
	},
	'light-blue': {
		10: 'bg-light-blue/10',
		20: 'bg-light-blue/20',
		30: 'bg-light-blue/30',
		40: 'bg-light-blue/40',
		50: 'bg-light-blue/50',
		60: 'bg-light-blue/60',
		70: 'bg-light-blue/70',
		80: 'bg-light-blue/80',
		90: 'bg-light-blue/90',
		100: 'bg-light-blue/100'
	},
	white: {
		10: 'bg-white/10',
		20: 'bg-white/20',
		30: 'bg-white/30',
		40: 'bg-white/40',
		50: 'bg-white/50',
		60: 'bg-white/60',
		70: 'bg-white/70',
		80: 'bg-white/80',
		90: 'bg-white/90',
		100: 'bg-white/100'
	}
}

const SIZE_CLASS: Record<IBgIconProps['iconSize'], string> = {
	1.25: 'size-1.25',
	1.5: 'size-1.5',
	2: 'size-2',
	2.5: 'size-2.5'
}

export function BgIcon({
	icon: Icon,
	iconColor,
	bgColor,
	bgOpacity = 100,
	iconSize = 1.5,
	className = ''
}: IBgIconProps) {
	const bgClass = BG_WITH_OPACITY[bgColor][bgOpacity]

	return (
		<div className={`w-fit h-fit ${bgClass} ${className}`}>
			<Icon className={`${TEXT_CLASS[iconColor]} ${SIZE_CLASS[iconSize]}`} />
		</div>
	)
}
