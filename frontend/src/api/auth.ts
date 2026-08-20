import { apiClient } from './client';
import type { GeneralResponse } from '@/types/api.types';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth.types';

export async function login(dto: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<GeneralResponse<AuthResponse>>('/auth/login', dto);
    return response.data.data;
}

export async function register(dto: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<GeneralResponse<AuthResponse>>('/auth/register', dto);
    return response.data.data;
}