import { headers } from 'next/headers'

import { IResource } from '@/types/resource.types'
import { EventCard } from './EventCard'

export async function EventsList() {
	const headersList = await headers()
	const host = headersList.get('host')

	const protocol = host?.includes('localhost') ? 'http' : 'https'

	const data = await fetch(`${protocol}://${host}/data/resources.json`)
	const resources: IResource[] = await data.json()

	return (
		<div className='mt-4 px-section-x'>
			<h2 className='text-dark-text font-bold text-3xl'>Evenimente viitoare</h2>
			<p className='text-light-text font-normal text-base mt-1'>
				Descoperă evenimentele săptămânii și bucură-te de activități interesante, pregătite cu grijă
				pentru tine.
			</p>

            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 mt-3'>
                {
                    resources
                    .filter(resource => resource.type === 'event')
                    .map((resource, index) => (
                        <EventCard 
                            key={index + resource.name}
                            resource={resource}
                        />
                    ))
                }
            </div>
		</div>
	)
}
