
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Store, Star, MapPin, Clock, Phone, Mail, ArrowLeft, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";

// Mock vendor data - in a real app, this would come from an API
const mockVendor = {
  id: "techgear-pro",
  name: "TechGear Pro",
  businessName: "TechGear Pro LLC",
  description: "Premium electronics and gadgets for tech enthusiasts. We specialize in the latest smartphones, laptops, accessories, and cutting-edge technology products.",
  logo: "/placeholder.svg",
  banner: "/placeholder.svg",
  rating: 4.8,
  totalReviews: 234,
  location: {
    city: "New York",
    state: "NY",
    address: "123 Tech Street, Manhattan, NY 10001"
  },
  contact: {
    email: "contact@techgearpro.com",
    phone: "+1 (555) 123-4567"
  },
  established: "2019",
  totalProducts: 145,
  categories: ["Electronics", "Smartphones", "Laptops", "Accessories"],
  isVerified: true,
  badges: ["Verified", "Top Rated", "Fast Shipping"]
};

const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 1199,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 45,
    inStock: true
  },
  {
    id: "2",
    name: "MacBook Pro M3",
    price: 1999,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 32,
    inStock: true
  },
  {
    id: "3",
    name: "AirPods Pro 2",
    price: 249,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 78,
    inStock: false
  },
  {
    id: "4",
    name: "iPad Air M2",
    price: 599,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 23,
    inStock: true
  }
];

const VendorDetailsPage = () => {
  const { vendorSlug } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/vendors" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Vendors
          </Link>
        </div>

        {/* Vendor Header */}
        <div className="mb-8">
          <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={mockVendor.logo} 
                  alt={mockVendor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{mockVendor.name}</h1>
                  {mockVendor.isVerified && (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Verified
                    </Badge>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 max-w-2xl">{mockVendor.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mockVendor.location.city}, {mockVendor.location.state}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Since {mockVendor.established}
                  </span>
                  <span className="flex items-center">
                    <Store className="h-4 w-4 mr-1" />
                    {mockVendor.totalProducts} products
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(mockVendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{mockVendor.rating}</span>
                </div>
                <p className="text-sm text-gray-500">({mockVendor.totalReviews} reviews)</p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {mockVendor.badges.map((badge) => (
              <Badge key={badge} variant="outline">
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="space-y-4">
              {/* View Toggle */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Products ({mockProducts.length})</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Products Grid */}
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }>
                {mockProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-lg font-bold text-primary mb-2">${product.price}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                        </div>
                        <Badge variant={product.inStock ? "default" : "secondary"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About {mockVendor.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{mockVendor.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Business Information</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>Business Name: {mockVendor.businessName}</li>
                      <li>Established: {mockVendor.established}</li>
                      <li>Total Products: {mockVendor.totalProducts}</li>
                      <li>Location: {mockVendor.location.city}, {mockVendor.location.state}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockVendor.categories.map((category) => (
                        <Badge key={category} variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Reviews section coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Get in Touch</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{mockVendor.contact.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{mockVendor.contact.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Location</h4>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{mockVendor.location.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDetailsPage;
