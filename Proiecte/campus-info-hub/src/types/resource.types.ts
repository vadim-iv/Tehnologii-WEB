export interface IResource {
	id: number
	name: string
	type: 'event' | 'study' | 'food' | string
	main: boolean
	location: string
	program: string
	date: string
	description: string
	features: string[]
	tags: string[]
	image: string
}
