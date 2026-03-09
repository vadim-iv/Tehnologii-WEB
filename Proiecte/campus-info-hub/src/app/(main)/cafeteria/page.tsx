import { CafeteriaHero, CafeteriaHours, CafeteriaLocation, Menu } from '@/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Cantină',
	description:
		'Descoperă meniul zilnic, programul de funcționare și opțiunile delicioase ale cantinei noastre. Mâncare proaspătă și sănătoasă, pregătită cu grijă pentru a-ți oferi energia necesară pe parcursul zilei de studiu.'
}

export default function CafeteriaPage() {
	return <div>
        <CafeteriaHero />
		<Menu />
		<CafeteriaHours />
		<CafeteriaLocation />
    </div>
}
