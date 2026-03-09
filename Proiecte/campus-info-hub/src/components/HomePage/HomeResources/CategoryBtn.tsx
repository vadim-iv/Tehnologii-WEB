
const inactiveClass = "bg-white rounded-xl px-1.5 text-base font-semibold text-light-text hover:bg-light-text/10 cursor-pointer";
const activeClass = "bg-dark-blue rounded-xl px-1.5 text-base font-semibold text-white hover:bg-dark-blue/80 cursor-default";

export function CategoryBtn({ label, isActive, onClick }: { label: string, isActive: boolean, onClick?: () => void }) {
    return <button disabled={isActive} onClick={onClick} className={`h-3 flex items-center sm:w-fit w-full justify-center transition-colors duration-300 shadow-2xs ${isActive ? activeClass : inactiveClass}`}>
        {label}
    </button>
}
