import { ExternalLink, MapPin } from 'lucide-react'

import { BgIcon } from '../ui/BgIcon'
import { Button } from '../ui/Button'

export function CafeteriaLocation() {
	return (
		<div className='mx-section-x mt-8 scroll-mt-8 p-2.5 shadow-md rounded-2xl border border-gray-300/20'>
			<div className='flex items-center gap-0.75'>
				<BgIcon
					icon={MapPin}
					iconSize={1.5}
					iconColor='dark-blue'
					bgColor='dark-blue'
					bgOpacity={10}
					className='p-0.75 rounded-xl'
				/>
				<h2 className='text-3xl font-bold text-dark-text'>Locație</h2>
			</div>

			<div className='flex sm:gap-2 gap-4 mt-1.5 sm:flex-row flex-col'>
				<div className='flex-1'>
					<p className='text-light-text font-semibold text-base'>Cantina Principală</p>
					<p className='text-light-text font-normal text-base'>Centrul Studențesc, Parter</p>
					<p className='text-light-text font-normal text-base'>Str. Universității, nr. 1</p>
					<p className='text-light-text font-normal text-base'>București</p>
					<p className='text-light-text font-normal text-base mt-1'>
						Ușor accesibilă din toate clădirile principale ale campusului, cu acces pentru scaune cu
						rotile și locuri de stat în aer liber disponibile.
					</p>

                    <Button
                        link='https://www.google.com/maps/place/Str.+Universit%C4%83%C8%9Bii,+Bucure%C8%99ti,+Roemeni%C3%AB/@44.4353669,26.0444741,17z/data=!3m1!4b1!4m6!3m5!1s0x40b201c4286f4ccd:0xd167c96573f79c57!8m2!3d44.4353631!4d26.047049!16s%2Fg%2F11qyvgswn0?hl=nl&entry=ttu&g_ep=EgoyMDI2MDMwNS4wIKXMDSoASAFQAw%3D%3D'
                        variant="dark-blue"
                        className='sm:mt-4 mt-2 h-3 px-1.5 rounded-2xl gap-0.25'
                    >
                        <p>Deschide în Google Maps</p>
                        <ExternalLink className='size-1' />
                    </Button>
				</div>

				<div className='flex-1 rounded-lg overflow-hidden'>
					<iframe
                        className='w-full h-full'
						src='https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=Strada%20Universit%C4%83%C8%9Bii%2C%20Bucure%C8%99ti%2C%20Romania&maptype=roadmap'
					/>
				</div>
			</div>
		</div>
	)
}
