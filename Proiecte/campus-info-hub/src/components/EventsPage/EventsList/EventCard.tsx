import { Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/Button'

import { IResource } from '@/types/resource.types'

export function EventCard({ resource }: { resource: IResource }) {
	const getDayAndMonthFromDate = (dateString: string) => {
		const date = new Date(dateString)
		const day = date.getDate()
		const month = date.toLocaleString('ro-RO', { month: 'short' }).replace('.', '')
		return { day, month }
	}

	return (
		<div className='rounded-2xl border border-gray-300/50 overflow-hidden h-full bg-white flex flex-col'>
			<div className='h-15 relative'>
                <Image
                    src={resource.image}
                    alt={resource.name}
                    width={600}
                    height={300}
                    className='object-cover w-full h-full'
                />
                <div className='absolute top-1 left-1 bg-white p-0.75 rounded-lg flex flex-col items-center justify-center size-4'>
                    <p className='text-xs font-bold uppercase text-dark-blue'>{getDayAndMonthFromDate(resource.date).month}</p>
                    <p className='text-2xl font-bold text-dark-text'>{getDayAndMonthFromDate(resource.date).day}</p>
                </div>
            </div>

			<div className='p-1.5 flex flex-col justify-between flex-1'>
				<div>
					<div className='flex gap-0.5 flex-wrap'>
						{resource.tags.map(tag => (
							<span
								key={tag}
								className='text-xs bg-dark-blue/10 text-dark-blue px-0.75 py-0.25 rounded-xl'
							>
								{tag}
							</span>
						))}
					</div>
					<h3 className='font-bold text-dark-text text-[1.125rem] mt-1'>{resource.name}</h3>
					<p className='font-normal text-light-text text-sm mt-0.5'>{resource.description}</p>
					<div className=' flex items-center gap-0.5 mt-0.5'>
						<Calendar className='text-gray-text size-1' />
						<p className='text-gray-text text-sm'>{resource.program}</p>
					</div>
					<div className=' flex items-center gap-0.5 mt-0.5'>
						<MapPin className='text-gray-text size-1' />
						<p className='text-gray-text text-sm'>{resource.location}</p>
					</div>
				</div>

				<Button
					variant='dark-blue'
					className='mt-1 w-full h-3 gap-0.5 rounded-xl group'
				>
					<span className='text-base font-medium'>Înregistrează-te acum</span>
				</Button>
			</div>
		</div>
	)
}
