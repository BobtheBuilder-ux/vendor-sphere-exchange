
import { useState, useEffect, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { createReview } from "@/lib/reviews";
import { getProduct } from "@/lib/firestore";
import { Product } from "@/types/firestore";

interface ProductDetailsProviderProps {
  children: (props: {
    product: Product | null;
    loading: boolean;
    handleReviewSubmit: (reviewData: {
      rating: number;
      title: string;
      comment: string;
    }) => Promise<void>;
    isSubmittingReview: boolean;
  }) => ReactNode;
}

const ProductDetailsProvider = ({ children }: ProductDetailsProviderProps) => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    
    try {
      const productData = await getProduct(id);
      setProduct(productData);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (reviewData: {
    rating: number;
    title: string;
    comment: string;
  }) => {
    if (!user || !product) return;

    setIsSubmittingReview(true);
    try {
      await createReview({
        productId: product.id,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}` || user.email || 'Anonymous',
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment,
        isVerified: true
      });
      
      await loadProduct();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <>
      {children({
        product,
        loading,
        handleReviewSubmit,
        isSubmittingReview
      })}
    </>
  );
};

export default ProductDetailsProvider;
