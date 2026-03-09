import Link from 'next/link'

import { contactInfo, quickLinks, resources } from '@/constants/footer.constants'

import { Logo } from './Logo'

export function Footer() {
	return (
		<div className='mt-8 pt-4 px-section-x bg-dim-white border-t border-gray-300/50'>
			<div className='w-full flex gap-3 lg:flex-row flex-col'>
				<div className='max-w-13 w-full'>
					<Logo />
					<p className='text-sm text-light-text font-normal mt-1'>
						Platforma ta centralizată pentru tot ce ține de campus.
					</p>
				</div>

				<div className='flex-1 flex lg:justify-end justify-start sm:gap-5 gap-2 sm:flex-row flex-col'>
					<div>
						<h4 className='text-[1.125rem] font-semibold text-dark-text'>Link-uri rapide</h4>
						<div className='mt-1 flex flex-col gap-0.75 text-sm text-light-text font-normal'>
							{quickLinks.map((link, index) => (
								<Link
									className='hover:opacity-60 transition-opacity duration-300'
									key={`footer-link-${index}`}
									href={link.link}
								>
									{link.name}
								</Link>
							))}
						</div>
					</div>

					<div>
						<h4 className='text-[1.125rem] font-semibold text-dark-text'>Resurse</h4>
						<div className='mt-1 flex flex-col gap-0.75 text-sm text-light-text font-normal'>
							{resources.map((link, index) => (
								<p
									className='cursor-pointer hover:opacity-60 transition-opacity duration-300'
									key={`footer-res-${index}`}
								>
									{link}
								</p>
							))}
						</div>
					</div>

					<div>
						<h4 className='text-[1.125rem] font-semibold text-dark-text'>Contact</h4>
						<div className='mt-1 flex flex-col gap-0.75 text-sm text-light-text font-normal'>
							{contactInfo.map((el, index) => (
								<div
									key={`contact-${index}`}
									className='flex gap-0.5 items-center'
								>
									<el.icon className='size-1' />
									<p className='cursor-pointer hover:opacity-60 transition-opacity duration-300'>
										{el.text}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className='mt-3 pt-2 pb-4 border-t border-gray-300/50 text-center text-sm text-light-text'>
				<p className='text-center'>© 2026 Campus Info Hub. Toate drepturile rezervate.</p>
			</div>
		</div>
	)
}
