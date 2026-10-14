import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Icon } from '@/components/common/Icon';
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge';
import { getOrderById, cancelOrder } from '@/api/orders';
import type { OrderResponse } from '@/types/order.types';

const paymentLabels: Record<string, string> = {
    CARD: 'Tarjeta',
    CASH: 'Pago contra entrega',
    TRANSFER: 'Transferencia',
};

export function OrderDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const orderId = Number(id);

    const [order, setOrder] = useState<OrderResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getOrderById(orderId)
            .then(setOrder)
            .catch(() => setError('No se pudo cargar la orden'))
            .finally(() => setLoading(false));
    }, [orderId]);

    async function handleCancel() {
        if (!window.confirm('¿Seguro que quieres cancelar esta orden?')) return;

        setCancelling(true);
        try {
            const updated = await cancelOrder(orderId);
            setOrder(updated);
        } catch {
            setError('No se pudo cancelar la orden');
        } finally {
            setCancelling(false);
        }
    }

    const header = (
        <Header
            title={`Orden #${orderId}`}
            showBack
            onBack={() => navigate('/perfil/ordenes')}
            cutColor="orange"
            cutSide="left"
            compact
        />
    );

    if (loading) {
        return (
            <div>
                {header}
                <p className="text-center text-navy/50 text-sm py-8">Cargando orden…</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div>
                {header}
                <p className="text-center text-navy/50 text-sm py-8">{error ?? 'Orden no encontrada'}</p>
            </div>
        );
    }

    const fecha = new Date(order.fecha).toLocaleDateString('es-SV', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="pb-8">
            {header}

            <div className="px-5 pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-[13px] text-navy/60">{fecha}</span>
                    <OrderStatusBadge status={order.estado} />
                </div>

                <h2 className="text-[15px] font-bold text-navy mt-5 mb-2.5">
                    Productos ({order.items.length})
                </h2>
                <div className="flex flex-col gap-2.5">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex gap-3 border border-navy/10 rounded-xl p-3">
                            <div className="w-14 h-14 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                                <Icon name="image" className="text-navy/25 text-2xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[13px] font-semibold text-navy truncate">
                                    {item.producto.nombre}
                                </div>
                                <div className="text-[12px] text-navy/60 mt-0.5">
                                    {item.cantidad} × ${item.precioUnitario.toFixed(2)}
                                </div>
                            </div>
                            <div className="text-[14px] font-bold text-navy self-center">
                                ${item.subtotal.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className="text-[15px] font-bold text-navy mt-5 mb-2.5">Envío y pago</h2>
                <div className="border border-navy/10 rounded-xl p-3.5 flex flex-col gap-3">
                    <div className="flex gap-2.5">
                        <Icon name="location_on" className="text-teal text-xl" />
                        <div>
                            <div className="text-[13px] font-semibold text-navy">{order.direccionEnvio.calle}</div>
                            <div className="text-[12px] text-navy/60">{order.direccionEnvio.ciudad}</div>
                        </div>
                    </div>
                    <div className="flex gap-2.5">
                        <Icon name="payments" className="text-teal text-xl" />
                        <div className="text-[13px] text-navy">
                            {order.payment
                                ? paymentLabels[order.payment.metodo] ?? order.payment.metodo
                                : 'Pendiente de pago'}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-5 pt-4 border-t border-navy/10">
                    <span className="text-[15px] font-bold text-navy">Total</span>
                    <span className="text-xl font-extrabold text-orange">${order.total.toFixed(2)}</span>
                </div>

                {error && <p className="text-[13px] text-red-600 mt-3">{error}</p>}

                {order.estado === 'PENDING' && (
                    <button
                        onClick={handleCancel}
                        disabled={cancelling}
                        className="w-full border border-red-200 text-red-600 text-[14px] font-semibold py-3.5 rounded-xl mt-5 disabled:opacity-50"
                    >
                        {cancelling ? 'Cancelando…' : 'Cancelar orden'}
                    </button>
                )}
            </div>
        </div>
    );
}