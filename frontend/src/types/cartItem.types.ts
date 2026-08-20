import type { ProductResponse } from './product.types';

export interface CartItem {
    product: ProductResponse;
    cantidad: number;
}