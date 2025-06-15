
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Package, Users, Star, ShoppingCart } from "lucide-react";

const VendorStats = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign
    },
    {
      title: "Orders",
      value: "248",
      change: "+8.2%",
      changeType: "positive",
      icon: ShoppingCart
    },
    {
      title: "Products",
      value: "45",
      change: "+3",
      changeType: "positive",
      icon: Package
    },
    {
      title: "Customers",
      value: "189",
      change: "+15.3%",
      changeType: "positive",
      icon: Users
    },
    {
      title: "Rating",
      value: "4.8",
      change: "+0.1",
      changeType: "positive",
      icon: Star
    },
    {
      title: "Growth",
      value: "23.5%",
      change: "+5.2%",
      changeType: "positive",
      icon: TrendingUp
    }
  ];

  return (
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
  );
};

export default VendorStats;
