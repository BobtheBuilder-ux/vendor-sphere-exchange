
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface InventoryItem {
  id: number;
  name: string;
  currentStock: number;
  minStock: number;
}

interface InventoryAlertsProps {
  inventoryData: InventoryItem[];
}

const InventoryAlerts = ({ inventoryData }: InventoryAlertsProps) => {
  const lowStockItems = inventoryData.filter(item => item.currentStock <= item.minStock);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Current: {product.currentStock} | Minimum: {product.minStock}
                  </p>
                </div>
              </div>
              <Button size="sm">Reorder</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryAlerts;
