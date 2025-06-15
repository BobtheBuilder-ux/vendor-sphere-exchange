
import { collection, writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { categories } from "./sampleData";

export const createCategories = async (): Promise<string[]> => {
  console.log("Starting category creation...");
  
  try {
    const batch = writeBatch(db);
    const categoryIds: string[] = [];
    
    categories.forEach((category, index) => {
      console.log(`Adding category ${index + 1}: ${category.name}`);
      
      const docRef = doc(collection(db, "categories"));
      categoryIds.push(docRef.id);
      
      const categoryData = {
        name: category.name,
        description: category.description,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      batch.set(docRef, categoryData);
    });
    
    console.log(`Committing batch with ${categoryIds.length} categories...`);
    await batch.commit();
    console.log("Categories batch committed successfully");
    
    return categoryIds;
  } catch (error) {
    console.error("Detailed error creating categories:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create categories: ${error.message}`);
    }
    throw new Error("Failed to create categories: Unknown error");
  }
};
