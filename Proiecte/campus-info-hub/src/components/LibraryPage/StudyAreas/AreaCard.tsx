import { BgIcon } from "@/components/ui/BgIcon";
import { LucideIcon } from "lucide-react";

interface IAreaProps { 
    icon: LucideIcon
    title: string
    description: string
}

export function AreaCard({  icon, title, description}: IAreaProps) {
    return <div className="p-2 border-gray-300/20 border shadow-xl rounded-2xl bg-white">
        <BgIcon 
            icon={icon}
            iconSize={2}
            iconColor='dark-blue'
            bgColor="dark-blue"
            bgOpacity={10}
            className="rounded-2xl p-1"
        />
        <h3 className="text-dark-text font-semibold text-2xl mt-1.5">{title}</h3>
        <p className="text-light-text font-normal text-base mt-1">
            {description}
        </p>
    </div>
}
