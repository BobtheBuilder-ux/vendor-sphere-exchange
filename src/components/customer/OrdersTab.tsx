
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, RotateCcw } from "lucide-react";

const OrdersTab = () => {
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

  return (
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
  );
};

export default OrdersTab;
