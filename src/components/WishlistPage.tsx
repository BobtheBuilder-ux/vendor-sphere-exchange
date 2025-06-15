
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import { getProduct } from "@/lib/firestore";
import { Product } from "@/types/firestore";
import WishlistButton from "./WishlistButton";
import Navigation from "./Navigation";

const WishlistPage = () => {
  const { wishlistItems, clearWishlist, loading } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    loadWishlistProducts();
  }, [wishlistItems]);

  const loadWishlistProducts = async () => {
    if (wishlistItems.length === 0) {
      setProducts([]);
      return;
    }

    setLoadingProducts(true);
    try {
      const productPromises = wishlistItems.map(id => getProduct(id));
      const productResults = await Promise.all(productPromises);
      const validProducts = productResults.filter(product => product !== null) as Product[];
      setProducts(validProducts);
    } catch (error) {
      console.error('Error loading wishlist products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  if (loading || loadingProducts) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {products.length} {products.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {products.length > 0 && (
            <Button variant="outline" onClick={clearWishlist}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Start adding products you love to keep track of them!</p>
              <Button asChild>
                <Link to="/search">Browse Products</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
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
                    <div className="absolute top-2 right-2">
                      <WishlistButton productId={product.id} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full" 
                    disabled={product.stock <= 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
