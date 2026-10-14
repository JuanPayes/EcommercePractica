import { Header } from '@/components/layout/Header';
import { MenuItem } from '@/components/common/MenuItem';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
    { to: '/perfil/direcciones', icon: 'location_on', label: 'Direcciones' },
    { to: '/perfil/ordenes', icon: 'receipt_long', label: 'Mis órdenes' },
    { to: '/perfil/configuracion', icon: 'settings', label: 'Configuración' },
    { to: '/perfil/ayuda', icon: 'help', label: 'Ayuda' },
];

export function ProfilePage() {
    const { user } = useAuth();
    const initial = user?.nombre.charAt(0).toUpperCase() ?? '?';

    return (
        <div className="pb-8">
            <Header title="Mi perfil" cutColor="teal" cutSide="right" compact />

            <div className="px-5 pt-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-navy flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">{initial}</span>
                </div>
                <h1 className="text-lg font-bold text-navy mt-3">{user?.nombre}</h1>
            </div>

            <div className="px-5 pt-6 flex flex-col gap-3">
                {menuItems.map((item) => (
                    <MenuItem key={item.to} {...item} />
                ))}
            </div>
        </div>
    );
}