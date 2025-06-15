
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Store, 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import Navigation from "@/components/Navigation";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Users",
      value: "12,548",
      change: "+12.5%",
      changeType: "positive",
      icon: Users
    },
    {
      title: "Active Vendors",
      value: "1,248",
      change: "+8.2%",
      changeType: "positive",
      icon: Store
    },
    {
      title: "Total Products",
      value: "45,230",
      change: "+15.3%",
      changeType: "positive",
      icon: Package
    },
    {
      title: "Total Revenue",
      value: "$245,890",
      change: "+23.1%",
      changeType: "positive",
      icon: DollarSign
    },
    {
      title: "Growth Rate",
      value: "18.5%",
      change: "+2.3%",
      changeType: "positive",
      icon: TrendingUp
    },
    {
      title: "Pending Reviews",
      value: "127",
      change: "-5.2%",
      changeType: "negative",
      icon: AlertTriangle
    }
  ];

  const recentVendors = [
    { id: 1, name: "TechGear Pro", status: "Active", joined: "2 days ago", products: 45 },
    { id: 2, name: "StyleCraft", status: "Pending", joined: "1 week ago", products: 23 },
    { id: 3, name: "GardenCraft", status: "Active", joined: "3 days ago", products: 67 },
  ];

  const recentOrders = [
    { id: "#12345", customer: "John Doe", vendor: "TechGear Pro", amount: "$299.99", status: "Completed" },
    { id: "#12346", customer: "Jane Smith", vendor: "StyleCraft", amount: "$89.99", status: "Processing" },
    { id: "#12347", customer: "Mike Johnson", vendor: "GardenCraft", amount: "$149.99", status: "Shipped" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your marketplace platform</p>
          </div>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentVendors.map((vendor) => (
                      <div key={vendor.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{vendor.name}</p>
                          <p className="text-sm text-gray-600">{vendor.products} products • {vendor.joined}</p>
                        </div>
                        <Badge variant={vendor.status === 'Active' ? 'default' : 'secondary'}>
                          {vendor.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer} • {order.vendor}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.amount}</p>
                          <Badge variant="outline" className="text-xs">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search vendors..." className="pl-10 w-80" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button>Add Vendor</Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Vendor</th>
                        <th className="p-4 font-medium">Category</th>
                        <th className="p-4 font-medium">Products</th>
                        <th className="p-4 font-medium">Revenue</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentVendors.map((vendor) => (
                        <tr key={vendor.id} className="border-b">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{vendor.name}</p>
                              <p className="text-sm text-gray-600">Joined {vendor.joined}</p>
                            </div>
                          </td>
                          <td className="p-4">Electronics</td>
                          <td className="p-4">{vendor.products}</td>
                          <td className="p-4">$12,450</td>
                          <td className="p-4">
                            <Badge variant={vendor.status === 'Active' ? 'default' : 'secondary'}>
                              {vendor.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10 w-80" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">User management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Order management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics dashboard will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
