import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import './globals.css'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '700']
})

export const metadata: Metadata = {
	title: {
		default: 'Campus Info Hub',
		template: '%s | Campus Info Hub'
	},
	description:
		'Accesează tot ce ai nevoie într-un singur loc - de la resursele bibliotecii la calendarele de evenimente și opțiunile de luat masa.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto.className} antialiased bg-white`}>{children}</body>
		</html>
	)
}
