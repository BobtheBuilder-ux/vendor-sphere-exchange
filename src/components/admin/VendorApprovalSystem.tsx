
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VendorApprovalStats from "./VendorApprovalStats";
import VendorReviewDialog from "./VendorReviewDialog";
import PendingVendorsTab from "./PendingVendorsTab";
import ApprovedVendorsTab from "./ApprovedVendorsTab";
import RejectedVendorsTab from "./RejectedVendorsTab";

const VendorApprovalSystem = () => {
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  const pendingVendors = [
    {
      id: 1,
      businessName: "TechCraft Solutions",
      applicantName: "John Smith",
      email: "john@techcraft.com",
      phone: "+1 (555) 123-4567",
      businessType: "LLC",
      description: "We specialize in cutting-edge technology solutions for small businesses.",
      website: "https://techcraft.com",
      address: "123 Tech Street, Silicon Valley, CA 94025",
      submittedAt: "2024-01-15",
      documents: [
        { name: "Business License", status: "verified", url: "#" },
        { name: "Tax Certificate", status: "verified", url: "#" },
        { name: "Identity Proof", status: "verified", url: "#" },
        { name: "Bank Statement", status: "pending", url: "#" }
      ],
      riskScore: "Low",
      creditScore: 750
    },
    {
      id: 2,
      businessName: "Green Garden Supplies",
      applicantName: "Sarah Johnson",
      email: "sarah@greengarden.com",
      phone: "+1 (555) 987-6543",
      businessType: "Corporation",
      description: "Eco-friendly gardening supplies and organic products.",
      website: "https://greengarden.com",
      address: "456 Garden Ave, Portland, OR 97201",
      submittedAt: "2024-01-14",
      documents: [
        { name: "Business License", status: "verified", url: "#" },
        { name: "Tax Certificate", status: "pending", url: "#" },
        { name: "Identity Proof", status: "verified", url: "#" },
        { name: "Bank Statement", status: "verified", url: "#" }
      ],
      riskScore: "Medium",
      creditScore: 680
    }
  ];

  const approvedVendors = [
    {
      id: 3,
      businessName: "StyleCraft Boutique",
      applicantName: "Emily Davis",
      email: "emily@stylecraft.com",
      approvedAt: "2024-01-10",
      rating: 4.8,
      totalSales: 15420,
      products: 23
    }
  ];

  const rejectedVendors = [
    {
      id: 4,
      businessName: "QuickSell Inc",
      applicantName: "Mike Wilson",
      email: "mike@quicksell.com",
      rejectedAt: "2024-01-08",
      rejectionReason: "Incomplete documentation and failed verification checks."
    }
  ];

  const handleApprove = (vendorId: number) => {
    console.log("Approving vendor:", vendorId);
    setShowReviewDialog(false);
    // API call to approve vendor
  };

  const handleReject = (vendorId: number, reason: string) => {
    console.log("Rejecting vendor:", vendorId, "Reason:", reason);
    setShowReviewDialog(false);
    // API call to reject vendor
  };

  const handleReviewVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setShowReviewDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vendor Approval System</h2>
        <VendorApprovalStats 
          pendingCount={pendingVendors.length}
          approvedCount={approvedVendors.length}
          rejectedCount={rejectedVendors.length}
        />
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingVendors.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedVendors.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedVendors.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <PendingVendorsTab 
            vendors={pendingVendors} 
            onReviewVendor={handleReviewVendor}
          />
        </TabsContent>

        <TabsContent value="approved">
          <ApprovedVendorsTab vendors={approvedVendors} />
        </TabsContent>

        <TabsContent value="rejected">
          <RejectedVendorsTab vendors={rejectedVendors} />
        </TabsContent>
      </Tabs>

      <VendorReviewDialog
        vendor={selectedVendor}
        isOpen={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default VendorApprovalSystem;
