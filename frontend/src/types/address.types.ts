export interface AddressResponse {
    id: number;
    calle: string;
    ciudad: string;
    referencia: string | null;
    esPrincipal: boolean;
}

export interface AddressRequest {
    calle: string;
    ciudad: string;
    referencia: string;
    esPrincipal: boolean;
}