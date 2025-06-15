
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockCategories, mockVendors, generateMoreProducts } from "@/lib/mockData";

const MockDataButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLoadMockData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store mock data in localStorage for demo purposes
      localStorage.setItem('demoCategories', JSON.stringify(mockCategories));
      localStorage.setItem('demoVendors', JSON.stringify(mockVendors));
      localStorage.setItem('demoProducts', JSON.stringify(generateMoreProducts(50)));
      
      toast({
        title: "Success!",
        description: `Demo data loaded successfully! 5 categories, 5 vendors, and 50 products are now available.`,
      });
      
      // Trigger a page refresh to show the data
      window.location.reload();
      
    } catch (error) {
      console.error("Failed to load mock data:", error);
      
      toast({
        title: "Error",
        description: "Failed to load demo data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Demo Platform
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Load sample data to explore our ecommerce platform with products, vendors, and categories
          </p>
          <Button
            onClick={handleLoadMockData}
            disabled={isLoading}
            variant="default"
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Database className="h-4 w-4" />
            )}
            {isLoading ? "Loading Demo Data..." : "Load Demo Data"}
          </Button>
        </div>
        <div className="hidden md:block">
          <div className="text-right text-sm text-gray-500">
            <div>✨ 50 Products</div>
            <div>🏪 5 Vendors</div>
            <div>📦 5 Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockDataButton;
