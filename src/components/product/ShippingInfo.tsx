
import { Truck, Shield, RotateCcw } from "lucide-react";

const ShippingInfo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="flex items-center space-x-2 text-sm">
        <Truck className="h-4 w-4 text-primary" />
        <span>Free shipping</span>
      </div>
      <div className="flex items-center space-x-2 text-sm">
        <Shield className="h-4 w-4 text-primary" />
        <span>2-year warranty</span>
      </div>
      <div className="flex items-center space-x-2 text-sm">
        <RotateCcw className="h-4 w-4 text-primary" />
        <span>30-day returns</span>
      </div>
    </div>
  );
};

export default ShippingInfo;
