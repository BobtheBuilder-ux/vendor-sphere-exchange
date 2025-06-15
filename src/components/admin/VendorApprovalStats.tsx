
import { Card } from "@/components/ui/card";

interface VendorApprovalStatsProps {
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}

const VendorApprovalStats = ({ pendingCount, approvedCount, rejectedCount }: VendorApprovalStatsProps) => {
  return (
    <div className="flex space-x-4">
      <Card className="p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </Card>
    </div>
  );
};

export default VendorApprovalStats;
