import { apiClient } from './client';
import type { GeneralResponse } from '@/types/api.types';
import type { PaymentRequest } from '@/types/payment.types';
import type { PaymentResponse } from '@/types/order.types';

export async function payOrder(orderId: number, dto: PaymentRequest): Promise<PaymentResponse> {
    const response = await apiClient.post<GeneralResponse<PaymentResponse>>(
        `/pagos/orden/${orderId}`,
        dto,
    );
    return response.data.data;
}