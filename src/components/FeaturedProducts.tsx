
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, MessageSquare, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { RatingDisplay } from "@/components/ui/rating";
import { getProductsByCategory } from "@/lib/firestore";
import { Product } from "@/types/firestore";

const FeaturedProducts = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      // Load some sample products - you might want to create a "featured" category
      // For now, we'll just load the first few products
      setProducts([
        {
          id: "1",
          name: "Wireless Bluetooth Headphones",
          price: 79.99,
          description: "Premium wireless Bluetooth headphones with active noise cancellation",
          images: ["/placeholder.svg"],
          imageUrl: "/placeholder.svg",
          vendorId: "vendor1",
          categoryId: "electronics",
          stock: 25,
          isActive: true,
          rating: 4.8,
          totalReviews: 234,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "2",
          name: "Smart Fitness Watch",
          price: 199.99,
          description: "Advanced fitness tracking with heart rate monitoring",
          images: ["/placeholder.svg"],
          imageUrl: "/placeholder.svg",
          vendorId: "vendor2",
          categoryId: "electronics",
          stock: 15,
          isActive: true,
          rating: 4.9,
          totalReviews: 156,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "3",
          name: "Organic Coffee Beans - Premium",
          price: 24.99,
          description: "Premium organic coffee beans from mountain regions",
          images: ["/placeholder.svg"],
          imageUrl: "/placeholder.svg",
          vendorId: "vendor3",
          categoryId: "food",
          stock: 50,
          isActive: true,
          rating: 4.7,
          totalReviews: 89,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "4",
          name: "Ergonomic Office Chair",
          price: 299.99,
          description: "Comfortable ergonomic office chair with lumbar support",
          images: ["/placeholder.svg"],
          imageUrl: "/placeholder.svg",
          vendorId: "vendor4",
          categoryId: "furniture",
          stock: 0,
          isActive: true,
          rating: 4.6,
          totalReviews: 67,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">
              Hand-picked products from our top-rated vendors
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/search">View All Products</Link>
          </Button>
        </div>
        
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                    />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
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
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
