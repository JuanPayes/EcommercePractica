import { NavLink } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';
import { useCart } from '@/hooks/useCart';

const navItems = [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/categorias', label: 'Categorías', icon: 'category' },
    { to: '/carrito', label: 'Carrito', icon: 'shopping_cart' },
    { to: '/perfil', label: 'Perfil', icon: 'person' },
];

export function BottomNav() {
    const { itemCount } = useCart();
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
                            <div className="relative">
                                <Icon name={item.icon} filled={isActive} className="text-2xl" />
                                {item.to === '/carrito' && itemCount > 0 && (
                                    <span
                                        key={itemCount}
                                        className="absolute -top-1 -right-2 min-w-4.5 h-4.5 px-1 rounded-full bg-orange text-white text-[10px] font-bold flex items-center justify-center motion-safe:animate-pop"
                                    >
                                        {itemCount > 9 ? '9+' : itemCount}
                                    </span>
                                )}
                            </div>
                            <span className={`text-[10px] ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}