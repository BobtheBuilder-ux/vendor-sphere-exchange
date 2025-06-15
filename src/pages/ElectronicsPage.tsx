
import { useState } from "react";
import { Search, Filter, Star, ShoppingCart, MessageSquare, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const products = [
  {
    id: "electronics-1",
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
    id: "electronics-2",
    name: "Smart Home Security Camera",
    vendor: "SecureHome Tech",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg",
    badge: "Featured",
    inStock: true
  },
  {
    id: "electronics-3",
    name: "Gaming Mechanical Keyboard",
    vendor: "GameTech Solutions",
    price: 129.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg",
    badge: "New",
    inStock: true
  },
  {
    id: "electronics-4",
    name: "4K Ultra HD Monitor",
    vendor: "DisplayPro",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.6,
    reviews: 67,
    image: "/placeholder.svg",
    badge: "Sale",
    inStock: false
  }
];

const ElectronicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const { addItemToCart } = useCart();
  const { user } = useAuth();

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (productId: string) => {
    if (user) {
      addItemToCart(productId, 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Electronics</h1>
          <p className="text-gray-600">Discover the latest in technology and electronics</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search electronics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-50">$0 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100-200">$100 - $200</SelectItem>
              <SelectItem value="200-plus">$200+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
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
                    disabled={!product.inStock || !user}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {!user ? 'Login Required' : !product.inStock ? 'Out of Stock' : 'Add to Cart'}
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
    </div>
  );
};

export default ElectronicsPage;
