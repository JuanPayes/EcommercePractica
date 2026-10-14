import type { ReactNode } from 'react';
import { Icon } from '@/components/common/Icon';

type CutColor = 'orange' | 'sky-light' | 'teal' | 'amber';

type HeaderProps = {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    cutColor?: CutColor;
    cutSide?: 'left' | 'right';
    compact?: boolean;
    rightSlot?: ReactNode;
};

const cutColorClass: Record<CutColor, string> = {
    orange: 'bg-orange',
    'sky-light': 'bg-sky-light',
    teal: 'bg-teal',
    amber: 'bg-amber',
};

export function Header({
    title,
    showBack = false,
    onBack,
    cutColor = 'orange',
    cutSide = 'right',
    compact = false,
    rightSlot,
}: HeaderProps) {
    const clipRight = '[clip-path:polygon(78%_0,100%_0,100%_100%,60%_100%)]';
    const clipLeft = '[clip-path:polygon(0_0,58%_0,42%_100%,0_100%)]';

    return (
        <header className={`relative w-full ${compact ? 'h-18' : 'h-24'} bg-navy overflow-hidden shrink-0`}>
            <div
                className={`absolute inset-0 ${cutColorClass[cutColor]} ${cutSide === 'right' ? clipRight : clipLeft
                    }`}
            />
            <div className="relative z-10 h-full flex items-center justify-between px-5">
                <div className="flex items-center gap-3">
                    {showBack && (
                        <button onClick={onBack} aria-label="Volver" className="text-white">
                            <Icon name="arrow_back" className="text-2xl" />
                        </button>
                    )}
                    {title && <span className="text-white font-bold text-lg">{title}</span>}
                </div>
                {rightSlot && <div className="flex items-center gap-4">{rightSlot}</div>}
            </div>
        </header>
    );
}