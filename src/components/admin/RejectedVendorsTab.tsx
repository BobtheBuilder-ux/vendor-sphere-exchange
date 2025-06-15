
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RejectedVendorsTabProps {
  vendors: any[];
}

const RejectedVendorsTab = ({ vendors }: RejectedVendorsTabProps) => {
  return (
    <div className="space-y-4">
      {vendors.map((vendor) => (
        <Card key={vendor.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{vendor.businessName}</h3>
                <p className="text-gray-600">{vendor.applicantName} • {vendor.email}</p>
                <p className="text-sm text-red-600 mt-1">Reason: {vendor.rejectionReason}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Rejected on {vendor.rejectedAt}</span>
                <Badge variant="destructive">Rejected</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RejectedVendorsTab;
