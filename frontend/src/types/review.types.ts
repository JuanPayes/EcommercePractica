export interface ReviewResponse {
    id: number;
    productoId: number;
    usuarioNombre: string;
    puntuacion: number;
    comentario: string | null;
    fecha: string;
}

export interface ProductRatingResponse {
    productoId: number;
    promedioCalificacion: number;
    totalResenas: number;
}

export interface ReviewRequest {
    productoId: number;
    puntuacion: number;
    comentario: string;
}