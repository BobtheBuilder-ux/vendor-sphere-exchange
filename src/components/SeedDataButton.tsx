
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

    // Only allow admin or vendor users to seed data
    if (user.userType !== 'admin' && user.userType !== 'vendor') {
      toast({
        title: "Permission Denied",
        description: "Only admin and vendor users can seed the database",
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

  // Only show button for admin and vendor users
  if (!user || (user.userType !== 'admin' && user.userType !== 'vendor')) {
    return null;
  }

  return (
    <Button
      onClick={handleSeedData}
      disabled={isSeeding}
      variant="outline"
      className="flex items-center gap-2"
    >
      {isSeeding ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Database className="h-4 w-4" />
      )}
      {isSeeding ? "Seeding Database..." : "Generate Sample Data"}
    </Button>
  );
};

export default SeedDataButton;
