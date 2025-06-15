
import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string) => {
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

export const getRiskBadge = (risk: string) => {
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
