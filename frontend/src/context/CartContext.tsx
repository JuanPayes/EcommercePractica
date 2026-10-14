import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem } from '@/types/cartItem.types';
import type { ProductResponse } from '@/types/product.types';

type CartContextType = {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    addItem: (product: ProductResponse, cantidad?: number) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, cantidad: number) => void;
    clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

function getStoredCart(): CartItem[] {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(getStoredCart());

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    function addItem(product: ProductResponse, cantidad = 1) {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item,
                );
            }
            return [...prev, { product, cantidad }];
        });
    }

    function removeItem(productId: number) {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    }

    function updateQuantity(productId: number, cantidad: number) {
        if (cantidad < 1) {
            removeItem(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) => (item.product.id === productId ? { ...item, cantidad } : item)),
        );
    }

    function clearCart() {
        setItems([]);
    }

    const itemCount = items.reduce((sum, item) => sum + item.cantidad, 0);
    const subtotal = items.reduce((sum, item) => sum + item.product.precio * item.cantidad, 0);

    return (
        <CartContext.Provider
            value={{ items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}