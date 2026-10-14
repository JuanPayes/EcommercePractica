export interface PriceRange {
    label: string;
    min?: number;
    max?: number;
}

export const PRICE_RANGES: PriceRange[] = [
    { label: '$0 - $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200+', min: 200 },
];