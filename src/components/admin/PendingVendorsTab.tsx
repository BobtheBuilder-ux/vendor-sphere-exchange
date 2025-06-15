
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { getRiskBadge } from "./VendorApprovalBadges";

interface PendingVendorsTabProps {
  vendors: any[];
  onReviewVendor: (vendor: any) => void;
}

const PendingVendorsTab = ({ vendors, onReviewVendor }: PendingVendorsTabProps) => {
  return (
    <div className="space-y-4">
      {vendors.map((vendor) => (
        <Card key={vendor.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>{vendor.businessName}</span>
                  {getRiskBadge(vendor.riskScore)}
                </CardTitle>
                <p className="text-gray-600">{vendor.applicantName} • {vendor.email}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onReviewVendor(vendor)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Review
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Business Type</p>
                <p className="text-sm">{vendor.businessType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Submitted</p>
                <p className="text-sm">{vendor.submittedAt}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Credit Score</p>
                <p className="text-sm font-semibold">{vendor.creditScore}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Documents</p>
                <div className="flex space-x-1">
                  {vendor.documents.map((doc: any, index: number) => (
                    <div key={index} className="w-2 h-2 rounded-full bg-green-500"></div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PendingVendorsTab;
