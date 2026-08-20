// frontend/src/pages/ProfilePage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Icon } from '@/components/common/Icon';
import { AddressForm } from '@/components/common/AddressForm';
import { OrderCard } from '@/components/order/OrderCard';
import { useAuth } from '@/hooks/useAuth';
import { getMyAddresses, createAddress } from '@/api/addresses';
import { getMyOrders } from '@/api/orders';
import type { AddressResponse, AddressRequest } from '@/types/address.types';
import type { OrderResponse } from '@/types/order.types';

export function ProfilePage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState<AddressResponse[]>([]);
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddressForm, setShowAddressForm] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const [addressesData, ordersData] = await Promise.all([getMyAddresses(), getMyOrders()]);
                setAddresses(addressesData);
                setOrders(ordersData);
            } catch (error) {
                console.error('Error cargando perfil:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    async function handleCreateAddress(dto: AddressRequest) {
        const nueva = await createAddress(dto);
        setAddresses((prev) => [...prev, nueva]);
        setShowAddressForm(false);
    }

    function handleLogout() {
        logout();
        navigate('/');
    }

    return (
        <div className="pb-8">
            <Header title="Mi perfil" cutColor="teal" cutSide="right" compact />

            <div className="px-5 pt-4">
                {/* Información del usuario */}
                <div className="flex items-center gap-3 border border-navy/10 rounded-xl p-4">
                    <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center shrink-0">
                        <Icon name="person" className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                        <div className="text-[15px] font-bold text-navy">{user?.nombre}</div>
                        <div className="text-[12px] text-navy/60">{user?.email}</div>
                    </div>
                    <button onClick={handleLogout} aria-label="Cerrar sesión">
                        <Icon name="logout" className="text-navy/60 text-2xl" />
                    </button>
                </div>

                {loading ? (
                    <p className="text-center text-navy/50 text-sm py-8">Cargando información…</p>
                ) : (
                    <>
                        {/* Direcciones */}
                        <div className="flex justify-between items-center mt-6 mb-3">
                            <h2 className="text-[15px] font-bold text-navy">Mis direcciones</h2>
                            {!showAddressForm && (
                                <button
                                    onClick={() => setShowAddressForm(true)}
                                    className="text-[13px] text-teal font-semibold"
                                >
                                    + Agregar
                                </button>
                            )}
                        </div>

                        {showAddressForm && (
                            <div className="mb-3">
                                <AddressForm onSubmit={handleCreateAddress} onCancel={() => setShowAddressForm(false)} />
                            </div>
                        )}

                        {addresses.length === 0 && !showAddressForm ? (
                            <p className="text-[13px] text-navy/50">Todavía no tienes direcciones guardadas</p>
                        ) : (
                            <div className="flex flex-col gap-2.5">
                                {addresses.map((address) => (
                                    <div key={address.id} className="border border-navy/10 rounded-xl p-3.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[13px] font-semibold text-navy">{address.calle}</span>
                                            {address.esPrincipal && (
                                                <span className="text-[10px] font-bold text-orange bg-orange/10 px-2 py-0.5 rounded-full">
                                                    Principal
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-[12px] text-navy/60">{address.ciudad}</div>
                                        {address.referencia && (
                                            <div className="text-[11px] text-navy/40">{address.referencia}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Órdenes */}
                        <h2 className="text-[15px] font-bold text-navy mt-6 mb-3">Mis órdenes</h2>

                        {orders.length === 0 ? (
                            <p className="text-[13px] text-navy/50">Todavía no tienes órdenes</p>
                        ) : (
                            <div className="flex flex-col gap-2.5">
                                {orders.map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}