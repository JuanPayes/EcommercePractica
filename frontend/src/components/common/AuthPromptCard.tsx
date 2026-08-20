import { Link } from 'react-router-dom';
import { Icon } from './Icon';

export function AuthPromptCard() {
    return (
        <div className="mx-5 mb-5 rounded-2xl border border-navy/10 bg-sky-light/15 p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center shrink-0">
                <Icon name="person" className="text-white text-2xl" />
            </div>
            <div className="flex-1">
                <div className="text-[13px] font-bold text-navy">Únete a la tienda</div>
                <div className="text-[12px] text-navy/60">Inicia sesión para comprar y calificar productos</div>
            </div>
            <Link
                to="/login"
                className="shrink-0 bg-orange text-white text-[12px] font-bold px-3.5 py-2 rounded-lg"
            >
                Entrar
            </Link>
        </div>
    );
}