import Link from 'next/link'

interface IButtonProps {
	variant: 'dark-blue' | 'white' | 'transparent'
	link?: string
	onClick?: () => void
	className?: string
	children?: React.ReactNode
}

const VARIANT_CLASS: Record<IButtonProps['variant'], string> = {
	'dark-blue': 'bg-dark-blue text-white hover:bg-dark-blue/90',
	white: 'bg-white text-dark-blue hover:bg-white/90',
	transparent:
		'bg-transparent text-white border border-white hover:border-white/60 hover:text-white/80'
}

export function Button(props: IButtonProps) {
	return (
		<>
			{props.link ? (
				<Link href={props.link} target="_blank">
					<button
						className={`${props.className || ''} ${VARIANT_CLASS[props.variant]} transition-colors duration-300 cursor-pointer flex items-center justify-center`}
						onClick={props.onClick}
					>
						{props.children}
					</button>
				</Link>
			) : (
				<button
					className={`${props.className || ''} ${VARIANT_CLASS[props.variant]} transition-colors duration-300 cursor-pointer flex items-center justify-center`}
					onClick={props.onClick}
				>
					{props.children}
				</button>
			)}
		</>
	)
}
