import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { AddressForm } from '@/components/common/AddressForm';
import { getMyAddresses, createAddress } from '@/api/addresses';
import type { AddressResponse, AddressRequest } from '@/types/address.types';
import { logError } from '@/utils/logger';
import { getErrorMessage } from '@/utils/errors';
import { ErrorState } from '@/components/common/ErrorState';

export function AddressesPage() {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState<AddressResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadAddresses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setAddresses(await getMyAddresses());
        } catch (err) {
            logError('AddressesPage', err);
            setError(getErrorMessage(err, 'No se pudieron cargar tus direcciones'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAddresses();
    }, []);

    async function handleCreate(dto: AddressRequest) {
        const nueva = await createAddress(dto);
        setAddresses((prev) => [...prev, nueva]);
        setShowForm(false);
    }

    return (
        <div className="pb-8">
            <Header
                title="Direcciones"
                showBack
                onBack={() => navigate('/perfil')}
                cutColor="sky-light"
                cutSide="right"
                compact
            />

            {loading ? (
                <p className="text-center text-navy/50 text-sm py-8">Cargando direcciones…</p>
            ) : error ? (
                <ErrorState message={error} onRetry={loadAddresses} />
            ) : (
                <div className="px-5 pt-4">
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="w-full border-2 border-dashed border-teal/40 text-teal text-[13px] font-semibold py-3 rounded-xl mb-3"
                        >
                            + Agregar dirección
                        </button>
                    )}

                    {showForm && (
                        <div className="mb-3">
                            <AddressForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
                        </div>
                    )}

                    {addresses.length === 0 ? (
                        <p className="text-center text-[13px] text-navy/50 py-8">
                            Todavía no tienes direcciones guardadas
                        </p>
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
                </div>
            )}
        </div>
    );
}