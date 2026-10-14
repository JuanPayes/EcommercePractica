import type { ProductResponse } from './product.types';
import type { AddressResponse } from './address.types';

export interface OrderItemResponse {
    id: number;
    producto: ProductResponse;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}

export interface PaymentResponse {
    id: number;
    monto: number;
    metodo: string;
    estado: string;
    fecha: string;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';


export interface OrderResponse {
    id: number;
    estado: OrderStatus;
    total: number;
    fecha: string;
    direccionEnvio: AddressResponse;
    items: OrderItemResponse[];
    payment: PaymentResponse | null;
}

export interface OrderItemRequest {
    productoId: number;
    cantidad: number;
}

export interface OrderCreateRequest {
    direccionId: number;
    items: OrderItemRequest[];
}