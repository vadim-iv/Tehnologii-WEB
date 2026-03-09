import { Clock, Wifi } from 'lucide-react'

import { BgIcon } from '@/components/ui/BgIcon'

import { HourText } from '../ui/HourText'

export function OpeningHours() {
	return (
		<div
			id='schedule'
			className='mx-section-x mt-4 scroll-mt-8 p-2.5 shadow-xl rounded-2xl border border-gray-300/20'
		>
			<div className='flex items-center gap-0.75'>
				<BgIcon
					icon={Clock}
					iconSize={1.5}
					iconColor='dark-blue'
					bgColor='dark-blue'
					bgOpacity={10}
					className='p-0.75 rounded-xl'
				/>
				<h2 className='text-3xl font-bold text-dark-text'>Ore de funcționare</h2>
			</div>

			<div className='mt-2 flex gap-1.5 sm:flex-row flex-col'>
				<div className='flex-1'>
					<HourText
						title='Luni - Joi'
						hours='08:00 - 20:00'
					/>
					<HourText
						title='Vineri'
						hours='08:00 - 18:00'
					/>
					<HourText
						title='Sâmbătă'
						hours='10:00 - 16:00'
					/>
					<HourText
						title='Duminică'
						hours='Închis'
					/>
				</div>

				<div className='flex-1 bg-dark-blue/5 p-1.5 grid place-content-center rounded-lg'>
					<p className='font-normal text-base text-light-text'>
						Program extins în perioadele de examene. Consultă calendarul pentru zilele de închidere
						din timpul sărbătorilor și pentru programul special.
					</p>
					<div className='flex gap-0.5 items-center mt-1'>
						<Wifi className='text-dark-blue size-1.25 min-w-1.25' />
						<p className='font-medium text-base text-dark-blue'>
							Conectare Wi-Fi disponibilă în toate spațiile de lectură.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
