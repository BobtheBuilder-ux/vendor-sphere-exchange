
import Navigation from "@/components/Navigation";
import ProductDetailsContent from "@/components/product/ProductDetailsContent";
import ProductDetailsLoading from "@/components/product/ProductDetailsLoading";
import ProductDetailsNotFound from "@/components/product/ProductDetailsNotFound";
import ProductDetailsProvider from "@/components/product/ProductDetailsProvider";

const ProductDetailsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <ProductDetailsProvider>
        {({ product, loading, handleReviewSubmit, isSubmittingReview }) => {
          if (loading) {
            return (
              <div className="container mx-auto px-4 py-8">
                <ProductDetailsLoading />
              </div>
            );
          }

          if (!product) {
            return (
              <div className="container mx-auto px-4 py-8">
                <ProductDetailsNotFound />
              </div>
            );
          }

          return (
            <ProductDetailsContent
              product={product}
              onReviewSubmit={handleReviewSubmit}
              isSubmittingReview={isSubmittingReview}
            />
          );
        }}
      </ProductDetailsProvider>
    </div>
  );
};

export default ProductDetailsPage;
