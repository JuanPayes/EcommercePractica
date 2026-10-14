import { apiClient } from './client';
import type { GeneralResponse } from '@/types/api.types';
import type { AddressResponse, AddressRequest } from '@/types/address.types';

export async function getMyAddresses(): Promise<AddressResponse[]> {
    const response = await apiClient.get<GeneralResponse<AddressResponse[]>>('/direcciones/mis-direcciones');
    return response.data.data;
}

export async function createAddress(dto: AddressRequest): Promise<AddressResponse> {
    const response = await apiClient.post<GeneralResponse<AddressResponse>>('/direcciones', dto);
    return response.data.data;
}