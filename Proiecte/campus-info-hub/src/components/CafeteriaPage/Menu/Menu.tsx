import { menuItems } from '@/constants/menu.constants'

import { MenuCard } from './MenuCard'
import { Utensils } from 'lucide-react'

export function Menu() {
	return (
		<div className='mt-6 py-4 px-section-x'>
			<h2 className='text-dark-text font-bold text-3xl text-center'>Meniul săptămânii</h2>
			<p className='text-light-text font-normal text-base mt-1 text-center'>
				Descoperă meniul săptămânii și bucură-te de preparate delicioase și sănătoase, pregătite cu
				grijă pentru tine.
			</p>

			<div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-2 gap-1.5 mt-3'>
				{menuItems.map((item, index) => (
					<MenuCard
						key={index}
						dayIndex={index + 1}
						day={item.day}
						main={item.main}
						vegan={item.vegan}
						dessert={item.dessert}
					/>
				))}
				<div className='bg-dark-blue/80 p-1.5 rounded-2xl border border-gray-300/20 shadow-md'>
                    <Utensils className='size-2 text-white'/>
					<h3 className='text-white font-bold text-xl mt-1'>Specialitățile zilei</h3>
					<p className='text-white/90 font-normal text-base mt-0.5'>Întreabă la tejghea despre specialitatea chef-ului și preparatele sezoniere!</p>
				</div>
			</div>
		</div>
	)
}
