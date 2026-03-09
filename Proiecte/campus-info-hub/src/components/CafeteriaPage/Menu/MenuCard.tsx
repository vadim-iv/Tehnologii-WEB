interface IMenuCardProps {
    dayIndex: number;
    day: string;
    main: string;
    vegan: string;
    dessert: string;
}

export function MenuCard({ dayIndex, day, main, vegan, dessert }: IMenuCardProps) {
    return (
        <div className=" p-1.5 rounded-2xl border border-gray-300/20 shadow-md">
            <div className="flex items-center justify-between">
                <h3 className="text-dark-text font-bold text-xl">{day}</h3>
                <span className="px-0.75 h-2 flex items-center bg-dark-blue/10 rounded-xl font-semibold text-dark-blue w-fit">Ziua {dayIndex}</span>
            </div>
            <p className="text-gray-text font-semibold text-xs uppercase mt-1">Fel principal</p>
            <p className="text-dark-text font-normal text-base">{main}</p>
            <p className="text-gray-text font-semibold text-xs uppercase mt-1">Fel vegan</p>
            <p className="text-dark-text font-normal text-base">{vegan}</p>
            <p className="text-gray-text font-semibold text-xs uppercase mt-1">Desert</p>
            <p className="text-dark-text font-normal text-base">{dessert}</p>
        </div>
    )
}
