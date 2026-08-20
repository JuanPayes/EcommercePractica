import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductImageHero } from '@/components/product/ProductImageHero';
import { RatingStars } from '@/components/product/RatingStars';
import { getProductById } from '@/api/products';
import { getReviewsByProduct, getProductRating, createReview } from '@/api/reviews';
import { useCart } from '@/hooks/useCart';
import type { ProductResponse } from '@/types/product.types';
import type { ReviewResponse, ProductRatingResponse, ReviewRequest } from '@/types/review.types';
import { useAuth } from '@/hooks/useAuth';
import { Modal } from '@/components/common/Modal';
import { ReviewForm } from '@/components/product/ReviewForm';

export function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const productId = Number(id);

    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [rating, setRating] = useState<ProductRatingResponse | null>(null);
    const [reviews, setReviews] = useState<ReviewResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    const { isAuthenticated } = useAuth();
    const [showReviewModal, setShowReviewModal] = useState(false);


    useEffect(() => {
        async function loadData() {
            try {
                const [productData, ratingData, reviewsData] = await Promise.all([
                    getProductById(productId),
                    getProductRating(productId),
                    getReviewsByProduct(productId),
                ]);
                setProduct(productData);
                setRating(ratingData);
                setReviews(reviewsData);
            } catch (error) {
                console.error('Error cargando producto:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [productId]);

    function handleAddToCart() {
        if (!product) return;
        addItem(product);

    }

    async function handleReviewSubmit(dto: ReviewRequest) {
        await createReview(dto);
        setShowReviewModal(false);

        const [ratingData, reviewsData] = await Promise.all([
            getProductRating(productId),
            getReviewsByProduct(productId),
        ]);
        setRating(ratingData);
        setReviews(reviewsData);
    }

    if (loading) {
        return <p className="text-center text-navy/50 text-sm py-8">Cargando producto…</p>;
    }

    if (!product) {
        return <p className="text-center text-navy/50 text-sm py-8">Producto no encontrado</p>;
    }

    const reviewsToShow = reviews.slice(0, 3);

    return (
        <div className="pb-24">
            <ProductImageHero onBack={() => navigate(-1)} />

            <div className="px-5 pt-4">
                <span className="text-teal text-[11px] font-bold uppercase tracking-wide">
                    {product.categoria.nombre}
                </span>
                <h1 className="text-xl font-bold text-navy mt-1">{product.nombre}</h1>

                {rating && rating.totalResenas > 0 && (
                    <div className="flex items-center gap-2 mt-1.5">
                        <RatingStars rating={rating.promedioCalificacion} size="sm" />
                        <span className="text-[13px] text-navy/60">
                            {rating.promedioCalificacion} · {rating.totalResenas} reseñas
                        </span>
                    </div>
                )}

                <div className="text-2xl font-extrabold text-orange mt-3">
                    ${product.precio.toFixed(2)}
                </div>

                {product.descripcion && (
                    <>
                        <div className="h-px bg-navy/10 my-4" />
                        <h2 className="text-[15px] font-bold text-navy mb-2">Descripción</h2>
                        <p className="text-[13px] text-navy/70 leading-relaxed">{product.descripcion}</p>
                    </>
                )}

                <div className="h-px bg-navy/10 my-4" />

                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-[15px] font-bold text-navy">Reseñas ({rating?.totalResenas ?? 0})</h2>
                    {reviews.length > 3 && (
                        <button className="text-[13px] text-teal font-semibold">Ver todas</button>
                    )}
                    {isAuthenticated && (
                        <button
                            onClick={() => setShowReviewModal(true)}
                            className="text-[15px] text-teal font-semibold"
                        >
                            Escribir reseña
                        </button>
                    )}
                </div>

                {reviewsToShow.length === 0 ? (
                    <p className="text-[13px] text-navy/50">Todavía no hay reseñas para este producto</p>
                ) : (
                    <div className="flex flex-col gap-3.5">
                        {reviewsToShow.map((review) => (
                            <div key={review.id} className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-full bg-neutral-200 shrink-0" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-semibold text-navy">
                                            {review.usuarioNombre}
                                        </span>
                                        <RatingStars rating={review.puntuacion} size="sm" />
                                    </div>
                                    {review.comentario && (
                                        <p className="text-[12px] text-navy/60 mt-0.5">{review.comentario}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-5 py-3 bg-white border-t border-navy/10">
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-orange text-white font-bold py-3.5 rounded-xl"
                >
                    Agregar al carrito
                </button>
            </div>
            <Modal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} title="Calificar producto">
                <ReviewForm productoId={productId} onSubmit={handleReviewSubmit} />
            </Modal>
        </div>
    );
}