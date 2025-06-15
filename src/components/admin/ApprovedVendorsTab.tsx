
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ApprovedVendorsTabProps {
  vendors: any[];
}

const ApprovedVendorsTab = ({ vendors }: ApprovedVendorsTabProps) => {
  return (
    <div className="space-y-4">
      {vendors.map((vendor) => (
        <Card key={vendor.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{vendor.businessName}</h3>
                <p className="text-gray-600">{vendor.applicantName} • {vendor.email}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-semibold">{vendor.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">${vendor.totalSales.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Sales</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{vendor.products}</p>
                  <p className="text-xs text-gray-500">Products</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Approved</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ApprovedVendorsTab;
