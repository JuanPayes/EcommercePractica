import { Icon } from '@/components/common/Icon';

type RatingStarsProps = {
    rating: number;
    size?: 'sm' | 'md';
};

export function RatingStars({ rating, size = 'md' }: RatingStarsProps) {
    const filled = Math.round(rating);
    const sizeClass = size === 'sm' ? 'text-sm' : 'text-base';

    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Icon
                    key={i}
                    name="star"
                    filled={i <= filled}
                    className={`${sizeClass} ${i <= filled ? 'text-amber' : 'text-navy/20'}`}
                />
            ))}
        </div>
    );
}