import { PRICE_RANGES, type PriceRange } from '@/types/priceRange.types';

type PriceRangeChipsProps = {
    selectedRange: PriceRange | null;
    onSelect: (range: PriceRange | null) => void;
};

export function PriceRangeChips({ selectedRange, onSelect }: PriceRangeChipsProps) {
    return (
        <div className="flex gap-2.5 px-5 pb-4 overflow-x-auto">
            <button
                onClick={() => onSelect(null)}
                className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${selectedRange === null ? 'bg-sky-light text-white' : 'bg-neutral-100 text-navy'
                    }`}
            >
                Cualquier precio
            </button>
            {PRICE_RANGES.map((range) => (
                <button
                    key={range.label}
                    onClick={() => onSelect(range)}
                    className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${selectedRange?.label === range.label ? 'bg-sky-light text-white' : 'bg-neutral-100 text-navy'
                        }`}
                >
                    {range.label}
                </button>
            ))}
        </div>
    );
}