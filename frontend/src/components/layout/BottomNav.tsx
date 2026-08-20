// frontend/src/components/layout/BottomNav.tsx
import { NavLink } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';

const navItems = [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/categorias', label: 'Categorías', icon: 'category' },
    { to: '/carrito', label: 'Carrito', icon: 'shopping_cart' },
    { to: '/perfil', label: 'Perfil', icon: 'person' },
];

export function BottomNav() {
    return (
        <nav className="h-16 bg-white border-t border-navy/10 flex items-center justify-around shrink-0">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-0.5 ${isActive ? 'text-navy' : 'text-navy/40'}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <Icon name={item.icon} filled={isActive} className="text-2xl" />
                            <span className={`text-[10px] ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}