import { Icon } from '@/components/common/Icon';

type ProductImageHeroProps = {
    onBack: () => void;
};

export function ProductImageHero({ onBack }: ProductImageHeroProps) {
    return (
        <div className="relative h-72 bg-sky-light overflow-hidden">
            <div className="absolute inset-0 bg-navy [clip-path:polygon(62%_0,100%_0,100%_100%,38%_100%)]" />

            <button
                onClick={onBack}
                aria-label="Volver"
                className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
            >
                <Icon name="arrow_back" className="text-navy text-xl" />
            </button>

            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-amber-50 text-xs font-mono">foto principal producto</span>
            </div>
        </div>
    );
}