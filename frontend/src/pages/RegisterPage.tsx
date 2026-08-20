import { useState, type SubmitEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';

export function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await register({ nombre, email, password });
            navigate('/');
        } catch {
            setError('Email o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <Header title="Crear cuenta" cutColor="amber" cutSide="left" compact />

            <form onSubmit={handleSubmit} className="px-5 pt-6 flex flex-col gap-4">
                <div>
                    <label className="text-[13px] font-semibold text-navy block mb-1.5">Nombre</label>
                    <input
                        type="text"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full h-11 border border-navy/15 rounded-lg px-3.5 text-sm outline-none focus:border-teal"
                    />
                </div>

                <div>
                    <label className="text-[13px] font-semibold text-navy block mb-1.5">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 border border-navy/15 rounded-lg px-3.5 text-sm outline-none focus:border-teal"
                    />
                </div>

                <div>
                    <label className="text-[13px] font-semibold text-navy block mb-1.5">Contraseña</label>
                    <input
                        type="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-11 border border-navy/15 rounded-lg px-3.5 text-sm outline-none focus:border-teal"
                    />
                </div>

                {error && <p className="text-[13px] text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange text-white font-bold py-3.5 rounded-xl mt-2 disabled:opacity-50"
                >
                    {loading ? 'Creando cuenta…' : 'Crear cuenta'}
                </button>

                <p className="text-center text-[13px] text-navy/60 mt-2">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-teal font-semibold">
                        Inicia sesión
                    </Link>
                </p>
            </form>
        </div>
    );
}