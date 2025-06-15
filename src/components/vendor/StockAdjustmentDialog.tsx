
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Minus } from "lucide-react";

interface InventoryItem {
  id: number;
  name: string;
  currentStock: number;
}

interface StockAdjustmentDialogProps {
  product: InventoryItem;
  onStockAdjustment: (productId: number, adjustment: number, reason: string) => void;
}

const StockAdjustmentDialog = ({ product, onStockAdjustment }: StockAdjustmentDialogProps) => {
  const [stockAdjustment, setStockAdjustment] = useState(0);
  const [reason, setReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    onStockAdjustment(product.id, stockAdjustment, reason);
    setStockAdjustment(0);
    setReason("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Adjust Stock
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Stock - {product.name}</DialogTitle>
          <DialogDescription>
            Current stock: {product.currentStock} units
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="adjustment">Stock Adjustment</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setStockAdjustment(Math.max(stockAdjustment - 1, -product.currentStock))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="adjustment"
                type="number"
                value={stockAdjustment}
                onChange={(e) => setStockAdjustment(parseInt(e.target.value) || 0)}
                className="w-24 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setStockAdjustment(stockAdjustment + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              New stock level: {product.currentStock + stockAdjustment}
            </p>
          </div>
          <div>
            <Label htmlFor="reason">Reason for Adjustment</Label>
            <Input
              id="reason"
              placeholder="e.g., Received shipment, Damaged goods, etc."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>
            Update Stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StockAdjustmentDialog;
