
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  User, 
  Package,
  Star,
  MessageSquare,
  Search,
  Eye,
  RotateCcw
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const recentOrders = [
    { 
      id: "#12345", 
      vendor: "TechGear Pro", 
      items: "Wireless Headphones", 
      amount: "$79.99", 
      status: "Delivered",
      date: "2024-01-15",
      image: "/placeholder.svg"
    },
    { 
      id: "#12346", 
      vendor: "StyleCraft", 
      items: "Cotton T-Shirt", 
      amount: "$29.99", 
      status: "Shipped",
      date: "2024-01-10",
      image: "/placeholder.svg"
    },
    { 
      id: "#12347", 
      vendor: "GardenCraft", 
      items: "Plant Pot Set", 
      amount: "$49.99", 
      status: "Processing",
      date: "2024-01-08",
      image: "/placeholder.svg"
    },
  ];

  const favorites = [
    {
      id: 1,
      name: "Smart Fitness Watch",
      vendor: "HealthTech Solutions",
      price: "$199.99",
      originalPrice: "$249.99",
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 2,
      name: "Premium Coffee Beans",
      vendor: "Mountain Roasters",
      price: "$24.99",
      image: "/placeholder.svg",
      inStock: true
    }
  ];

  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "New York, NY 10001",
      isDefault: true
    },
    {
      id: 2,
      type: "Work",
      name: "John Doe",
      address: "456 Business Ave, Suite 200",
      city: "New York, NY 10002",
      isDefault: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600 mt-2">Manage your orders, preferences, and account settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="p-6 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <p className="text-sm text-gray-600">john.doe@example.com</p>
                    </div>
                  </div>
                </div>
                <nav className="p-2">
                  {[
                    { id: "orders", label: "My Orders", icon: ShoppingBag },
                    { id: "favorites", label: "Favorites", icon: Heart },
                    { id: "addresses", label: "Addresses", icon: MapPin },
                    { id: "payments", label: "Payment Methods", icon: CreditCard },
                    { id: "messages", label: "Messages", icon: MessageSquare },
                    { id: "profile", label: "Profile Settings", icon: User },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Orders</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search orders..." className="pl-10 w-64" />
                  </div>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                              <img 
                                src={order.image} 
                                alt={order.items}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-semibold">{order.items}</p>
                              <p className="text-sm text-gray-600">Order {order.id}</p>
                              <p className="text-sm text-gray-600">from {order.vendor}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">{order.amount}</p>
                            <Badge 
                              variant={
                                order.status === 'Delivered' ? 'default' : 
                                order.status === 'Shipped' ? 'secondary' : 'outline'
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            {order.status === 'Delivered' && (
                              <Button variant="outline" size="sm">
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Return
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">My Favorites</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {favorites.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">by {item.vendor}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                            )}
                          </div>
                          <Button size="sm">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Saved Addresses</h2>
                  <Button>Add New Address</Button>
                </div>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <Card key={address.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant={address.isDefault ? "default" : "outline"}>
                                {address.type}
                              </Badge>
                              {address.isDefault && (
                                <Badge variant="secondary">Default</Badge>
                              )}
                            </div>
                            <p className="font-semibold">{address.name}</p>
                            <p className="text-gray-600">{address.address}</p>
                            <p className="text-gray-600">{address.city}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Remove</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Payment Methods</h2>
                  <Button>Add New Card</Button>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">No payment methods saved yet.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Messages</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Conversations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">No messages yet. <Link to="/messages" className="text-primary hover:underline">Start a conversation</Link> with a vendor.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Profile Settings</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Profile settings will be implemented here.</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
