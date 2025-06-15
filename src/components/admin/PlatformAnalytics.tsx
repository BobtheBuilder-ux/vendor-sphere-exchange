
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Store, Package, DollarSign, ShoppingCart, Star, Target } from "lucide-react";

const PlatformAnalytics = () => {
  const overviewStats = [
    { title: "Total Revenue", value: "$847,290", change: "+18.5%", icon: DollarSign, color: "text-green-600" },
    { title: "Total Orders", value: "12,847", change: "+12.3%", icon: ShoppingCart, color: "text-blue-600" },
    { title: "Active Vendors", value: "1,248", change: "+8.7%", icon: Store, color: "text-purple-600" },
    { title: "Total Users", value: "45,230", change: "+15.2%", icon: Users, color: "text-indigo-600" },
    { title: "Products Listed", value: "78,945", change: "+22.1%", icon: Package, color: "text-orange-600" },
    { title: "Avg Rating", value: "4.6", change: "+0.1", icon: Star, color: "text-yellow-600" },
    { title: "Conversion Rate", value: "3.8%", change: "+0.5%", icon: Target, color: "text-pink-600" },
    { title: "Growth Rate", value: "24.3%", change: "+3.2%", icon: TrendingUp, color: "text-emerald-600" },
  ];

  const revenueData = [
    { month: "Jan", revenue: 65000, orders: 1200, vendors: 180 },
    { month: "Feb", revenue: 59000, orders: 1100, vendors: 195 },
    { month: "Mar", revenue: 80000, orders: 1450, vendors: 210 },
    { month: "Apr", revenue: 81000, orders: 1520, vendors: 225 },
    { month: "May", revenue: 92000, orders: 1680, vendors: 240 },
    { month: "Jun", revenue: 105000, orders: 1890, vendors: 258 },
  ];

  const categoryData = [
    { name: "Electronics", value: 35, color: "#8884d8" },
    { name: "Fashion", value: 25, color: "#82ca9d" },
    { name: "Home & Garden", value: 20, color: "#ffc658" },
    { name: "Health & Beauty", value: 12, color: "#ff7300" },
    { name: "Sports", value: 8, color: "#00ff00" },
  ];

  const conversionData = [
    { stage: "Visits", value: 100000, conversion: 100 },
    { stage: "Product Views", value: 45000, conversion: 45 },
    { stage: "Cart Adds", value: 8500, conversion: 8.5 },
    { stage: "Checkouts", value: 4200, conversion: 4.2 },
    { stage: "Purchases", value: 3800, conversion: 3.8 },
  ];

  const topVendors = [
    { name: "TechGear Pro", revenue: 125000, orders: 2340, rating: 4.8 },
    { name: "Fashion Forward", revenue: 98000, orders: 1890, rating: 4.7 },
    { name: "Home Essentials", revenue: 87000, orders: 1650, rating: 4.6 },
    { name: "Beauty Plus", revenue: 76000, orders: 1420, rating: 4.9 },
    { name: "Sports World", revenue: 65000, orders: 1230, rating: 4.5 },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {overviewStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-xs ${stat.color}`}>{stat.change} from last month</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Revenue Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Platform Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topVendors.map((vendor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{vendor.name}</p>
                        <p className="text-sm text-gray-600">{vendor.orders} orders • {vendor.rating}★</p>
                      </div>
                      <p className="font-semibold">${vendor.revenue.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Growth & Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">45,230</div>
                  <div className="text-gray-600">Total Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3,240</div>
                  <div className="text-gray-600">New This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">67%</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="vendors" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionData.map((stage, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-semibold">{stage.stage}</div>
                      <div className="text-sm text-gray-600">{stage.conversion}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{stage.value.toLocaleString()}</div>
                      <div className="w-48 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${stage.conversion}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformAnalytics;
