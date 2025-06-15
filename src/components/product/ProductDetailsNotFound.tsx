
import { Card, CardContent } from "@/components/ui/card";

const ProductDetailsNotFound = () => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsNotFound;
