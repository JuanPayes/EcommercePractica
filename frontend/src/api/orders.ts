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

export async function getOrderById(id: number): Promise<OrderResponse> {
    const response = await apiClient.get<GeneralResponse<OrderResponse>>(`/ordenes/${id}`);
    return response.data.data;
}

export async function cancelOrder(id: number): Promise<OrderResponse> {
    const response = await apiClient.patch<GeneralResponse<OrderResponse>>(`/ordenes/${id}/cancelar`);
    return response.data.data;
}