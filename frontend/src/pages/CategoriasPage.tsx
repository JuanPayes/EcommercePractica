import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CategoryChips } from '@/components/product/CategoryChips';
import { PriceRangeChips } from '@/components/product/PriceRangeChips';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getProducts } from '@/api/products';
import { getCategories } from '@/api/categories';
import type { ProductResponse } from '@/types/product.types';
import type { CategoryResponse } from '@/types/category.types';
import type { PriceRange } from '@/types/priceRange.types';

export function CategoriasPage() {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedRange, setSelectedRange] = useState<PriceRange | null>(null);

    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    useEffect(() => {
        setLoading(true);
        getProducts(0, 12, selectedCategoryId ?? undefined, selectedRange?.min, selectedRange?.max)
            .then((result) => {
                setProducts(result.content);
                setPage(result.page);
                setTotalPages(result.totalPages);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [selectedCategoryId, selectedRange]);

    async function handleLoadMore() {
        setLoadingMore(true);
        try {
            const nextPage = page + 1;
            const result = await getProducts(
                nextPage, 12, selectedCategoryId ?? undefined, selectedRange?.min, selectedRange?.max,
            );
            setProducts((prev) => [...prev, ...result.content]);
            setPage(result.page);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingMore(false);
        }
    }

    const hasMore = page + 1 < totalPages;

    return (
        <div>
            <Header title="Categorías" cutColor="sky-light" cutSide="left" />

            <div className="pt-4">
                <CategoryChips
                    categories={categories}
                    selectedId={selectedCategoryId}
                    onSelect={setSelectedCategoryId}
                />
                <PriceRangeChips selectedRange={selectedRange} onSelect={setSelectedRange} />

                {loading ? (
                    <p className="text-center text-navy/50 text-sm py-8">Cargando productos…</p>
                ) : (
                    <>
                        <ProductGrid products={products} />

                        {hasMore && (
                            <div className="px-5 py-5 flex justify-center">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="bg-navy text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg disabled:opacity-50"
                                >
                                    {loadingMore ? 'Cargando…' : 'Cargar más'}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}