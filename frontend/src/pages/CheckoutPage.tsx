import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { AddressSelector } from '@/components/checkout/AddressSelector';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { AddressForm } from '@/components/common/AddressForm';
import { useCart } from '@/hooks/useCart';
import { getMyAddresses, createAddress } from '@/api/addresses';
import { createOrder } from '@/api/orders';
import { payOrder } from '@/api/payments';
import type { AddressResponse, AddressRequest } from '@/types/address.types';

type Method = 'CARD' | 'CASH' | 'TRANSFER';

export function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState<AddressResponse[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<Method>('CARD');
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMyAddresses()
            .then((data) => {
                setAddresses(data);
                const principal = data.find((a) => a.esPrincipal);
                setSelectedAddressId(principal?.id ?? data[0]?.id ?? null);
                if (data.length === 0) setShowAddressForm(true);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    async function handleCreateAddress(dto: AddressRequest) {
        const nueva = await createAddress(dto);
        setAddresses((prev) => [...prev, nueva]);
        setSelectedAddressId(nueva.id);
        setShowAddressForm(false);
    }

    async function handleConfirm() {
        if (!selectedAddressId) return;

        setError(null);
        setSubmitting(true);
        try {
            const order = await createOrder({
                direccionId: selectedAddressId,
                items: items.map((item) => ({ productoId: item.product.id, cantidad: item.cantidad })),
            });

            await payOrder(order.id, { metodo: selectedMethod });

            clearCart();
            navigate('/perfil');
        } catch (err) {
            console.error(err);
            setError('No se pudo procesar el pago. Verifica el stock disponible e intenta de nuevo.');
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <p className="text-center text-navy/50 text-sm py-8">Cargando…</p>;
    }

    return (
        <div className="pb-32">
            <Header title="Checkout" cutColor="amber" cutSide="left" compact />

            <div className="px-5 pt-4">
                <h2 className="text-[15px] font-bold text-navy mb-2.5">Dirección de envío</h2>

                {addresses.length > 0 && !showAddressForm && (
                    <>
                        <AddressSelector
                            addresses={addresses}
                            selectedId={selectedAddressId}
                            onSelect={setSelectedAddressId}
                        />
                        <button
                            onClick={() => setShowAddressForm(true)}
                            className="text-[13px] text-teal font-semibold mt-2"
                        >
                            + Agregar otra dirección
                        </button>
                    </>
                )}

                {showAddressForm && (
                    <AddressForm
                        onSubmit={handleCreateAddress}
                        onCancel={() => setShowAddressForm(false)}
                    />
                )}

                <h2 className="text-[15px] font-bold text-navy mt-6 mb-2.5">Método de pago</h2>
                <PaymentMethodSelector selected={selectedMethod} onSelect={setSelectedMethod} />

                <h2 className="text-[15px] font-bold text-navy mt-6 mb-2.5">Resumen</h2>
                <div className="border border-navy/10 rounded-xl p-3.5">
                    <div className="flex justify-between text-[13px] text-navy/70">
                        <span>Productos ({items.length})</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-navy/10 my-2.5" />
                    <div className="flex justify-between text-[15px] font-bold text-navy">
                        <span>Total</span>
                        <span className="text-orange">${subtotal.toFixed(2)}</span>
                    </div>
                </div>

                {error && <p className="text-[13px] text-red-600 mt-3">{error}</p>}
            </div>

            <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-5 py-3.5 bg-white border-t border-navy/10">
                <button
                    onClick={handleConfirm}
                    disabled={submitting || !selectedAddressId || items.length === 0}
                    className="w-full bg-orange text-white font-bold py-3.5 rounded-xl disabled:opacity-50"
                >
                    {submitting ? 'Procesando…' : 'Confirmar pago'}
                </button>
            </div>
        </div>
    );
}