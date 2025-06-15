
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";
import StockAdjustmentDialog from "./StockAdjustmentDialog";

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

interface InventoryTableProps {
  inventoryData: InventoryItem[];
  onStockAdjustment: (productId: number, adjustment: number, reason: string) => void;
}

const InventoryTable = ({ inventoryData, onStockAdjustment }: InventoryTableProps) => {
  const getStockStatus = (product: InventoryItem) => {
    if (product.currentStock === 0) {
      return { status: "Out of Stock", color: "bg-red-100 text-red-800" };
    } else if (product.currentStock <= product.minStock) {
      return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    } else if (product.currentStock >= product.maxStock * 0.9) {
      return { status: "Overstock", color: "bg-blue-100 text-blue-800" };
    } else {
      return { status: "In Stock", color: "bg-green-100 text-green-800" };
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">Current Stock</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Velocity</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((product) => {
                const stockStatus = getStockStatus(product);
                return (
                  <tr key={product.id} className="border-b">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                    </td>
                    <td className="p-4">{product.sku}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{product.currentStock}</p>
                        <p className="text-xs text-gray-500">Min: {product.minStock}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={stockStatus.color}>
                        {stockStatus.status}
                      </Badge>
                    </td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-sm">{product.salesVelocity}/week</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <StockAdjustmentDialog
                        product={product}
                        onStockAdjustment={onStockAdjustment}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
