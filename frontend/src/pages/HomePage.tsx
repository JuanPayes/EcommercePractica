// frontend/src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { PromoBanner } from '@/components/common/PromoBanner';
import { AuthPromptCard } from '@/components/common/AuthPromptCard';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getFeaturedProducts, getTrendingProducts } from '@/api/products';
import { useAuth } from '@/hooks/useAuth';
import type { ProductResponse } from '@/types/product.types';

export function HomePage() {
    const { isAuthenticated } = useAuth();
    const [featuredProducts, setFeaturedProducts] = useState<ProductResponse[]>([]);
    const [trendingProducts, setTrendingProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [featured, trending] = await Promise.all([
                    getFeaturedProducts(),
                    getTrendingProducts(),
                ]);
                setFeaturedProducts(featured);
                setTrendingProducts(trending);
            } catch (error) {
                console.error('Error cargando datos:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return (
        <div>
            <Header title="tienda" cutColor="orange" cutSide="right" />

            <div className="pt-4">
                {!isAuthenticated && <AuthPromptCard />}

                <PromoBanner />

                {loading ? (
                    <p className="text-center text-navy/50 text-sm py-8">Cargando productos…</p>
                ) : (
                    <>
                        <div className="px-5 flex justify-between items-center mb-3">
                            <span className="text-[15px] font-bold text-navy">Mejor calificados</span>
                        </div>
                        <ProductGrid products={featuredProducts} />

                        <div className="px-5 flex justify-between items-center mb-3 mt-6">
                            <span className="text-[15px] font-bold text-navy">Tendencia esta semana</span>
                        </div>
                        <ProductGrid products={trendingProducts} />
                    </>
                )}
            </div>
        </div>
    );
}