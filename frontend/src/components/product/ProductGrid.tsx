import type { ProductResponse } from '@/types/product.types';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
    products: ProductResponse[];
};

export function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return <p className="text-center text-navy/50 text-sm py-8">No hay productos disponibles</p>;
    }

    return (
        <div className="px-5 grid grid-cols-2 gap-3.5">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}