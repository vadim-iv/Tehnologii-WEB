import Image from 'next/image'

import { IResource } from '@/types/resource.types'
import { Button } from '@/components/ui/Button'
import { ChevronRight } from 'lucide-react'

export function SlideCard({ resource }: { resource: IResource }) {
	return (
		<div className='rounded-2xl border border-gray-300/50 overflow-hidden h-full bg-white flex flex-col'>
			<Image
				src={resource.image}
				alt={resource.name}
				width={600}
				height={300}
				className='object-cover w-full h-10'
			/>

			<div className='p-1.5 flex flex-col justify-between flex-1'>
                <div>
                    <h3 className='font-bold text-dark-text text-[1.125rem] '>{resource.name}</h3>
                    <p className='font-normal text-light-text text-sm mt-0.5'>{resource.description}</p>
                    <div className='flex gap-0.5 mt-1 flex-wrap'>
                        {resource.tags.map(tag => (
                            <span
                                key={tag}
                                className='text-xs bg-dark-blue/10 text-dark-blue px-0.75 py-0.25 rounded-xl'
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <Button variant="dark-blue" className='mt-1 w-full h-3 gap-0.5 rounded-xl group'>
                        <span className='text-sm font-normal'>Află mai mult</span>
                        <ChevronRight className='size-1 group-hover:translate-x-0.25 transition-transform duration-300' />
                </Button>
			</div>
		</div>
	)
}
