import { useState, type SubmitEventHandler } from 'react';
import type { AddressRequest } from '@/types/address.types';
import { logError } from '@/utils/logger';
import { getErrorMessage } from '@/utils/errors';

type AddressFormProps = {
    onSubmit: (dto: AddressRequest) => Promise<void>;
    onCancel: () => void;
};

export function AddressForm({ onSubmit, onCancel }: AddressFormProps) {
    const [calle, setCalle] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [referencia, setReferencia] = useState('');
    const [esPrincipal, setEsPrincipal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await onSubmit({ calle, ciudad, referencia, esPrincipal });
        } catch (err) {
            logError('AddressForm', err);
            setError(getErrorMessage(err, 'No se pudo guardar la dirección'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 border border-navy/10 rounded-xl p-3.5 bg-neutral-50">
            <input
                type="text"
                required
                placeholder="Calle y número"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
                className="h-10 border border-navy/15 rounded-lg px-3 text-sm outline-none focus:border-teal bg-white"
            />
            <input
                type="text"
                required
                placeholder="Ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="h-10 border border-navy/15 rounded-lg px-3 text-sm outline-none focus:border-teal bg-white"
            />
            <input
                type="text"
                placeholder="Referencia (opcional)"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                className="h-10 border border-navy/15 rounded-lg px-3 text-sm outline-none focus:border-teal bg-white"
            />
            <label className="flex items-center gap-2 text-[13px] text-navy">
                <input
                    type="checkbox"
                    checked={esPrincipal}
                    onChange={(e) => setEsPrincipal(e.target.checked)}
                />
                Marcar como dirección principal
            </label>

            {error && <p className="text-[13px] text-red-600">{error}</p>}


            <div className="flex gap-2 mt-1">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 border border-navy/20 text-navy text-[13px] font-semibold py-2.5 rounded-lg"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-teal text-white text-[13px] font-semibold py-2.5 rounded-lg disabled:opacity-50"
                >
                    {loading ? 'Guardando…' : 'Guardar'}
                </button>
            </div>
        </form>
    );
}