import { Icon } from './Icon';

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder = 'Buscar productos…' }: SearchBarProps) {
    return (
        <div className="flex items-center gap-2 h-11 bg-sky-light/20 border border-sky-light rounded-lg px-3.5">
            <Icon name="search" className="text-navy/60 text-xl" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none text-sm text-navy placeholder:text-navy/50"
            />
        </div>
    );
}