import { EventsHero, WhyParticipate } from '@/components'
import { EventsList } from '@/components/EventsPage/EventsList/EventsList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Evenimente',
  description: 'Află despre evenimentele și activitățile care au loc în campusul nostru, de la conferințe și workshop-uri la festivaluri și întâlniri sociale. Rămâi conectat și implicat în viața vibrantă a comunității noastre universitare.',
}

export default function Page() {
  return <div>
    <EventsHero />
    <EventsList />
    <WhyParticipate />
  </div>
}
