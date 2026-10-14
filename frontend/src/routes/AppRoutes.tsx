import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { CategoriasPage } from '@/pages/CategoriasPage';
import { ProductDetailPage } from '@/pages/ProductDetailsPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { AddressesPage } from '@/pages/AddressPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { HelpPage } from '@/pages/HelpPage';
import { OrderDetailsPage } from '@/pages/OrderDetailsPage';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/categorias" element={<CategoriasPage />} />
                <Route path="/productos/:id" element={<ProductDetailPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/perfil" element={<ProfilePage />} />
                    <Route path="/perfil/direcciones" element={<AddressesPage />} />
                    <Route path="/perfil/configuracion" element={<SettingsPage />} />
                    <Route path="/perfil/ayuda" element={<HelpPage />} />
                    <Route path="/perfil/ordenes" element={<OrdersPage />} />

                    <Route path="/perfil/ordenes/:id" element={<OrderDetailsPage />} />

                    <Route path="/checkout" element={<CheckoutPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}