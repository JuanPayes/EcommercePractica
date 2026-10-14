import type { CategoryResponse } from '@/types/category.types';

type CategoryChipsProps = {
    categories: CategoryResponse[];
    selectedId: number | null;
    onSelect: (id: number | null) => void;
};

export function CategoryChips({ categories, selectedId, onSelect }: CategoryChipsProps) {
    return (
        <div className="flex gap-2.5 px-5 pb-4 overflow-x-auto">
            <button
                onClick={() => onSelect(null)}
                className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${selectedId === null ? 'bg-navy text-white' : 'bg-neutral-100 text-navy'
                    }`}
            >
                Todo
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${selectedId === cat.id ? 'bg-navy text-white' : 'bg-neutral-100 text-navy'
                        }`}
                >
                    {cat.nombre}
                </button>
            ))}
        </div>
    );
}