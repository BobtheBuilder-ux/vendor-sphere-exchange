
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import { useAuth } from "@/hooks/useAuth";
import { createReview } from "@/lib/reviews";
import { getProduct } from "@/lib/firestore";
import { Product } from "@/types/firestore";

const ProductDetailsPage = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
              <p className="text-gray-600">The product you're looking for doesn't exist.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductImageGallery product={product} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs 
          product={product}
          onReviewSubmit={handleReviewSubmit}
          isSubmittingReview={isSubmittingReview}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
