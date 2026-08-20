import { apiClient } from './client';
import type { GeneralResponse } from '@/types/api.types';
import type { OrderResponse } from '@/types/order.types';
import type { OrderCreateRequest } from '@/types/order.types';

export async function getMyOrders(): Promise<OrderResponse[]> {
    const response = await apiClient.get<GeneralResponse<OrderResponse[]>>('/ordenes/mis-ordenes');
    return response.data.data;
}

export async function createOrder(dto: OrderCreateRequest): Promise<OrderResponse> {
    const response = await apiClient.post<GeneralResponse<OrderResponse>>('/ordenes', dto);
    return response.data.data;
}