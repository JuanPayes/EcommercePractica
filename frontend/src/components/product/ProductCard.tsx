import { Link } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';
import type { ProductResponse } from '@/types/product.types';

type ProductCardProps = {
    product: ProductResponse;
};

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            to={`/productos/${product.id}`}
            className="bg-white border border-navy/10 rounded-xl overflow-hidden block"
        >
            <div className="h-28 bg-neutral-100 flex items-center justify-center">
                <Icon name="image" className="text-navy/25 text-3xl" />
            </div>
            <div className="p-2.5">
                <div className="text-[13px] text-navy font-semibold truncate">{product.nombre}</div>
                <div className="text-[13px] text-orange font-bold mt-1">
                    ${product.precio.toFixed(2)}
                </div>
            </div>
        </Link>
    );
}