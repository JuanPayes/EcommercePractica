import { Link } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';
import type { OrderResponse } from '@/types/order.types';
import { OrderStatusBadge } from './OrderStatusBadge';

export function OrderCard({ order }: { order: OrderResponse }) {
    const fecha = new Date(order.fecha).toLocaleDateString('es-SV', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const productos = `${order.items.length} ${order.items.length === 1 ? 'producto' : 'productos'}`;


    return (
        <Link
            to={`/perfil/ordenes/${order.id}`}
            className="block border border-navy/10 rounded-xl p-4 active:bg-neutral-50"
        >
            <div className="flex justify-between items-center">
                <span className="text-[15px] font-bold text-navy">Orden #{order.id}</span>
                <OrderStatusBadge status={order.estado} />
            </div>

            <div className="text-[13px] text-navy/50 mt-1">
                {fecha} · {productos}
            </div>

            <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-extrabold text-orange">${order.total.toFixed(2)}</span>
                <span className="text-[13px] font-semibold text-teal">Ver detalle</span>
            </div>
        </Link>
    );
}