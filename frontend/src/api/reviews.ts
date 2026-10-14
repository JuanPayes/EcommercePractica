import { apiClient } from './client';
import type { GeneralResponse } from '@/types/api.types';
import type { ReviewResponse, ProductRatingResponse } from '@/types/review.types';
import type { ReviewRequest } from '@/types/review.types';

export async function getReviewsByProduct(productId: number): Promise<ReviewResponse[]> {
    const response = await apiClient.get<GeneralResponse<ReviewResponse[]>>(`/reviews/producto/${productId}`);
    return response.data.data;
}

export async function getProductRating(productId: number): Promise<ProductRatingResponse> {
    const response = await apiClient.get<GeneralResponse<ProductRatingResponse>>(
        `/reviews/producto/${productId}/rating`,
    );
    return response.data.data;
}

export async function createReview(dto: ReviewRequest): Promise<ReviewResponse> {
    const response = await apiClient.post<GeneralResponse<ReviewResponse>>('/reviews', dto);
    return response.data.data;
}

export async function canReviewProduct(productId: number): Promise<boolean> {
    const response = await apiClient.get<GeneralResponse<boolean>>(
        `/reviews/producto/${productId}/puede-calificar`,
    );
    return response.data.data;
}