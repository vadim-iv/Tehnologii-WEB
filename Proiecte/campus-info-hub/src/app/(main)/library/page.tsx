import type { Metadata } from 'next'

import { LibraryHero, OpeningHours, StudyAreas } from '@/components'

export const metadata: Metadata = {
	title: 'Bibliotecă',
	description: 'Descoperă biblioteci și săli de lectură pentru studiu eficient.'
}

export default function Page() {
	return (
		<div>
			<LibraryHero />
			<OpeningHours />
			<StudyAreas />
		</div>
	)
}
