
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  FileText, 
  Download,
  Star,
  MapPin,
  Mail,
  Phone,
  Globe
} from "lucide-react";

const VendorApprovalSystem = () => {
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");

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
    // API call to approve vendor
  };

  const handleReject = (vendorId: number, reason: string) => {
    console.log("Rejecting vendor:", vendorId, "Reason:", reason);
    // API call to reject vendor
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case "High":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vendor Approval System</h2>
        <div className="flex space-x-4">
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingVendors.length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{approvedVendors.length}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{rejectedVendors.length}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingVendors.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedVendors.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedVendors.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingVendors.map((vendor) => (
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedVendor(vendor)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Vendor Application Review</DialogTitle>
                          <DialogDescription>
                            {vendor.businessName} - Submitted on {vendor.submittedAt}
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedVendor && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Business Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <Globe className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{selectedVendor.website}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{selectedVendor.address}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{selectedVendor.email}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{selectedVendor.phone}</span>
                                  </div>
                                  <p className="text-sm mt-3">{selectedVendor.description}</p>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Risk Assessment</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                  <div className="flex justify-between">
                                    <span>Risk Level:</span>
                                    {getRiskBadge(selectedVendor.riskScore)}
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Credit Score:</span>
                                    <span className="font-semibold">{selectedVendor.creditScore}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Business Type:</span>
                                    <span>{selectedVendor.businessType}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Document Verification</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {selectedVendor.documents.map((doc: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                      <div className="flex items-center space-x-3">
                                        <FileText className="h-5 w-5 text-gray-500" />
                                        <div>
                                          <p className="font-medium">{doc.name}</p>
                                          {getStatusBadge(doc.status)}
                                        </div>
                                      </div>
                                      <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )}

                        <DialogFooter className="space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="destructive">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Reject Vendor Application</DialogTitle>
                                <DialogDescription>
                                  Please provide a reason for rejecting this application.
                                </DialogDescription>
                              </DialogHeader>
                              <Textarea
                                placeholder="Enter rejection reason..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                              />
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => handleReject(vendor.id, rejectionReason)}
                                >
                                  Reject Application
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          
                          <Button onClick={() => handleApprove(vendor.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedVendors.map((vendor) => (
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
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedVendors.map((vendor) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorApprovalSystem;
