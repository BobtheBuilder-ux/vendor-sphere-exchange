
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { seedDatabase } from "@/lib/seedData";

const SeedDataButton = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSeedData = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to seed the database",
        variant: "destructive",
      });
      return;
    }

    setIsSeeding(true);
    
    try {
      await seedDatabase(user.id);
      
      toast({
        title: "Success!",
        description: "Database has been seeded with 100+ products, vendors, categories, and sample orders",
      });
    } catch (error) {
      console.error("Seeding failed:", error);
      toast({
        title: "Error",
        description: "Failed to seed database. Please try again.",
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
            Generate sample data to explore our ecommerce platform with 100+ products, vendors, and orders
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
            {isSeeding ? "Loading Sample Data..." : "Load Demo Data"}
          </Button>
        </div>
        <div className="hidden md:block">
          <div className="text-right text-sm text-gray-500">
            <div>✨ 100+ Products</div>
            <div>🏪 25+ Vendors</div>
            <div>📦 Sample Orders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedDataButton;
