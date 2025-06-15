
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  stock: number;
}

const QuantitySelector = ({ quantity, onQuantityChange, stock }: QuantitySelectorProps) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="font-medium">Quantity:</span>
      <div className="flex items-center border rounded-lg">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="px-4 py-2 font-medium">{quantity}</span>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <span className="text-sm text-gray-500">({stock} available)</span>
    </div>
  );
};

export default QuantitySelector;
