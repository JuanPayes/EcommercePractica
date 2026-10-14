import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Icon } from '@/components/common/Icon';
import { useAuth } from '@/hooks/useAuth';

export function SettingsPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/');
    }

    return (
        <div className="pb-8">
            <Header
                title="Configuración"
                showBack
                onBack={() => navigate('/perfil')}
                cutColor="amber"
                cutSide="right"
                compact
            />

            <div className="px-5 pt-4 flex flex-col gap-3">
                <div className="border border-navy/10 rounded-xl p-4">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-navy/50">Nombre</div>
                    <div className="text-[14px] text-navy mt-1">{user?.nombre}</div>
                </div>

                <div className="border border-navy/10 rounded-xl p-4">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-navy/50">Correo</div>
                    <div className="text-[14px] text-navy mt-1">{user?.email}</div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 border border-red-200 text-red-600 text-[14px] font-semibold py-3.5 rounded-xl mt-3"
                >
                    <Icon name="logout" className="text-xl" />
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}