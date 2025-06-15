
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RatingDisplay } from '@/components/ui/rating';
import { Product } from '@/types/firestore';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={product.imageUrl || product.images?.[0] || "/placeholder.svg"} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    {product.rating && product.totalReviews ? (
                      <RatingDisplay 
                        rating={product.rating} 
                        showValue 
                        size="sm"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">No reviews yet</span>
                    )}
                    
                    {product.stock <= 0 && (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                    {product.stock > 0 && product.stock < 10 && (
                      <Badge variant="secondary">Low Stock</Badge>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFavorite}
                >
                  <Heart 
                    className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                  />
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    disabled={product.stock <= 0}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.imageUrl || product.images?.[0] || "/placeholder.svg"} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {product.stock <= 0 && (
            <div className="absolute top-2 left-2">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary">Low Stock</Badge>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={toggleFavorite}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </Button>
        </div>
        
        <div className="space-y-2">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center space-x-1">
            {product.rating && product.totalReviews ? (
              <RatingDisplay 
                rating={product.rating} 
                showValue 
                size="sm"
              />
            ) : (
              <span className="text-sm text-gray-400">No reviews yet</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="flex space-x-2 w-full">
          <Button 
            className="flex-1" 
            disabled={product.stock <= 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
