import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

export function CartPage() {
    const { items, itemCount, subtotal } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    function handleCheckout() {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        navigate('/checkout');
    }

    return (
        <div className="pb-4">
            <Header title={`Tu carrito (${itemCount})`} cutColor="teal" cutSide="right" compact />

            <div className="px-5 pt-4">
                {items.length === 0 ? (
                    <p className="text-center text-navy/50 text-sm py-12">Tu carrito está vacío</p>
                ) : (
                    <div className="flex flex-col gap-2.5">
                        {items.map((item) => (
                            <CartItemRow key={item.product.id} item={item} />
                        ))}
                    </div>
                )}
            </div>

            {items.length > 0 && (
                <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-5 py-3.5 bg-white border-t border-navy/10">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[14px] font-bold text-navy">Total</span>
                        <span className="text-lg font-extrabold text-orange">${subtotal.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-orange text-white font-bold py-3.5 rounded-xl"
                    >
                        Ir a pagar
                    </button>
                </div>
            )}
        </div>
    );
}