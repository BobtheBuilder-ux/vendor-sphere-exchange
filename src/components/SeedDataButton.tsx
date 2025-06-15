
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { simpleSeedDatabase } from "@/lib/seedData/simpleSeed";

const SeedDataButton = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeedData = async () => {
    console.log("Starting simple seed process");
    setIsSeeding(true);
    
    try {
      const result = await simpleSeedDatabase();
      
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
      
      console.log("Simple seeding completed");
    } catch (error) {
      console.error("Simple seeding failed:", error);
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      toast({
        title: "Error",
        description: `Failed to seed database: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
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
            Generate sample data to explore our ecommerce platform with products, vendors, and categories
          </p>
          <Button
            onClick={handleSeedData}
            disabled={isSeeding}
            variant="default"
            className="flex items-center gap-2"
          >
            {isSeeding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Database className="h-4 w-4" />
            )}
            {isSeeding ? "Loading Demo Data..." : "Load Demo Data"}
          </Button>
        </div>
        <div className="hidden md:block">
          <div className="text-right text-sm text-gray-500">
            <div>✨ 50+ Products</div>
            <div>🏪 5+ Vendors</div>
            <div>📦 5 Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedDataButton;
