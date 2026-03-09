interface IHourText { 
    title: string;
    hours: string;
}

export function HourText({ title, hours }: IHourText) {
    return (
        <div className="py-0.75 flex justify-between items-center border-b border-gray-100 last:border-0">
            <p className='font-semibold text-base text-dark-text'>{title}</p>
            <p className='font-normal text-base text-light-text'>{hours}</p>
        </div>
    );
}
