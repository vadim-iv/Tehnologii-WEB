import { Logo } from './Logo'
import { MobileNavbar } from './MobileNavbar'
import { Navbar } from './Navbar'

export function Header() {
	return (
		<header className='flex items-center justify-between h-4.5 bg-white fixed top-0 left-0 right-0 z-50 px-section-x shadow-sm'>
			<div className='items-stretch flex justify-between w-full'>
				<Logo />
				<Navbar />
				<MobileNavbar />
			</div>
		</header>
	)
}
