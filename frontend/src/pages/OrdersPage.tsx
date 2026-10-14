import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { OrderCard } from '@/components/order/OrderCard';
import { getMyOrders } from '@/api/orders';
import type { OrderResponse } from '@/types/order.types';
import { getErrorMessage } from '@/utils/errors';
import { ErrorState } from '@/components/common/ErrorState';

export function OrdersPage() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setOrders(await getMyOrders());
        } catch (err) {
            setError(getErrorMessage(err, 'No se pudieron cargar tus órdenes'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    return (
        <div className="pb-8">
            <Header
                title="Mis órdenes"
                showBack
                onBack={() => navigate('/perfil')}
                cutColor="orange"
                cutSide="left"
                compact
            />

            <div className="px-5 pt-4">
                {loading ? (
                    <p className="text-center text-navy/50 text-sm py-8">Cargando órdenes…</p>
                ) : error ? (
                    <ErrorState message={error} onRetry={loadOrders} />
                ) : (
                    <div className="px-5 pt-4">
                        {orders.length === 0 ? (
                            <p className="text-center text-[13px] text-navy/50 py-8">Todavía no tienes órdenes</p>
                        ) : (
                            <div className="flex flex-col gap-2.5">
                                {orders.map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}