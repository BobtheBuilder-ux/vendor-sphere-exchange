
import { useState } from "react";
import { Search, Filter, Star, Store, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const vendors = [
  {
    id: 1,
    name: "TechGear Pro",
    category: "Electronics",
    rating: 4.8,
    reviews: 234,
    image: "/placeholder.svg",
    description: "Premium electronics and gadgets",
    location: "New York, NY",
    products: 145,
    established: "2019",
    badge: "Verified"
  },
  {
    id: 2,
    name: "StyleCraft Boutique",
    category: "Fashion",
    rating: 4.7,
    reviews: 189,
    image: "/placeholder.svg",
    description: "Trendy fashion and accessories",
    location: "Los Angeles, CA",
    products: 89,
    established: "2020",
    badge: "Top Rated"
  },
  {
    id: 3,
    name: "GardenCraft Co",
    category: "Home & Garden",
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg",
    description: "Beautiful home and garden essentials",
    location: "Austin, TX",
    products: 67,
    established: "2018",
    badge: "Featured"
  },
  {
    id: 4,
    name: "CodeCraft Studios",
    category: "Services",
    rating: 4.9,
    reviews: 45,
    image: "/placeholder.svg",
    description: "Professional web development services",
    location: "Remote",
    products: 12,
    established: "2021",
    badge: "Expert"
  }
];

const AllVendorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [category, setCategory] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Vendors</h1>
          <p className="text-gray-600">Discover amazing vendors from around the world</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="home-garden">Home & Garden</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="automotive">Automotive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="products">Most Products</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="default">
                      {vendor.badge}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Link to={`/vendors/${vendor.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {vendor.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {vendor.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <Badge variant="outline" className="text-xs">
                      {vendor.category}
                    </Badge>
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {vendor.location}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({vendor.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Store className="h-3 w-3 mr-1" />
                      {vendor.products} products
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Since {vendor.established}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button className="w-full" asChild>
                  <Link to={`/vendors/${vendor.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    Visit Store
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllVendorsPage;
