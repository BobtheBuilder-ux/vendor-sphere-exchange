
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminStats from "./AdminStats";
import { 
  Users, 
  Store, 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle
} from "lucide-react";

const AdminOverviewTab = () => {
  const stats = [
    {
      title: "Total Users",
      value: "12,548",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Active Vendors",
      value: "1,248",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Store
    },
    {
      title: "Total Products",
      value: "45,230",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: Package
    },
    {
      title: "Total Revenue",
      value: "$245,890",
      change: "+23.1%",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Growth Rate",
      value: "18.5%",
      change: "+2.3%",
      changeType: "positive" as const,
      icon: TrendingUp
    },
    {
      title: "Pending Reviews",
      value: "127",
      change: "-5.2%",
      changeType: "negative" as const,
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
    <div className="space-y-6">
      <AdminStats stats={stats} />

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
    </div>
  );
};

export default AdminOverviewTab;
