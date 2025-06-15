
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import { Product } from "@/types/firestore";

interface ProductDetailsContentProps {
  product: Product;
  onReviewSubmit: (reviewData: {
    rating: number;
    title: string;
    comment: string;
  }) => Promise<void>;
  isSubmittingReview: boolean;
}

const ProductDetailsContent = ({ 
  product, 
  onReviewSubmit, 
  isSubmittingReview 
}: ProductDetailsContentProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImageGallery product={product} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs 
        product={product}
        onReviewSubmit={onReviewSubmit}
        isSubmittingReview={isSubmittingReview}
      />
    </div>
  );
};

export default ProductDetailsContent;
