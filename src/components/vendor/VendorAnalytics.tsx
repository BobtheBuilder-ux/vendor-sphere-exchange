import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesReports from "./SalesReports";
import VendorStats from "./VendorStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const VendorAnalytics = () => {
  const salesData = [
    { month: "Jan", sales: 4000, orders: 45 },
    { month: "Feb", sales: 3000, orders: 38 },
    { month: "Mar", sales: 5000, orders: 52 },
    { month: "Apr", sales: 4500, orders: 48 },
    { month: "May", sales: 6000, orders: 65 },
    { month: "Jun", sales: 5500, orders: 58 }
  ];

  const productPerformance = [
    { name: "Electronics", sales: 45, color: "#8884d8" },
    { name: "Fashion", sales: 30, color: "#82ca9d" },
    { name: "Home & Garden", sales: 15, color: "#ffc658" },
    { name: "Health & Beauty", sales: 10, color: "#ff7300" }
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 234, revenue: 18672 },
    { name: "Smart Watch", sales: 156, revenue: 31200 },
    { name: "Coffee Beans", sales: 89, revenue: 2223 },
    { name: "Office Chair", sales: 67, revenue: 20093 }
  ];

  return (
    <div className="space-y-6">
      <VendorStats />
      
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">Sales Reports</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <SalesReports />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          {/* Sales Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={productPerformance}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="sales"
                    >
                      {productPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {productPerformance.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${product.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                  <Bar dataKey="orders" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
                  <div className="space-y-3">
                    {topProducts.map((product, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm text-gray-600">#{index + 1}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <span>{product.sales} units sold</span>
                          <span className="ml-4">${product.revenue} revenue</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={productPerformance}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="sales"
                        label
                      >
                        {productPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">189</div>
                  <div className="text-gray-600">Total Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">23</div>
                  <div className="text-gray-600">New This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">87%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorAnalytics;
