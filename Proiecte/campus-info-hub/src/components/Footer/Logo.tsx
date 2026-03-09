import { PAGES } from "@/config/pages.config";
import { GraduationCap } from "lucide-react";
import { BgIcon } from "../ui/BgIcon";
import Link from "next/link";

export function Logo() {
	return (
		<Link
			href={PAGES.HOME}
			className='flex items-center gap-0.5 select-none'
		>
			<BgIcon
				icon={GraduationCap}
				iconColor='white'
				bgColor='dark-blue'
				iconSize={1.25}
				className='p-0.5 rounded-[0.625rem]'
			/>
			<span className='text-[1.125rem] font-bold text-dark-text'>Campus Info Hub</span>
		</Link>
	)
}
