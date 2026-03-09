import type { Metadata } from 'next'

import { HomeAbout, HomePageHero, HomeResources } from '@/components'

export const metadata: Metadata = {
	title: 'Acasă',
	description:
		'Bine ai venit la Campus Info Hub! Aici vei găsi toate informațiile de care ai nevoie despre campusul tău, de la resursele bibliotecii la calendarele de evenimente și opțiunile de luat masa.'
}

export default function HomePage() {
	return (
		<div>
			<HomePageHero />
			<HomeAbout />
			<HomeResources />
		</div>
	)
}
