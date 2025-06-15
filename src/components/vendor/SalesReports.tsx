
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Download, Calendar, TrendingUp, DollarSign, Package, Users } from "lucide-react";

const SalesReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [reportType, setReportType] = useState("overview");

  const salesData = [
    { date: "2024-01-01", sales: 1200, orders: 15, customers: 12 },
    { date: "2024-01-02", sales: 1800, orders: 22, customers: 18 },
    { date: "2024-01-03", sales: 1500, orders: 18, customers: 15 },
    { date: "2024-01-04", sales: 2200, orders: 28, customers: 24 },
    { date: "2024-01-05", sales: 1900, orders: 24, customers: 20 },
    { date: "2024-01-06", sales: 2500, orders: 32, customers: 28 },
    { date: "2024-01-07", sales: 2100, orders: 26, customers: 22 },
  ];

  const productPerformance = [
    { name: "Wireless Headphones", sales: 45, revenue: 2250, orders: 45 },
    { name: "Smart Watch", sales: 32, revenue: 4800, orders: 32 },
    { name: "Phone Case", sales: 67, revenue: 1340, orders: 67 },
    { name: "Bluetooth Speaker", sales: 28, revenue: 2240, orders: 28 },
  ];

  const metrics = {
    totalRevenue: "$12,450",
    totalOrders: 248,
    avgOrderValue: "$50.20",
    conversionRate: "3.4%",
    returningCustomers: "45%",
    topProduct: "Wireless Headphones",
  };

  const exportReport = () => {
    // Generate CSV or PDF report
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Date,Sales,Orders,Customers\n" +
      salesData.map(row => `${row.date},${row.sales},${row.orders},${row.customers}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sales-report-${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="products">Products</SelectItem>
              <SelectItem value="customers">Customers</SelectItem>
              <SelectItem value="orders">Orders</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={exportReport}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-green-600 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Revenue</p>
                <p className="text-lg font-bold">{metrics.totalRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Package className="h-4 w-4 text-blue-600 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Orders</p>
                <p className="text-lg font-bold">{metrics.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Avg Order</p>
                <p className="text-lg font-bold">{metrics.avgOrderValue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-orange-600 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Conversion</p>
                <p className="text-lg font-bold">{metrics.conversionRate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-indigo-600 mr-2" />
              <div>
                <p className="text-xs text-gray-600">Returning</p>
                <p className="text-lg font-bold">{metrics.returningCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-xs text-gray-600">Top Product</p>
              <p className="text-sm font-bold">{metrics.topProduct}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productPerformance.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${product.revenue}</p>
                  <p className="text-sm text-gray-600">{product.sales} units sold</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReports;
