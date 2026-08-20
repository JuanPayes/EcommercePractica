// frontend/src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { CategoriasPage } from '@/pages/CategoriasPage';
import { ProductDetailPage } from '@/pages/ProductDetailsPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProfilePage } from '@/pages/PerfilPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/categorias" element={<CategoriasPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/perfil" element={<ProfilePage />} />

                <Route path="/productos/:id" element={<ProductDetailPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
        </Routes>
    );
}