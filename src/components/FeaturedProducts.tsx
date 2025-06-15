
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, MessageSquare, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    vendor: "TechGear Pro",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 234,
    image: "/placeholder.svg",
    badge: "Best Seller",
    inStock: true
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    vendor: "HealthTech Solutions",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg",
    badge: "Featured",
    inStock: true
  },
  {
    id: 3,
    name: "Organic Coffee Beans - Premium",
    vendor: "Mountain Roasters",
    price: 24.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg",
    badge: "New",
    inStock: true
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    vendor: "ComfortSpace",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.6,
    reviews: 67,
    image: "/placeholder.svg",
    badge: "Sale",
    inStock: false
  }
];

const FeaturedProducts = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

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
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant={product.badge === "Sale" ? "destructive" : "default"}>
                      {product.badge}
                    </Badge>
                  </div>
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
                  
                  <Link to={`/vendors/${product.vendor.toLowerCase().replace(/\s+/g, '-')}`}>
                    <p className="text-sm text-gray-600 hover:text-primary transition-colors">
                      by {product.vendor}
                    </p>
                  </Link>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 space-y-2">
                <div className="flex space-x-2 w-full">
                  <Button 
                    className="flex-1" 
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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
