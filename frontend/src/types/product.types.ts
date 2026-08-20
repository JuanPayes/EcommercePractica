import type { CategoryResponse } from './category.types';

export interface ProductResponse {
    id: number;
    nombre: string;
    descripcion: string | null;
    precio: number;
    stock: number;
    categoria: CategoryResponse;
}