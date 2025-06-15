
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";

const AdminVendorsTab = () => {
  const recentVendors = [
    { id: 1, name: "TechGear Pro", status: "Active", joined: "2 days ago", products: 45 },
    { id: 2, name: "StyleCraft", status: "Pending", joined: "1 week ago", products: 23 },
    { id: 3, name: "GardenCraft", status: "Active", joined: "3 days ago", products: 67 },
  ];

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default AdminVendorsTab;
