import { useState } from 'react';
import { StarRatingInput } from './StarRatingInput';
import type { ReviewRequest } from '@/types/review.types';

type ReviewFormProps = {
    productoId: number;
    onSubmit: (dto: ReviewRequest) => Promise<void>;
};

export function ReviewForm({ productoId, onSubmit }: ReviewFormProps) {
    const [puntuacion, setPuntuacion] = useState(0);
    const [comentario, setComentario] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (puntuacion === 0) {
            setError('Selecciona una calificación');
            return;
        }

        setError(null);
        setLoading(true);
        try {
            await onSubmit({ productoId, puntuacion, comentario });
        } catch (err: any) {
            const status = err?.response?.status;
            if (status === 403) {
                setError('Solo puedes calificar productos que hayas comprado y pagado');
            } else if (status === 409) {
                setError('Ya calificaste este producto anteriormente');
            } else {
                setError('No se pudo enviar tu reseña. Intenta de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="text-[13px] font-semibold text-navy block mb-2">Tu calificación</label>
                <StarRatingInput value={puntuacion} onChange={setPuntuacion} />
            </div>

            <div>
                <label className="text-[13px] font-semibold text-navy block mb-1.5">Comentario</label>
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    rows={4}
                    maxLength={1000}
                    placeholder="Cuéntanos qué te pareció el producto…"
                    className="w-full border border-navy/15 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-teal resize-none"
                />
            </div>

            {error && <p className="text-[13px] text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange text-white font-bold py-3.5 rounded-xl disabled:opacity-50"
            >
                {loading ? 'Enviando…' : 'Publicar reseña'}
            </button>
        </form>
    );
}