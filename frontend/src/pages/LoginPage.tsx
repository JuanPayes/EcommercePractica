import { useState, type SubmitEventHandler } from 'react';;
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login({ email, password });
            navigate('/');
        } catch {
            setError('Email o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header title="Iniciar sesión" cutColor="teal" cutSide="right" compact />

            <form onSubmit={handleSubmit} className="px-5 pt-6 flex flex-col gap-4">
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
                    {loading ? 'Entrando…' : 'Entrar'}
                </button>

                <p className="text-center text-[13px] text-navy/60 mt-2">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="text-teal font-semibold">
                        Regístrate
                    </Link>
                </p>
            </form>
        </div>
    );
}