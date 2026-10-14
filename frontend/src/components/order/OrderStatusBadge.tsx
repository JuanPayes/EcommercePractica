import type { OrderStatus } from '@/types/order.types';

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
    PENDING: { label: 'Pendiente de pago', className: 'bg-amber/20 text-amber-700' },
    PAID: { label: 'Pagada', className: 'bg-teal/15 text-teal' },
    ON_THE_WAY: { label: 'En camino', className: 'bg-sky-light/40 text-navy' },
    DELIVERED: { label: 'Entregada', className: 'bg-green-100 text-green-700' },
    CANCELLED: { label: 'Cancelada', className: 'bg-red-100 text-red-600' },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
    const config = statusConfig[status];
    return (
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${config.className}`}>
            {config.label}
        </span>
    );
}