import { Link } from 'react-router-dom';

export function AuthButtons({ redirectTo = '/' }: { redirectTo?: string }) {
    const state = { from: redirectTo };

    return (
        <div className="flex gap-2.5 w-full">
            <Link
                to="/register"
                state={state}
                className="flex-1 text-center bg-teal text-white text-[13px] font-bold py-3 rounded-xl"
            >
                Crear cuenta
            </Link>
            <Link
                to="/login"
                state={state}
                className="flex-1 text-center bg-orange text-white text-[13px] font-bold py-3 rounded-xl"
            >
                Iniciar sesión
            </Link>
        </div>
    );
}