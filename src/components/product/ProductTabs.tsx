
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewList from "@/components/reviews/ReviewList";
import { Product } from "@/types/firestore";

interface ProductTabsProps {
  product: Product;
  onReviewSubmit: (reviewData: {
    rating: number;
    title: string;
    comment: string;
  }) => Promise<void>;
  isSubmittingReview: boolean;
}

const ProductTabs = ({ product, onReviewSubmit, isSubmittingReview }: ProductTabsProps) => {
  return (
    <div className="mt-16">
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reviews">
            Reviews ({product.totalReviews || 0})
          </TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ReviewList productId={product.id} />
            </div>
            <div>
              <ReviewForm 
                productId={product.id}
                onSubmit={onReviewSubmit}
                isSubmitting={isSubmittingReview}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600">Product specifications will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Shipping Information</h3>
                <p className="text-gray-600">Free standard shipping on orders over $50. Express shipping available for $9.99.</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Returns Policy</h3>
                <p className="text-gray-600">30-day return policy. Items must be in original condition with tags attached.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
