import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Icon } from '@/components/common/Icon';

export function NotFoundPage() {
    return (
        <div>
            <Header title="tienda" cutColor="orange" cutSide="right" compact />

            <div className="px-8 pt-16 flex flex-col items-center text-center">
                <div className="w-36 h-36 rounded-full bg-sky-light/30 flex items-center justify-center">
                    <Icon name="search_off" size={72} className="text-teal" />
                </div>

                <h1 className="text-lg font-bold text-navy mt-5">Página no encontrada</h1>
                <p className="text-[13px] text-navy/60 mt-1.5">
                    La página que buscas no existe o fue movida
                </p>

                <Link
                    to="/"
                    className="mt-6 bg-orange text-white text-[13px] font-bold px-8 py-3 rounded-xl"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}