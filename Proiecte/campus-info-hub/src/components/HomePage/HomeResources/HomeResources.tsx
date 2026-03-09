import { IResource } from "@/types/resource.types";
import { headers } from "next/headers";
import { ResourcesSwiper } from "./ResourcesSwiper";

export async function HomeResources() {
    const headersList = await headers();
    const host = headersList.get("host");

    const protocol = host?.includes("localhost") ? "http" : "https";

    const data = await fetch(`${protocol}://${host}/data/resources.json`)
    const resources: IResource[] = await data.json();

	return (
		<div className='bg-dim-white mt-6 py-4 px-section-x'>
			<h2 className='text-dark-text font-bold text-3xl text-center'>Explorează Resursele Campusului</h2>
			<p className='text-light-text font-normal text-base mt-1 text-center'>
				Descoperă toate facilitățile și serviciile disponibile pentru a-ți susține parcursul
				academic și viața de campus.
			</p>

            <ResourcesSwiper resources={resources}/>
		</div>
	)
}
