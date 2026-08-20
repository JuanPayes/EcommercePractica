import type { OrderResponse } from '@/types/order.types';
import { OrderStatusBadge } from './OrderStatusBadge';

export function OrderCard({ order }: { order: OrderResponse }) {
    const fecha = new Date(order.fecha).toLocaleDateString('es-SV', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div className="border border-navy/10 rounded-xl p-3.5">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="text-[13px] font-bold text-navy">Orden #{order.id}</div>
                    <div className="text-[11px] text-navy/50">{fecha}</div>
                </div>
                <OrderStatusBadge status={order.estado} />
            </div>

            <div className="text-[12px] text-navy/60">
                {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
            </div>

            <div className="flex justify-between items-center mt-2 pt-2 border-t border-navy/10">
                <span className="text-[12px] text-navy/60">Total</span>
                <span className="text-[15px] font-bold text-orange">${order.total.toFixed(2)}</span>
            </div>
        </div>
    );
}