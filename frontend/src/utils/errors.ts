import axios from 'axios';

export function getErrorMessage(error: unknown, fallback = 'Ocurrió un error inesperado'): string {
    if (!axios.isAxiosError(error)) {
        return fallback;
    }

    if (error.code === 'ECONNABORTED') {
        return 'La solicitud tardó demasiado. Revisa tu conexión e intenta de nuevo.';
    }

    if (!error.response) {
        return 'No se pudo conectar con el servidor. Revisa tu conexión.';
    }

    if (error.response.status >= 500) {
        return 'Algo salió mal en el servidor. Intenta de nuevo en unos minutos.';
    }

    const backendMessage = error.response.data?.message;
    return typeof backendMessage === 'string' ? backendMessage : fallback;
}