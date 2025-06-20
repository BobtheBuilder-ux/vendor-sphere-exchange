
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, Loader2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { seedFirebaseWithBatch } from "@/lib/firebaseSeed";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const FirebaseSeedButton = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSeedFirebase = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access seeding functionality",
        variant: "destructive",
      });
      return;
    }

    if (user.userType !== "admin") {
      toast({
        title: "Access Denied",
        description: "Only admin users can seed Firebase data",
        variant: "destructive",
      });
      return;
    }

    console.log("Starting Firebase batch seed process");
    setIsSeeding(true);
    
    try {
      // Wait for auth state to be ready
      await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            unsubscribe();
            resolve(user);
          }
        });
      });

      const result = await seedFirebaseWithBatch();
      
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
      
      console.log("Firebase seeding completed");
    } catch (error) {
      console.error("Firebase seeding failed:", error);
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      toast({
        title: "Error",
        description: `Failed to seed Firebase: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  if (!user || user.userType !== "admin") {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Shield className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Admin Access Required
            </h3>
            <p className="text-sm text-gray-500">
              Firebase seeding is only available to admin users
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Firebase Demo Platform
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Seed Firebase with sample data using batch operations for products, vendors, and categories
          </p>
          <Button
            onClick={handleSeedFirebase}
            disabled={isSeeding}
            variant="default"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            {isSeeding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Database className="h-4 w-4" />
            )}
            {isSeeding ? "Seeding Firebase..." : "Seed Firebase"}
          </Button>
        </div>
        <div className="hidden md:block">
          <div className="text-right text-sm text-gray-500">
            <div>🔥 Firebase Batch</div>
            <div>✨ 50 Products</div>
            <div>🏪 5 Vendors</div>
            <div>📦 5 Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseSeedButton;
