
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  signInWithPopup,
  GoogleAuthProvider,
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            userType: userData.userType || "buyer",
            avatar: userData.avatar || firebaseUser.photoURL || undefined,
            businessName: userData.businessName,
            businessDescription: userData.businessDescription,
            contactPhone: userData.contactPhone
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (userType: "buyer" | "vendor" | "admin" = "buyer", additionalData?: any) => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseUser = userCredential.user;
      
      // Check if user already exists
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      
      if (!userDoc.exists()) {
        // Create new user with specified role
        const displayName = firebaseUser.displayName || "";
        const nameParts = displayName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        const userData = {
          firstName,
          lastName,
          userType,
          email: firebaseUser.email || "",
          createdAt: new Date(),
          updatedAt: new Date(),
          ...additionalData
        };

        await setDoc(doc(db, "users", firebaseUser.uid), userData);

        const newUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          firstName,
          lastName,
          userType,
          avatar: firebaseUser.photoURL || undefined,
          ...additionalData
        };
        
        setUser(newUser);
      } else {
        // User exists, load their data
        const userData = userDoc.data();
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          userType: userData.userType || "buyer",
          avatar: userData.avatar || firebaseUser.photoURL || undefined,
          businessName: userData.businessName,
          businessDescription: userData.businessDescription,
          contactPhone: userData.contactPhone
        });
      }
      
      toast({
        title: "Success",
        description: "Successfully signed in with Google!",
      });
    } catch (error: any) {
      console.error("Google sign-in failed:", error);
      toast({
        title: "Error",
        description: error.message || "Google sign-in failed",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
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
    if (user && auth.currentUser) {
      try {
        // Update Firestore document
        await setDoc(doc(db, "users", user.id), {
          ...userData,
          updatedAt: new Date()
        }, { merge: true });

        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        
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

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signInWithGoogle,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
