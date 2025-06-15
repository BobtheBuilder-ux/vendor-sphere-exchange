
import { useState } from "react";
import { ShoppingCart, Heart, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingDisplay } from "@/components/ui/rating";
import { Product } from "@/types/firestore";
import QuantitySelector from "./QuantitySelector";
import ShippingInfo from "./ShippingInfo";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">In Stock</Badge>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        
        <div className="flex items-center space-x-2 mb-4">
          {product.rating && product.totalReviews ? (
            <>
              <RatingDisplay rating={product.rating} showValue />
              <span className="text-sm text-gray-600">
                ({product.totalReviews} review{product.totalReviews !== 1 ? 's' : ''})
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-500">No reviews yet</span>
          )}
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed">{product.description}</p>

      <div className="space-y-4">
        <QuantitySelector 
          quantity={quantity}
          onQuantityChange={setQuantity}
          stock={product.stock}
        />

        <div className="flex space-x-4">
          <Button className="flex-1" disabled={product.stock <= 0}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ShippingInfo />
    </div>
  );
};

export default ProductInfo;
