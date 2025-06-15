
import { Card, CardContent } from "@/components/ui/card";
import { Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  price: number;
  costPrice: number;
  category: string;
  supplier: string;
  lastRestocked: string;
  status: string;
  salesVelocity: number;
  turnoverRate: number;
  reorderPoint: number;
}

interface InventoryOverviewProps {
  inventoryData: InventoryItem[];
}

const InventoryOverview = ({ inventoryData }: InventoryOverviewProps) => {
  const lowStockCount = inventoryData.filter(item => item.currentStock <= item.minStock).length;
  const outOfStockCount = inventoryData.filter(item => item.currentStock === 0).length;
  const totalValue = inventoryData.reduce((sum, item) => sum + (item.currentStock * item.costPrice), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold">{inventoryData.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryOverview;
