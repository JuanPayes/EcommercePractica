type IconProps = {
    name: string;
    className?: string;
    filled?: boolean;
    size?: number;
};

export function Icon({ name, className = '', filled = false, size = 24 }: IconProps) {
    const opticalSize = Math.min(48, Math.max(20, size));

    return (
        <span
            className={`material-symbols-outlined select-none ${className}`}
            style={{
                fontSize: size,
                fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'opsz' ${opticalSize}`,
            }}
        >
            {name}
        </span>
    );
}