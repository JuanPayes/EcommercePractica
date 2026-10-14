import { apiClient } from './client';
import type { ProductResponse } from '@/types/product.types';
import type { PageResponse } from '@/types/pagination.types';
import type { GeneralResponse } from '@/types/api.types';


export async function getProducts(
    page = 0,
    size = 12,
    categoriaId?: number,
    precioMin?: number,
    precioMax?: number,
): Promise<PageResponse<ProductResponse>> {
    const response = await apiClient.get<GeneralResponse<PageResponse<ProductResponse>>>('/productos', {
        params: { page, size, categoriaId, precioMin, precioMax },
    });
    return response.data.data;
}

export async function searchProducts(nombre: string): Promise<ProductResponse[]> {
    const response = await apiClient.get<GeneralResponse<ProductResponse[]>>('/productos/buscar', {
        params: { nombre },
    });
    return response.data.data;
}

export async function getFeaturedProducts(limit = 10): Promise<ProductResponse[]> {
    const response = await apiClient.get<GeneralResponse<ProductResponse[]>>('/productos/mejor-calificados', {
        params: { limit },
    });
    return response.data.data;
}

export async function getTrendingProducts(limit = 10): Promise<ProductResponse[]> {
    const response = await apiClient.get<GeneralResponse<ProductResponse[]>>('/productos/tendencia', {
        params: { limit },
    });
    return response.data.data;
}

export async function getProductById(id: number): Promise<ProductResponse> {
    const response = await apiClient.get<GeneralResponse<ProductResponse>>(`/productos/${id}`);
    return response.data.data;
}