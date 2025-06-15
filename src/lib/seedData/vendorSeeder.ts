
import { collection, writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { vendorNames } from "./sampleData";

export const createVendors = async (userId: string): Promise<string[]> => {
  try {
    const batch = writeBatch(db);
    const vendorIds: string[] = [];
    
    vendorNames.forEach((name, index) => {
      const docRef = doc(collection(db, "vendors"));
      vendorIds.push(docRef.id);
      
      const vendorData = {
        userId: index === 0 ? userId : `vendor_${index}`,
        businessName: name,
        description: `${name} - Your trusted partner for quality products and excellent service.`,
        contactEmail: `contact@${name.toLowerCase().replace(/\s+/g, '')}.com`,
        contactPhone: `+1-555-${String(index).padStart(3, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        isActive: true,
        isVerified: true,
        rating: 4.0 + Math.random() * 1.0,
        totalReviews: Math.floor(Math.random() * 500) + 50,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      batch.set(docRef, vendorData);
    });
    
    console.log("Committing vendors batch...");
    await batch.commit();
    console.log("Vendors batch committed successfully");
    return vendorIds;
  } catch (error) {
    console.error("Detailed error creating vendors:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create vendors: ${error.message}`);
    }
    throw new Error("Failed to create vendors: Unknown error");
  }
};
