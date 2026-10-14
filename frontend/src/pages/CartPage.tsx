import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Icon } from '@/components/common/Icon';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { AuthButtons } from '@/components/common/AuthButtons';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

export function CartPage() {
    const { items, itemCount, subtotal } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    function handleCheckout() {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/checkout' } });
            return;
        }
        navigate('/checkout');
    }

    if (items.length === 0) {
        return (
            <div>
                <Header title="Tu carrito" cutColor="teal" cutSide="right" compact />

                <div className="px-8 pt-16 flex flex-col items-center text-center">
                    <div className="w-28 h-28 rounded-full bg-sky-light/30 flex items-center justify-center">
                        <Icon name="shopping_cart" size={72} className="text-teal text-6xl" />
                    </div>

                    <h2 className="text-lg font-bold text-navy mt-5">Tu carrito está vacío</h2>

                    {isAuthenticated ? (
                        <>
                            <p className="text-[13px] text-navy/60 mt-1.5">
                                Explora el catálogo y agrega productos
                            </p>
                            <Link
                                to="/categorias"
                                className="mt-6 bg-orange text-white text-[13px] font-bold px-8 py-3 rounded-xl"
                            >
                                Ver productos
                            </Link>
                        </>
                    ) : (
                        <>
                            <p className="text-[13px] text-navy/60 mt-1.5">
                                Inicia sesión o crea una cuenta para empezar a comprar
                            </p>
                            <div className="mt-6 w-full">
                                <AuthButtons redirectTo="/carrito" />
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="pb-48">
            <Header title={`Tu carrito`} cutColor="teal" cutSide="right" compact />

            <div className="px-5 pt-4 flex flex-col gap-4">

                <div className="flex flex-col gap-2.5">
                    {items.map((item) => (
                        <CartItemRow key={item.product.id} item={item} />
                    ))}
                </div>
            </div>

            <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-5 py-3.5 bg-white border-t border-navy/10">
                <div className="flex justify-between items-center text-[13px] text-navy/60 mb-1">
                    <span className="text-[14px] text-navy">Artículos</span>
                    <span className="text-[14px] text-navy">{itemCount}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[14px] font-bold text-navy">Total</span>
                    <span className="text-lg font-extrabold text-orange">${subtotal.toFixed(2)}</span>
                </div>
                <button
                    onClick={handleCheckout}
                    className="w-full bg-orange text-white font-bold py-3.5 rounded-xl"
                >
                    {isAuthenticated ? 'Ir a pagar' : 'Inicia sesión para pagar'}
                </button>
            </div>

        </div>
    );
}