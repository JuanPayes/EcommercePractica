import { Icon } from '@/components/common/Icon';
import { useCart } from '@/hooks/useCart';
import type { CartItem } from '@/types/cartItem.types'

export function CartItemRow({ item }: { item: CartItem }) {
    const { updateQuantity } = useCart();

    return (
        <div className="border border-navy/10 rounded-xl p-3 flex gap-3">
            <div className="w-16 h-16 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                <Icon name="image" className="text-navy/25 text-2xl" />
            </div>

            <div className="flex-1">
                <div className="text-[13px] font-semibold text-navy">{item.product.nombre}</div>
                <div className="text-[13px] text-orange font-bold mt-0.5">
                    ${item.product.precio.toFixed(2)}
                </div>

                <div className="flex items-center gap-2 mt-1.5">
                    <button
                        onClick={() => updateQuantity(item.product.id, item.cantidad - 1)}
                        aria-label="Reducir cantidad"
                        className="w-7 h-7 rounded-md border border-navy/20 flex items-center justify-center text-navy"
                    >
                        <Icon name="remove" className="text-base" />
                    </button>
                    <span className="text-[13px] font-semibold text-navy w-4 text-center">{item.cantidad}</span>
                    <button
                        onClick={() => updateQuantity(item.product.id, item.cantidad + 1)}
                        aria-label="Aumentar cantidad"
                        className="w-7 h-7 rounded-md border border-navy/20 flex items-center justify-center text-navy"
                    >
                        <Icon name="add" className="text-base" />
                    </button>
                </div>
            </div>
        </div>
    );
}