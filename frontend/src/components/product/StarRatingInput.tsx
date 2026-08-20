import { useState } from 'react';
import { Icon } from '@/components/common/Icon';

type StarRatingInputProps = {
    value: number;
    onChange: (value: number) => void;
};

export function StarRatingInput({ value, onChange }: StarRatingInputProps) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={`${star} estrellas`}
                >
                    <Icon
                        name="star"
                        filled={star <= (hovered ?? value)}
                        className={`text-3xl ${star <= (hovered ?? value) ? 'text-amber' : 'text-navy/20'}`}
                    />
                </button>
            ))}
        </div>
    );
}