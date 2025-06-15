
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InventoryAnalytics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">3.2</div>
            <div className="text-gray-600">Avg Turnover Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">7.5</div>
            <div className="text-gray-600">Avg Sales Velocity</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">12</div>
            <div className="text-gray-600">Days to Reorder</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryAnalytics;
