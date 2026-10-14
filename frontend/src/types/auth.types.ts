export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    nombre: string;
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    nombre: string;
    email: string;
    rol: string;
}

export interface AuthResponse {
    token: string;
    tipo: string;
    usuario: UserResponse;
}