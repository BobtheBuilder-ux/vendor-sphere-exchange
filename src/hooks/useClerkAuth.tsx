
import { useUser, useAuth as useClerkAuthHook } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: "buyer" | "vendor" | "admin";
  avatar?: string;
  businessName?: string;
  businessDescription?: string;
  contactPhone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: (userType?: "buyer" | "vendor" | "admin", additionalData?: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuth = (): AuthContextType => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerkAuthHook();
  const { toast } = useToast();

  const user: User | null = clerkUser ? {
    id: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress || "",
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    userType: (clerkUser.publicMetadata?.userType as "buyer" | "vendor" | "admin") || "buyer",
    avatar: clerkUser.imageUrl,
    businessName: clerkUser.publicMetadata?.businessName as string,
    businessDescription: clerkUser.publicMetadata?.businessDescription as string,
    contactPhone: clerkUser.publicMetadata?.contactPhone as string,
  } : null;

  const signInWithGoogle = async (userType: "buyer" | "vendor" | "admin" = "buyer", additionalData?: any) => {
    // Clerk handles sign in through their components
    // This is just for compatibility with existing code
    toast({
      title: "Info",
      description: "Please use the sign in button to authenticate",
    });
  };

  const logout = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "Successfully logged out!",
      });
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast({
        title: "Error",
        description: "Logout failed",
        variant: "destructive",
      });
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (clerkUser) {
      try {
        // Update basic user fields first
        if (userData.firstName || userData.lastName) {
          await clerkUser.update({
            firstName: userData.firstName,
            lastName: userData.lastName,
          });
        }
        
        // Update public metadata for custom fields separately
        if (userData.userType || userData.businessName || userData.businessDescription || userData.contactPhone) {
          // Use reload to refresh the user object after metadata update
          await clerkUser.reload();
          
          // Note: Public metadata updates in Clerk typically require backend API calls
          // For now, we'll store in localStorage as a fallback until proper backend integration
          const metadataUpdate = {
            userType: userData.userType || clerkUser.publicMetadata?.userType,
            businessName: userData.businessName || clerkUser.publicMetadata?.businessName,
            businessDescription: userData.businessDescription || clerkUser.publicMetadata?.businessDescription,
            contactPhone: userData.contactPhone || clerkUser.publicMetadata?.contactPhone,
          };
          
          localStorage.setItem(`user_metadata_${clerkUser.id}`, JSON.stringify(metadataUpdate));
        }
        
        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
      } catch (error: any) {
        console.error("Update failed:", error);
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        });
      }
    }
  };

  return {
    user,
    isLoading: !isLoaded,
    signInWithGoogle,
    logout,
    updateUser
  };
};
