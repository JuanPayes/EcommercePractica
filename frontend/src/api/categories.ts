import { apiClient } from './client';
import type { CategoryResponse } from '@/types/category.types';
import type { GeneralResponse } from '@/types/api.types';



export async function getCategories(): Promise<CategoryResponse[]> {
    const response = await apiClient.get<GeneralResponse<CategoryResponse[]>>('/categorias');
    return response.data.data;
}